import { Component, Input, OnInit } from '@angular/core';
import { Agenda } from '../agenda.model';
import { PatientsService } from '../../patients/patients.service';
import { Patient } from 'src/app/patients/patient.model';

@Component({
  selector: '[app-agenda-item]',
  templateUrl: './agenda-item.component.html',
  styleUrls: ['./agenda-item.component.css']
})
export class AgendaItemComponent implements OnInit {
  @Input() agenda!: Agenda;
  @Input() indexAgenda!: number;

  fullName: string = '';

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    const patient: Patient = <Patient>this.patientsService.getPatient(this.agenda.patient)
    
    this.fullName = `${patient.firstName} ${patient.lastName}`;
  }
}
