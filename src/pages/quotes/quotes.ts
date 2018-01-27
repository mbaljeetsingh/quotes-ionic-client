import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';
import {environment} from '../../envrionments/environment';

/**
 * Generated class for the QuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage {
  quotes;

  limit = 10;
  skip = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, private actionSheetCtrl: ActionSheetController) {
    this.dataProvider.getData(`${environment.api_url}/api/quotes/?filter[include]=author&filter[limit]=${this.limit}&filter[skip]=${this.skip}`).subscribe(data => {
      console.log(data);
      this.quotes = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotesPage');
  }

  onGoToCreateQuotePage() {
    this.navCtrl.push('CreateQuotePage');
  }

  doInfinite(ev){
    this.skip += this.limit;
    this.dataProvider.getData(`${environment.api_url}/api/quotes/?filter[include]=author&filter[limit]=${this.limit}&filter[skip]=${this.skip}`).subscribe(data => {
      console.log(data);
      if(data) {
        for (let i in data){
          this.quotes.push(data[i]);
        }
      }
      ev.complete();
    })
  }

  presentActionSheet(quote, index){
    this.actionSheetCtrl.create({
      title: 'Modify Quote',
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            console.log('Edit Quote');
            this.navCtrl.push('EditQuotePage', {quote: quote});
          }
        },
        {
         text: 'Delete',
         role: 'destructive',
         handler: () => {
           console.log('Delete Quote');
           this.dataProvider.deleteData(`${environment.api_url}/api/quotes/${quote.id}`).subscribe(data => {
             console.log('Quote deleted successfully');
             this.quotes.splice(index, 1);
           })
         }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
          }
        }
      ]
    }).present();
  }

}
