import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  email:string;
  password:string;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private _auth: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  signIn(event) {

    this._auth.signInWithEmailAndPassword(this.email, this.password)
        .then(() => this.onSignInSuccess());
  }

  onSignInSuccess(): void {
    console.log("Username ",this._auth.displayName());
  }

}
