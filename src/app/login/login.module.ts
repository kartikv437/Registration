import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { HomeModule } from '../components/home/home.module';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
  ]
})
export class LoginModule { }
