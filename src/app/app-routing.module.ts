import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { PatientEditComponent } from './patients/patient-edit/patient-edit.component';
import { PatientDetailComponent } from './patients/patient-detail/patient-detail.component';
import { PatientResolverService } from './patients/patient-resolver-service';
import { AgendaComponent } from './agenda/agenda.component';
import { AgendaEditComponent } from './agenda/agenda-edit/agenda-edit.component';
import { AgendaDetailComponent } from './agenda/agenda-detail/agenda-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'patients', component: PatientsComponent, children: [
    { path: 'new', component: PatientEditComponent },
    { path: ':id', component: PatientDetailComponent, resolve: { patients: PatientResolverService } },
    { path: ':id/edit', component: PatientEditComponent, resolve: { patients: PatientResolverService } }
  ] },
  { path: 'agenda', component: AgendaComponent, resolve: { patients: PatientResolverService }, children: [
    { path: 'new', component: AgendaEditComponent },
    { path: ':id', component: AgendaDetailComponent, resolve: { patients: PatientResolverService } },
    { path: ':id/edit', component: AgendaEditComponent, resolve: { patients: PatientResolverService } }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
