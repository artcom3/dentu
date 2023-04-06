import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { PatientEditComponent } from './patients/patient-edit/patient-edit.component';
import { PatientDetailComponent } from './patients/patient-detail/patient-detail.component';
import { PatientResolverService } from './patients/patient-resolver-service';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'patients', component: PatientsComponent, children: [
    { path: 'new', component: PatientEditComponent },
    { path: ':id', component: PatientDetailComponent, resolve: { patients: PatientResolverService } },
    { path: ':id/edit', component: PatientEditComponent, resolve: { patients: PatientResolverService } }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
