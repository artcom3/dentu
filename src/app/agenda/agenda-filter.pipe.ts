import { Pipe, PipeTransform } from '@angular/core';
import { Agenda } from './agenda.model';

@Pipe({
  name: 'agendaFilter'
})
export class AgendaFilterPipe implements PipeTransform {

  transform(agendas: Agenda[], term: string): any {
    let filteredArray: Agenda[] = [];

    console.log(term)
    if (term && term.length > 0) {
      filteredArray = agendas.filter(
        (agenda: Agenda) => agenda.date == term
      );
    }

    if (filteredArray.length < 1) {
      return agendas;
    }
    return filteredArray;
  }

}
