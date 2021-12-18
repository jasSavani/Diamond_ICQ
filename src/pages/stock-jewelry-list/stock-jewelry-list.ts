import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

import { FullShapePipe } from '../../pipes/full-shape/full-shape';
import { ShapePipe } from '../../pipes/shape/shape';

/**
 * Generated class for the StockJewelryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-stock-jewelry-list',
    templateUrl: 'stock-jewelry-list.html',
})
export class StockJewelryListPage {

    public pageOption: any;
    public isGrid: any = true;

    public searchResult: any;
    public totalCount: any;
    public totalRecord: any;
    public totalPage: any;

    public searchPost: any = {
        fcarat:0,
        tcarat:0,
        caratlist:"",
        color:"",
        shape:"",
        clarity:"",
        page:1,
        userid:"",
        isfancy:0,
        fcolor:"",
        certificate:"",
        ex:0,
        design_no:"",
        consign_no:"",
        lab:"",
        cut:"",
        pol:"",
        sym:"",
        flo:"",
        price_from:"",
        price_to:"",
        cat_code: ""
    }

    public ctOrder: any = 'DESC';
    public tagOrder: any = 'DESC';
    public sktOrder: any = 'DESC';


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private globalServiceProvider: GlobalServiceProvider,
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
    ) {
        this.pageOption = this.navParams.get('option');

        if (navParams.get('searchPost')) {
            this.searchPost = navParams.get('searchPost');
        }
        this.getSearchData();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StockJewelryListPage');
    }

    openSearch() {
        if (this.pageOption === 1 || this.pageOption === 2 || this.pageOption === 4) {
            this.navCtrl.push("RingsearchPage", {
                pageOption: this.pageOption
            });
        } else if (this.pageOption === 0) {
            this.navCtrl.push("RingsearchPage", {
                pageOption: 0
            });
        } else if (this.pageOption === '') {
            this.navCtrl.push("RingsearchPage", {
                pageOption: ''
            });
        }
    }

    changeGrid(event) {
        this.isGrid = event;
    }

    openDetailPage(result) {
        this.navCtrl.push('StockJewelryDetailPage', {
            ringNo: result.RING_NO //1107
        });
    }

    sortingCt(order, sortBy) {
        if (order == 'DESC') {
            this.ctOrder = 'ASC'
        } else {
            this.ctOrder = 'DESC';
        }

        this.searchPost.a_sort_order = this.ctOrder;
        this.searchPost.a_sort_by = sortBy;
        this.searchPost.page = 1;
        this.getSearchData();
    }

    sortingTag(order, sortBy) {
        if (order == 'DESC') {
            this.tagOrder = 'ASC'
        } else {
            this.tagOrder = 'DESC';
        }

        this.searchPost.a_sort_order = this.tagOrder;
        this.searchPost.a_sort_by = sortBy;
        this.searchPost.page = 1;

        this.getSearchData();
    }

    sortingSkt(order, sortBy) {
        if (order == 'DESC') {
            this.sktOrder = 'ASC'
        } else {
            this.sktOrder = 'DESC';
        }

        this.searchPost.a_sort_order = this.sktOrder;
        this.searchPost.a_sort_by = sortBy;
        this.searchPost.page = 1;

        this.getSearchData();
    }

    getSearchData() {
        this.searchPost.cat_code = this.pageOption;

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        this.globalServiceProvider.apicall('ringData',  this.searchPost).then((success: any) => {
            // console.log("search : " + this.searchPost.page);
            this.searchResult = success;
            this.totalCount = this.searchResult.length;
            if (this.searchResult.length) {
                this.totalRecord = this.searchResult[0].TotalCount;
                this.totalPage = Math.ceil(this.totalRecord / 50);
                this.totalCount = this.searchResult.length;
            }
            // this.resetAll();

            console.log(success);
            loading.dismiss();
        })
            .catch((error) => {

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
    
}
