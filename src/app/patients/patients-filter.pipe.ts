import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from './patient.model';

@Pipe({
  name: 'patientsFilter'
})
export class PatientsFilterPipe implements PipeTransform {

  transform(patients: Patient[], term: string): any {
    let filteredArray: Patient[] = [];

    if (term && term.length > 0) {
      filteredArray = patients.filter(
        (patient: Patient) => patient.firstName.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (filteredArray.length < 1) {
      return patients;
    }
    return filteredArray;
  }

}
