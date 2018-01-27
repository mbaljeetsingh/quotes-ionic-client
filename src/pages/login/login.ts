import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email;
  password;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private events: Events, pri) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin(){
    console.log(this.email, this.password);
    const postData = {
      email: this.email,
      password: this.password
    }

    this.authProvider.login(postData).subscribe(data => {
      console.log(data);
      this.events.publish('user:login', data);
      this.navCtrl.setRoot('QuotesPage');
    })
  }

}
