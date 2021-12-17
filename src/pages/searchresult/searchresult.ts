import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ShapePipe } from '../../pipes/shape/shape';
import { Clipboard } from '@ionic-native/clipboard';


/**
 * Generated class for the SearchresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-searchresult',
    templateUrl: 'searchresult.html',
})
export class SearchresultPage {
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

    constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
        private globalServiceProvider: GlobalServiceProvider, public loadingCtrl: LoadingController, private clipboard: Clipboard, private iab: InAppBrowser,) {

        this.searchPost = navParams.get('searchPost');
        console.log('searchresultPage', this.searchPost);
        this.userName = localStorage.getItem('username');
        this.search();
    }

    openLink(link) {
        if (link) {
            this.iab.create(link, '_system');
        }
    }

    copyTxt(txt) {
        this.clipboard.copy(txt);

        let toast = this.toastCtrl.create({
            message: 'Text copied',
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    }

    search() {
        this.searchPost.page = 1;
        this.isData = 0;
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        let partList: any;
        console.log("searchPost: ", this.searchPost);

        this.globalServiceProvider.apicall('Search', this.searchPost).then((success: any) => {
            console.log("search : " + this.searchPost.page);
            this.searchResult = success;
            this.totalCount = this.searchResult.length;
            if (this.searchResult.length) {
                this.isData = 1;
                this.totalRecord = this.searchResult[0].TotalCount;
                this.totalPage = Math.ceil(this.totalRecord / 50);
                this.totalCount = this.searchResult.length;
            }

            console.log(success);
            loading.dismiss();
        })
            .catch((error) => {
                this.isData = 1;
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


            this.globalServiceProvider.apicall('Search', this.searchPost).then((success: any) => {
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
        console.log('ressssss STONEID', res.STONEID);
        this.navCtrl.push('DiamondDetailPage', { 'stoneid': res.STONEID });
    }

}
