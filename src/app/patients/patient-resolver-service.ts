import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Patient } from "./patient.model";
import { PatientsService } from "./patients.service";

@Injectable({
    providedIn: 'root'
})
export class PatientResolverService {
    
    constructor(private patientsService: PatientsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Patient[]> {
        return this.patientsService.getPatients();   
    }
}