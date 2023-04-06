import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PatientsService } from '../patients.service';
import { Patient } from '../patient.model';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent {
  patient: Patient = <Patient>{ };

  constructor(private patientsService: PatientsService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = params['id']
          this.patient = <Patient>this.patientsService.getPatient(id);
        }
      )
  }

  calculateAge(birthday: string): string {
    const birthDate: Date = new Date(birthday);
    const age: number = new Date(Date.now() - birthDate.getTime()).getUTCFullYear() - 1970;
    return age.toString();
  }

  onDelete(): void {
    if (!this.patient) {
      return;
    }
    this.patientsService.deletePatient(this.patient);
    this.router.navigate(['/patients']);
  }
}
