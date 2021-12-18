import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

import { PhotoViewer } from '@ionic-native/photo-viewer';
/**
 * Generated class for the InvoicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-invoices',
    templateUrl: 'invoices.html',
})
export class InvoicesPage {

    public event = {
        month: '1990-02-19',
        timeStarts: '07:43',
        timeEnds: '1990-02-20'
    }

    public calegoryList: any = [];
    public certificateArray = [
        { name: 'GIA', value: 'GIA', active: false, image: 'assets/icon/gia.png' },
        { name: 'IGI', value: 'IGI', active: false, image: 'assets/icon/igi.png' },
        { name: 'NONE', value: 'NONE', active: false, image: '' },
        { name: 'LOOSE DIAMOND', value: 'LOOSE DIAMOND', active: false, image: '' },
        { name: 'JEWELLERY', value: 'JEWELLERY', active: false, image: '' },
    ];

    public formData: any = {
        invoice_no: "",
        sales_cat_code: "",
        customer_name: "",
        mobile_no: "",
        from_date: "",
        to_date: "",
        certificate: "",
        lab: "",
        serve_by: "",
        appoint_by: "",
        page: 1
    }

    public searchResultData: any = [];

    public dateOrder: any = 'DESC';
    public invoiceOrder: any = 'DESC';

    public totalRecord: any;
    public totalPage: any;
    public totalCount: any = 0;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public globalServiceProvider: GlobalServiceProvider,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        private photoViewer: PhotoViewer
    ) {
        this.getCategoryList();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InvoicesPage');
    }

    getCategoryList() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();

        this.globalServiceProvider.getCategory().then((success: any) => {
            console.log("search : ", success);
            this.calegoryList = success;
            loading.dismiss();
        })
            .catch((error) => {
                console.error('API Error : ', error);
                let toast = this.toastCtrl.create({
                    message: error,
                    duration: 3000,
                    position: 'middle'
                });
                loading.dismiss();
            });
    }

    sorting(order, sortBy) {
        if (order == 'DESC') {
            this.invoiceOrder = 'ASC';
        } else {
            this.invoiceOrder = 'DESC';
        }

        this.formData.a_sort_order = this.invoiceOrder;
        this.formData.a_sort_by = sortBy;
        this.callresultAPI();
    }

    sortingDate(order, sortBy) {
        if (order == 'DESC') {
            this.dateOrder = 'ASC';
        } else {
            this.dateOrder = 'DESC';
        }

        this.formData.a_sort_order = this.dateOrder;
        this.formData.a_sort_by = sortBy;
        this.callresultAPI();
    }

    callresultAPI() {
        this.globalServiceProvider.apicall('getSalesInvoiceList', this.formData).then((success: any) => {
            this.searchResultData = success;

            for (let result of this.searchResultData) {
                for (let cat of this.calegoryList) {
                    if (cat.CAT_CODE == result.CAT_CODE) {
                        result.CAT_CODE = cat.CAT_NAME;
                    } else if (result.CAT_CODE == 0) {
                        result.CAT_CODE = "-";
                    }
                }
            }
        }).catch((error) => {
            console.error('API Error : ', error);
            let toast = this.toastCtrl.create({
                message: error,
                duration: 3000,
                position: 'middle'
            });
        });
    }

    showResult() {
        console.log('form Data', this.formData);
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();

        this.globalServiceProvider.apicall('getSalesInvoiceList', this.formData).then((success: any) => {
            console.log("search : ", this.formData);
            this.searchResultData = success;

            this.totalRecord = this.searchResultData[0].TotalCount;
            this.totalPage = Math.ceil(this.totalRecord / 50);
            this.totalCount = this.searchResultData.length;

            for (let result of this.searchResultData) {
                for (let cat of this.calegoryList) {
                    if (cat.CAT_CODE == result.CAT_CODE) {
                        result.CAT_CODE = cat.CAT_NAME;
                    } else if (result.CAT_CODE == 0) {
                        result.CAT_CODE = "-";
                    }
                }
            }
            loading.dismiss();
        }).catch((error) => {
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
        this.formData.page++;
        console.log('Page: ', this.formData.page);

        if (this.formData.page <= this.totalPage) {
            this.globalServiceProvider.apicall('getSalesInvoiceList', this.formData).then((success: any) => {
                this.totalRecord = this.searchResultData[0].TotalCount;

                for (let partListData of success) {
                    this.searchResultData.push(partListData);
                }

                for (let result of this.searchResultData) {
                    for (let cat of this.calegoryList) {
                        if (cat.CAT_CODE == result.CAT_CODE) {
                            result.CAT_CODE = cat.CAT_NAME;
                        } else if (result.CAT_CODE == 0) {
                            result.CAT_CODE = "-";
                        }
                    }
                }

                this.totalCount = this.searchResultData.length;
                infiniteScroll.complete();
            });
        }
        else {
            this.formData.page++;
            infiniteScroll.enable(false);
        }
    }

    showImage(invoiceId, isImage) {
        if (isImage == 1) {
            let params = {
                invoice_no: invoiceId
            }
            this.globalServiceProvider.apicall('getSalesInvoiceImage', params).then((success: any) => {
                console.log("success : ", success);
                if (success.isSuccess) {
                    const options = {
                        share: true, // default is false
                        closeButton: true, // default is true
                        copyToReference: true, // default is false
                        headers: "",  // If it is not provided, it will trigger an exception
                        piccasoOptions: {} // If it is not provided, it will trigger an exception
                    };
            
                    // this.photoViewer.show(url, 'Test', { share: true });
                    this.photoViewer.show(success.image, 'Invoice Image', options);
                }
            }).catch((error) => {
                console.error('API Error : ', error);
                let toast = this.toastCtrl.create({
                    message: error,
                    duration: 3000,
                    position: 'middle'
                });
            });
        }
    }

    resetData() {
        this.formData = {
            invoice_no: "",
            sales_cat_code: "",
            customer_name: "",
            mobile_no: "",
            from_date: "",
            to_date: "",
            certificate: "",
            lab: "",
            serve_by: "",
            appoint_by: "",
            page: 1
        }

        this.searchResultData = [];
    }

}
