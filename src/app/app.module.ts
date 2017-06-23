import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfilePage } from '../pages/profile/profile';
import { ContactsPage } from '../pages/contacts/contacts';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SelectContactToGoChat } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { SignInAndUpComponent } from '../components/sign-in-and-up/sign-in-and-up';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBWoLSbf1cIqc3S65cXP1FP9FnySeietgo",
  authDomain: "whatsappcloneionic.firebaseapp.com",
  databaseURL: "https://whatsappcloneionic.firebaseio.com",
  projectId: "whatsappcloneionic",
  storageBucket: "whatsappcloneionic.appspot.com",
  messagingSenderId: "24389748750"
};

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '1b8d1da3'
  }
};

@NgModule({
  declarations: [
    MyApp,
    ContactsPage,
    ProfilePage,
    HomePage,
    SignInPage,
    SignUpPage,
    TabsPage,
    SignInAndUpComponent,
    SelectContactToGoChat
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    CloudModule.forRoot(cloudSettings),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactsPage,
    ProfilePage,
    HomePage,
    SignInPage,
    SignUpPage,
    SignInAndUpComponent,
    SelectContactToGoChat,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
