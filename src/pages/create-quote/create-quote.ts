import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';
import {environment} from '../../envrionments/environment';

/**
 * Generated class for the CreateQuotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-quote',
  templateUrl: 'create-quote.html',
})
export class CreateQuotePage {
  authors;

  content;
  authorId;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, private toastCtrl: ToastController) {
    this.dataProvider.getData(`${environment.api_url}/api/authors`).subscribe(data => {
      console.log(data);
      this.authors = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateQuotePage');
  }

  onSaveQuote(){
    console.log(this.content, this.authorId);
    const postData = {
      content: this.content,
      authorId: this.authorId
    }

    this.dataProvider.postData(`${environment.api_url}/api/quotes`, postData).subscribe(data => {
      console.log(data);
      this.toastCtrl.create({
        message: 'Quote created successfully',
        duration: 3000
      }).present();
      this.navCtrl.setRoot('QuotesPage');
    }, (err) => {
      console.log(err);
      this.toastCtrl.create({
        message: 'Quote ' + err.error.error.details.messages.content[0],
        duration: 3000
      }).present();
    })
  }

}
