import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from '../patient.model';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit, OnDestroy {

  term?: string;
  patientListChangedSub: Subscription = Subscription.EMPTY;
  patients: Patient[] = [];

  constructor(private patientsService: PatientsService) { }

  ngOnInit(): void {
    this.patientsService.getPatients().subscribe();
    this.patientListChangedSub = this.patientsService.patientListChangedEvent
      .subscribe(
        (patients: Patient[]) => {
          console.log(patients)
          this.patients = patients;
        }
      )
  }

  ngOnDestroy(): void { 
    this.patientListChangedSub.unsubscribe();
  }

}
