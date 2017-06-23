import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ViewController, NavController, ModalController, AlertController, ActionSheetController, LoadingController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  songs: FirebaseListObservable<any>;
  referenceUsers;
  users: FirebaseListObservable<any>;
  user: Observable<firebase.User>;
  username;
  uidUser: string;
  loader;

  constructor(public afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public af: AngularFireDatabase,
    private _auth: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public modalCtrl: ModalController) {

    var loadDataWhenUserLoggedIn = false;
    console.log("Constructor - Home");

    this.afAuth.authState.subscribe((user: firebase.User) => {
      if(!user){
        loadDataWhenUserLoggedIn = false;
      } else {
        loadDataWhenUserLoggedIn = true;
      }
      if(loadDataWhenUserLoggedIn){
        this.presentLoading();
        this.uidUser = user.uid;
        this.referenceUsers = this.af.list('users/' + this.uidUser);
        this.users = this.af.list('users/');
        this.username = user.email;
      } else {
        console.log("Not user logged in");
        if(this.uidUser){
          this.referenceUsers.$ref.off();
          this.users.$ref.off();
        }
      }
    });

  }

  ionViewDidEnter() {

  }

  ionViewDidLoad() {

  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    this.loader.present();
  }

  hideLoading(){
    this.loader.dismiss();
  }

  newChat(){
    let findContactModal = this.modalCtrl.create(SelectContactToGoChat);
    findContactModal.onDidDismiss(data => {
      /*
      if(data != null){
        console.log("Entrando a conver -- ChatPage");
        this.navCtrl.push(ConversationPage, {
          'contactToChat' : data.nameContact
        });
      }
      */
    });
    findContactModal.present();
  }

  /*
  addSong(){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter a name for this new song you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'artist',
          placeholder: 'Artist'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.chatsFromUser.push({
              title: data.title,
              artist: data.artist
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(songId, songTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Play song',
          handler: () => {
            this.playSong(songId);
          }
        },{
          text: 'Update title',
          handler: () => {
            this.updateSong(songId, songTitle);
          }
        },{
          text: 'Delete Song',
          role: 'destructive',
          handler: () => {
            this.removeSong(songId);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
    }
    */
    playSong(songId: string){
      console.log(songId);
    }
    /*
    removeSong(songId: string){
      this.chatsFromUser.remove(songId);
    }

    updateSong(songId, songTitle){
      let prompt = this.alertCtrl.create({
        title: 'Song Name',
        message: "Update the name for this song",
        inputs: [
          {
            name: 'title',
            placeholder: 'Title',
            value: songTitle
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              this.chatsFromUser.update(songId,{
                title: data.title,
              });
            }
          }
        ]
      });
      prompt.present();
    }
    */
}

@Component({templateUrl: 'selectContactToGoChat.html'})

export class SelectContactToGoChat {

searchQuery: string = '';
arrayNamesContacts: String[] = [];

 constructor(public params: NavParams,
             public modalCtrl: ModalController,
             public navCtrl: NavController,
             public viewCtrl: ViewController,
            ) {
 }

 ionViewWillEnter(){

 }

 getContacts(ev: any) {
   // set val to the value of the searchbar
   let val = ev.target.value;
   console.log(val);
   // if the value is an empty string don't filter the items
   if (val != '' && val != null) {
     this.arrayNamesContacts = this.arrayNamesContacts.filter((contactFound) => {
       return (contactFound.toLowerCase().indexOf(val.toLowerCase()) > -1);
     })
   } else {
      console.log("Reestablecer criterio de bussqueda");
   }
 }
 /*
 setSelectContact(contactSelected){
   let data = { 'nameContact': contactSelected };
   this.viewCtrl.dismiss(data);
 }
 */
 dismiss() {
  this.viewCtrl.dismiss();
 }

}
