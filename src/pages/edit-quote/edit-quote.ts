import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {environment} from '../../envrionments/environment';
import {DataProvider} from '../../providers/data/data';

/**
 * Generated class for the EditQuotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-quote',
  templateUrl: 'edit-quote.html',
})
export class EditQuotePage {
  authors;
  quote;

  content;
  authorId;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, private toastCtrl: ToastController) {
    this.quote = this.navParams.get('quote');
    console.log(this.quote);
    this.content = this.quote.content;
    this.authorId = this.quote.authorId;
    this.dataProvider.getData(`${environment.api_url}/api/authors`).subscribe(data => {
      console.log(data);
      this.authors = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditQuotePage');
  }

  onUpdateQuote(){
    console.log(this.content, this.authorId);
    const editData = {
      content: this.content,
      authorId: this.authorId
    }

    this.dataProvider.updateData(`${environment.api_url}/api/quotes/${this.quote.id}`, editData).subscribe(data => {
      console.log(data);
      this.toastCtrl.create({
        message: 'Quote updated successfully',
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
