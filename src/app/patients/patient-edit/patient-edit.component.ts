import { Component } from '@angular/core';
import { Patient } from '../patient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PatientsService } from '../patients.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent {
  originalPatient: Patient = <Patient>{ } ;
  patient: Patient = <Patient>{ };
  editMode: boolean = false;
  id: string = '';

  constructor(
    private patientsService: PatientsService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (!this.id) {
          this.editMode = false;
          return;
        }
        this.originalPatient = <Patient>this.patientsService.getPatient(this.id);
        if (!this.originalPatient) {
          return;
        }
        this.editMode = true;
        this.patient = JSON.parse(JSON.stringify(this.originalPatient));
      }
    )
  }


  onCancel() {
    this.router.navigate(['/patients']);
  }

  onSubmit(form: NgForm) {
    const value = <Patient>form.value;

    const newPatient = new Patient(
      "", 
      value.firstName,
      value.lastName,
      value.dateOfBirth,
      value.gender,
      value.dni,
      value.phoneNumber,
      value.email,
      value.nationality,
      value.educationDegree,
      null
    );
    if (this.editMode) {
      this.originalPatient = <Patient>this.patientsService.getPatient(this.id);
      this.patientsService.updatePatient(this.originalPatient, newPatient);
    } else {
      this.patientsService.addPatient(newPatient);
    }
    this.router.navigate(['/patients']);
  }
}
