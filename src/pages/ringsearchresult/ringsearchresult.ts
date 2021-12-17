import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

import { ShapePipe } from '../../pipes/shape/shape';

/**
 * Generated class for the RingsearchresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-ringsearchresult',
    templateUrl: 'ringsearchresult.html',
})
export class RingsearchresultPage {
    public fcarat: number = 0;
    public tcarat: number = 0;
    public stoneid = '';
    public isData = 0;

    public isResult = true;
    public totalPage = 1;
    public shareUrl = "";
    public searchResult: any;
    public totalRecord = 0;
    public totalCount: any = 0;
    public caratlist: any = '';
    public userName: any;



    public searchPost: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private toastCtrl: ToastController,
        private globalServiceProvider: GlobalServiceProvider,
        public loadingCtrl: LoadingController,
    ) {

        this.searchPost = navParams.get('searchPost');
        console.log('searchresultPage', this.searchPost);
        this.userName = localStorage.getItem('icq-username');
        console.log('userName', this.userName);

        this.search();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SearchresultPage');
    }


    search() {
        this.searchPost.page = 1;
        this.isData = 0;

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        this.globalServiceProvider.apicall('ringData', this.searchPost).then((success: any) => {


            console.log("ringData : " + this.searchPost.page);
            this.searchResult = success;
            this.totalCount = this.searchResult.length;
            if (this.searchResult.length) {

                this.isData = 1;
                this.totalRecord = this.searchResult[0].TotalCount;
                this.totalPage = Math.ceil(this.totalRecord / 50);
                this.totalCount = this.searchResult.length;
            }
            // this.resetAll();

            console.log(success);
            loading.dismiss();
        })
            .catch((error) => {
                this.isData = 1;
                console.error('API Error : ', error);

                let toast = this.toastCtrl.create({
                    message: error,
                    duration: 3000,
                    position: 'middle'
                });
                loading.dismiss();
            });
    }

    doInfinite(infiniteScroll) {
        this.searchPost.page++;
        console.log(this.totalPage);
        console.log('Page:');
        console.log(this.searchPost.page);

        if (this.searchPost.page <= this.totalPage) {


            this.globalServiceProvider.apicall('ringData', this.searchPost).then((success: any) => {


                // this.searchPost.page++;
                this.totalRecord = this.searchResult[0].TotalCount;

                for (let partListData of success) {
                    this.searchResult.push(partListData);
                }
                this.totalCount = this.searchResult.length;
                infiniteScroll.complete();

            });
        }
        else {
            this.searchPost.page++;
            infiniteScroll.enable(false);
        }

    }

    gotoDetail(res) {
        console.log('ressssss', res);
        // this.navCtrl.push('RingdetailPage', { 'stoneid': res.RING_NO });
        this.navCtrl.push('StockJewelryDetailPage', {
            ringNo: res.RING_NO
        });
    }

}
