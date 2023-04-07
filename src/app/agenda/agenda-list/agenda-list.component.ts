import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Agenda } from '../agenda.model';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.css']
})
export class AgendaListComponent implements OnInit, OnDestroy {

  term: string = '';
  agendaListChangedSub: Subscription = Subscription.EMPTY;
  agendas: Agenda[] = [];

  constructor(private agendaService: AgendaService) { }

  ngOnInit(): void {
    this.agendaService.getAgendas().subscribe();
    this.agendaListChangedSub = this.agendaService.agendaListChangedEvent
      .subscribe(
        (agendas: Agenda[]) => {
          console.log(agendas)
          this.agendas = agendas;
        }
      )
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void { 
    this.agendaListChangedSub.unsubscribe();
  }

}
