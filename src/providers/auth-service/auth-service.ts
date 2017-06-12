import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'll lose the tree shaking benefits
import * as firebase from 'firebase/app';

@Injectable()
export class AuthServiceProvider {
  private currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
  }

  authenticated(): boolean {
    return this.currentUser !== null;
  }

  signInWithEmailAndPassword(email, password): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      if(error){
        console.log(error);
      }
    });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

  displayName(): string {
    if (this.afAuth.auth.currentUser !== null) {
      return this.afAuth.auth.currentUser.email;
    } else {
      return '';
    }
  }

  getIdCurrentUser(): string {
    if (this.afAuth.auth.currentUser !== null) {
      return this.afAuth.auth.currentUser.uid;
    } else {
      return '';
    }
  }

  getCurrentUser(): firebase.User{
    if (this.afAuth.auth.currentUser !== null) {
      return this.afAuth.auth.currentUser;
    } else {
      return null;
    }
  }
}
