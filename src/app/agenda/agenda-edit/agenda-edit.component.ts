import { Component } from '@angular/core';
import { Agenda } from '../agenda.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AgendaService } from '../agenda.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-agenda-edit',
  templateUrl: './agenda-edit.component.html',
  styleUrls: ['./agenda-edit.component.css']
})
export class AgendaEditComponent {
  originalAgenda: Agenda = <Agenda>{ } ;
  agenda: Agenda = <Agenda>{ };
  editMode: boolean = false;
  id: string = '';

  constructor(
    private agendaService: AgendaService,
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
        this.originalAgenda = <Agenda>this.agendaService.getAgenda(this.id);
        if (!this.originalAgenda) {
          return;
        }
        this.editMode = true;
        this.agenda = JSON.parse(JSON.stringify(this.originalAgenda));
      }
    )
  }


  onCancel() {
    this.router.navigate(['/agenda']);
  }

  onSubmit(form: NgForm) {

    const value = <Agenda>form.value;
    console.log(value)


    const newAgenda = new Agenda(
      "", 
      value.patient,
      value.time,
      value.hour,
      value.date,
      value.treatment,
      value.notes,
    );
    if (this.editMode) {
      this.originalAgenda = <Agenda>this.agendaService.getAgenda(this.id);
      this.agendaService.updateAgenda(this.originalAgenda, newAgenda);
    } else {
      this.agendaService.addAgenda(newAgenda);
    }
    this.router.navigate(['/agenda']);
  }
}
