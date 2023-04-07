import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AgendaService } from '../agenda.service';
import { Agenda } from '../agenda.model';
import { PatientsService } from 'src/app/patients/patients.service';
import { Patient } from 'src/app/patients/patient.model';

@Component({
  selector: 'app-agenda-detail',
  templateUrl: './agenda-detail.component.html',
  styleUrls: ['./agenda-detail.component.css']
})
export class AgendaDetailComponent {
  agenda: Agenda = <Agenda>{ };

  fullName: string = '';

  constructor(private agendaService: AgendaService,
              private router: Router,
              private route: ActivatedRoute,
              private patientsService: PatientsService) {

  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = params['id']
          this.agenda = <Agenda>this.agendaService.getAgenda(id);
          const patient: Patient = <Patient>this.patientsService.getPatient(this.agenda.patient)
          this.fullName = `${patient.firstName} ${patient.lastName}`;
        }
      )
      
  }

  onDelete(): void {
    if (!this.agenda) {
      return;
    }
    this.agendaService.deleteAgenda(this.agenda);
    this.router.navigate(['/agendas']);
  }
}
