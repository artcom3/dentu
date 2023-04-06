import { Injectable } from '@angular/core';
import { Subject, map, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from './patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private patients: Patient[] =[];
  patientListChangedEvent = new Subject<Patient[]>()

  constructor(private http: HttpClient) {
    //
  }

  getPatients() {
    return this.http
      .get<{message: string, patients: Patient[]}>('http://localhost:3000/api/patients')
      .pipe(
        map(response => {
          console.log(response['message']);
          return response['patients'];
        }),
        tap({
          next: (patients: Patient[]) => {
            this.patients = patients;
            this.sortAndSend();
          },
          error: (error: any) => (console.log(error))
        })
      );
  }

  sortAndSend(){
    this.patients.sort((a,b) => {
      return a.firstName.localeCompare(b.firstName, undefined, {sensitivity: 'base'})
    });
    console.log(this.patients);
    this.patientListChangedEvent.next(this.patients.slice())
  }

  getPatient(id: string): Patient | null {
    let returnPatient = null;
    this.patients.forEach(patient => {
      if (patient.id === id)
      returnPatient = patient;
    });
    return returnPatient;
  }

  deletePatient(patient: Patient) {
    if (!patient) {
      return;
    }

    const pos = this.patients.findIndex(d => d.id === patient.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/api/patients/' + patient.id)
      .subscribe(
        () => {
          this.patients.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  addPatient(patient: Patient) {
    console.log(patient)
    if (!patient) {
      return;
    }
    patient.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, patient: Patient }>('http://localhost:3000/api/patients',
    patient,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new patient to patients
          this.patients.push(responseData.patient);
          this.sortAndSend();
        }
      );
  };
  
  updatePatient(originalPatient: Patient, newPatient: Patient) {
    if (!originalPatient || !newPatient) {
      return;
    }

    const pos = this.patients.findIndex(d => d.id === originalPatient.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newPatient.id = originalPatient.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put<{message: string, error: string}>('http://localhost:3000/api/patients/' + originalPatient.id,
      newPatient, { headers: headers })
      .subscribe(
        (response) => {
          console.log(response['error'])
          this.patients[pos] = newPatient;
          this.sortAndSend();
        }
      );
  }; 
}
