import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

import { AdminDoctorComponent } from './admin-doctor/admin-doctor.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AuthGuard } from '@app/_guards';
import { AdminPatientComponent } from './admin-patient/admin-patient.component';
import { AdminDoctorFormComponent } from './admin-doctor/admin-doctor-form/admin-doctor-form.component';
import { AdmminPatientFormComponent } from './admin-patient/admmin-patient-form/admmin-patient-form.component';



const appRoutes: Routes = [
  { path: 'admin/doctor', component: AdminDoctorComponent,canActivate: [AuthGuard] },
  { path: 'admin/patient', component: AdminPatientComponent,canActivate: [AuthGuard] },
  // otherwise redirect to home
];
@NgModule({
  declarations: [
     AdminDoctorComponent,
     AdminHeaderComponent,
     AdminFooterComponent,
     AdminPatientComponent,
     AdminDoctorFormComponent,
     AdmminPatientFormComponent
    ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule.forChild(appRoutes)  
  ],
  exports: [
    AdminHeaderComponent,
    AdminFooterComponent,
  ]
})
export class AdminModule { }
