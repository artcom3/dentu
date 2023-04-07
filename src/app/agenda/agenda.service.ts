import { Injectable } from '@angular/core';
import { Subject, map, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Agenda } from './agenda.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private agendas: Agenda[] =[];
  agendaListChangedEvent = new Subject<Agenda[]>()

  constructor(private http: HttpClient) {
    //
  }

  getAgendas() {
    return this.http
      .get<{message: string, agendas: Agenda[]}>('http://localhost:3000/api/agenda')
      .pipe(
        map(response => {
          console.log(response['message']);
          return response['agendas'];
        }),
        tap({
          next: (agendas: Agenda[]) => {
            this.agendas = agendas;
            this.sortAndSend();
          },
          error: (error: any) => (console.log(error))
        })
      );
  }

  sortAndSend(){
    this.agendas.sort((a,b) => {
      return a.date.localeCompare(b.date, undefined, {sensitivity: 'base'})
    });
    console.log(this.agendas);
    this.agendaListChangedEvent.next(this.agendas.slice())
  }

  getAgenda(id: string): Agenda | null {
    let returnAgenda = null;
    this.agendas.forEach(agenda => {
      if (agenda.id === id)
      returnAgenda = agenda;
    });
    return returnAgenda;
  }

  deleteAgenda(agenda: Agenda) {
    if (!agenda) {
      return;
    }

    const pos = this.agendas.findIndex(d => d.id === agenda.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/api/agenda/' + agenda.id)
      .subscribe(
        () => {
          this.agendas.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  addAgenda(agenda: Agenda) {
    console.log(agenda)
    if (!agenda) {
      return;
    }
    agenda.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, agenda: Agenda }>('http://localhost:3000/api/agenda',
    agenda,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new agenda to agendas
          this.agendas.push(responseData.agenda);
          this.sortAndSend();
        }
      );
  };
  
  updateAgenda(originalAgenda: Agenda, newAgenda: Agenda) {
    if (!originalAgenda || !newAgenda) {
      return;
    }

    const pos = this.agendas.findIndex(d => d.id === originalAgenda.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newAgenda.id = originalAgenda.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put<{message: string, error: string}>('http://localhost:3000/api/agenda/' + originalAgenda.id,
      newAgenda, { headers: headers })
      .subscribe(
        (response) => {
          console.log(response['error'])
          this.agendas[pos] = newAgenda;
          this.sortAndSend();
        }
      );
  }; 
}
