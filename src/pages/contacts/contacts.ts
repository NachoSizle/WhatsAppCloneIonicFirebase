import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import * as firebase from 'firebase/app';
/**
 * Generated class for the ContactsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  users;
  loader;
  uidUser: string;

  constructor(public afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public af: AngularFireDatabase,
    private _auth: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {

      var loadDataWhenUserLoggedIn = false;

      this.afAuth.authState.subscribe((user: firebase.User) => {
        if(!user){
          loadDataWhenUserLoggedIn = false;
        } else {
          loadDataWhenUserLoggedIn = true;
        }
        if(loadDataWhenUserLoggedIn){
          this.presentLoading();
          this.uidUser = user.uid;
          this.users = this.af.list('users/');
        } else {
          console.log("Not user logged in");
          if(this.uidUser){
            this.users.$ref.off();
          }
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    this.loader.present();
  }

  showOptions(usr) {
      console.log(usr);
  }

}
