import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController, AlertController, ActionSheetController, LoadingController, NavParams } from 'ionic-angular';
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
  user: Observable<firebase.User>;
  uidUser: string;
  loader;

  constructor(public afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public af: AngularFireDatabase,
    private _auth: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {

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
        this.songs = this.af.list('/songs');
        this.uidUser = user.uid;
        this.referenceUsers = firebase.database().ref('users/' + this.uidUser);
      } else {
        console.log("Not user logged in");
        if(this.songs){
          this.songs.$ref.off();
          this.referenceUsers.$ref.off();
        }
      }
    });


  }

  ionViewDidEnter() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
  }

  hideLoading(){
    this.loader.dismiss();
  }

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
            this.songs.push({
              title: data.title,
              artist: data.artist
            });

            this.referenceUsers.push({
              songs : {
                title: data.title,
                artist: data.artist
              }
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
          text: 'Delete Song',
          role: 'destructive',
          handler: () => {
            this.removeSong(songId);
          }
        },{
          text: 'Update title',
          handler: () => {
            this.updateSong(songId, songTitle);
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

    removeSong(songId: string){
      this.songs.remove(songId);
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
              this.songs.update(songId, {
                title: data.title
              });
            }
          }
        ]
      });
      prompt.present();
    }
}
