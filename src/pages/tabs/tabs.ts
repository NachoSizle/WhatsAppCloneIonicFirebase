import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SignInAndUpComponent } from '../../components/sign-in-and-up/sign-in-and-up';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public afAuth: AngularFireAuth,
              private authService: AuthServiceProvider,
              private navCtrl: NavController) {
    console.log("Constructor");

    this.afAuth.auth.onAuthStateChanged(function(user){
      if (user) {
        // User is signed in.
        console.log("Sign in");
        if(navCtrl.canGoBack()){
          navCtrl.popToRoot();
        }
      } else {
        // No user is signed in.
        console.log("Not signed in");
        navCtrl.push(SignInAndUpComponent);
      }
    });
  }

  ionViewDidLoad() {
  }

}
