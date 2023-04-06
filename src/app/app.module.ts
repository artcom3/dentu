import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientListComponent } from './patients/patient-list/patient-list.component';
import { PatientEditComponent } from './patients/patient-edit/patient-edit.component';
import { PatientItemComponent } from './patients/patient-item/patient-item.component';
import { AgendaComponent } from './agenda/agenda.component';
import { AgendaEditComponent } from './agenda/agenda-edit/agenda-edit.component';
import { AgendaListComponent } from './agenda/agenda-list/agenda-list.component';
import { AgendaItemComponent } from './agenda/agenda-item/agenda-item.component';
import { PatientDetailComponent } from './patients/patient-detail/patient-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    PatientsComponent,
    PatientListComponent,
    PatientEditComponent,
    PatientItemComponent,
    AgendaComponent,
    AgendaEditComponent,
    AgendaListComponent,
    AgendaItemComponent,
    PatientDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
