import { Component } from '@angular/core';
import { SignInPage } from '../../pages/sign-in/sign-in';
import { SignUpPage } from '../../pages/sign-up/sign-up';

@Component({
  selector: 'sign-in-and-up',
  templateUrl: 'sign-in-and-up.html'
})
export class SignInAndUpComponent {

  tabSignIn = SignInPage;
  tabSignUp = SignUpPage;

  constructor() {
    console.log('Hello SignInAndUpComponent Component');
  }

}
