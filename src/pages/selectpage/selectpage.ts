import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
// import { HomePage } from '../home/home';


/**
 * Generated class for the SelectpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-selectpage',
    templateUrl: 'selectpage.html',
})
export class SelectpagePage {
     
    public userName: any;
    public userId: any;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public loadingCtrl: LoadingController, 
        private globalServiceProvider: GlobalServiceProvider, 
        ) {
            this.userName = localStorage.getItem('icq-username');
            this.userId = localStorage.getItem('icq-userid');

            this.trackRecord();
    }

    ionViewDidLoad() {

    }

    goToDiamond() {
        this.navCtrl.push('SearchPage');
    }

    goToJewellery() {
        this.navCtrl.push('JcategorylistPage');
    }

    goToRing() {
        this.navCtrl.push('StockJewelryMenuPage');
        // this.navCtrl.push("RingsearchPage");
    }

    goToTrack() {
        this.navCtrl.push('TrackDetailPage');
    }
 
    goToInvoice() {
        this.navCtrl.push('InvoicesPage');
    }

    goToCustomer() {
        this.navCtrl.push('CustomerPage');
    }

    logout() {
        localStorage.removeItem('icq-username');
        localStorage.removeItem('icq-userid');
        this.navCtrl.setRoot('HomePage');
    }

    trackRecord() {
        let eventData: any = {
            username: this.userName,
            userid: this.userId
        }

        this.globalServiceProvider.apicall("userTrack", eventData)
            .then((success: any) => {
                console.log('userTrack', success);
            })
            .catch((error) => {
                console.error('API Error : ', error);
            });
    }
}
