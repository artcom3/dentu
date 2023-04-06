import { Component, Input } from '@angular/core';
import { Patient } from '../patient.model';

@Component({
  selector: '[app-patient-item]',
  templateUrl: './patient-item.component.html',
  styleUrls: ['./patient-item.component.css']
})
export class PatientItemComponent {
  @Input() patient!: Patient;
  @Input() indexPatient!: number;

  calculateAge(birthday: string): string {
    const birthDate: Date = new Date(birthday);
    const age: number = new Date(Date.now() - birthDate.getTime()).getUTCFullYear() - 1970;
    return age.toString();
  }
}
