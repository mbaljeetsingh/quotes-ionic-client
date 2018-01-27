import { Component, ViewChild } from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AuthProvider} from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'QuotesPage';

  pages: Array<{title: string, page: any}>;

  isLoggedIn = false;
  user;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private events: Events, private authProvider: AuthProvider) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Quotes', page: 'QuotesPage' },
      // { title: 'Login', page: 'LoginPage'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.events.subscribe('user:login', (user) => {
        this.user = user;
        this.isLoggedIn = true;
      })
      this.events.subscribe('user:logout', () => {
        this.isLoggedIn = false;
      })
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.page);
  }

  onLogin(){
    this.nav.setRoot('LoginPage');
  }

  onLogout(user) {
   this.authProvider.logout(user).subscribe(data => {
     console.log(data);
     this.events.publish('user:logout');
   })
  }
}
