import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,
              private authService: AuthServiceProvider,
              public afAuth: AngularFireAuth) {

  }

  signOut(event){
    this.authService.signOut();
    this.afAuth.auth.signOut();
  }

}
