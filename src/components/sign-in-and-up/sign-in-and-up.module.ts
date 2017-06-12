import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInAndUpComponent } from './sign-in-and-up';

@NgModule({
  declarations: [
    SignInAndUpComponent,
  ],
  imports: [
    IonicPageModule.forChild(SignInAndUpComponent),
  ],
  exports: [
    SignInAndUpComponent
  ]
})
export class SignInAndUpComponentModule {}
