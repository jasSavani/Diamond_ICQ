import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';

import { ShapePipe } from '../../pipes/shape/shape';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the CustomerInquiryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-customer-inquiry',
    templateUrl: 'customer-inquiry.html',
})

export class CustomerInquiryPage {
    public event = {
        month: '1990-02-19',
        timeStarts: '07:43',
        timeEnds: '1990-02-20'
    }

    public caratArray = [
        { name: '0.01 - 0.29', value: '1', active: false },
        { name: '0.30 - 0.39', value: '2', active: false },
        { name: '0.40 - 0.49', value: '3', active: false },
        { name: '0.50 - 0.59', value: '4', active: false },
        { name: '0.60 - 0.69', value: '5', active: false },
        { name: '0.70 - 0.79', value: '6', active: false },
        { name: '0.80 - 0.89', value: '7', active: false },
        { name: '0.90 - 0.99', value: '8', active: false },
        { name: '1.00 - 1.49', value: '9', active: false },
        { name: '1.50 - 1.99', value: '10', active: false },
        { name: '2.00 - 2.49', value: '11', active: false },
        { name: '2.50 - 2.99', value: '12', active: false },
        { name: '3.00 - 3.49', value: '13', active: false },
        { name: '3.50 - 3.99', value: '14', active: false },
        { name: '4.00 - 4.49', value: '15', active: false },
        { name: '4.50 - 4.99', value: '16', active: false },
        { name: '5.00 - 5.99', value: '17', active: false },
        { name: '6.00 - 6.99', value: '18', active: false },
        { name: '7.00 - 7.99', value: '19', active: false },
        { name: '8.00 - 8.99', value: '20', active: false },
        { name: '9.00 - 9.99', value: '21', active: false },
        { name: '10.00 - 100.00', value: '22', active: false },
    ];

    public statusArray = [
        // {name: 'Completed', value: '0'},
        // {name: 'Not Done', value: '1'},
        // {name: 'In Process', value: '2'},
        // {name: 'Not Have Stone', value: '3'},
        // {name: 'Made Invoice', value: '4'},
        // {name: 'Waiting For Customer Response', value: '5'}
    ]

    public labArray = [
        { name: 'GIA', value: 'GIA' },
        { name: 'IGI', value: 'IGI' },
        { name: 'NONE', value: 'NONE' },
        { name: 'LOOSE DIAMOND', value: 'LOOSE DIAMOND' },
        { name: 'JEWELLERY', value: 'JEWELLERY' },
        { name: 'CUSTOM', value: 'CUSTOM' }
    ]

    public shapeArray = [
        { name: 'Round', value: 'round', active: false, image: 'assets/imgs/shape/roundb.png' },
        { name: 'Princ', value: 'Princ', active: false, image: 'assets/imgs/shape/princessb.png' },
        { name: 'Pear', value: 'Pear', active: false, image: 'assets/imgs/shape/pearb.png' },
        { name: 'Marqi', value: 'Marqi', active: false, image: 'assets/imgs/shape/marquiseb.png' },
        { name: 'Cushi', value: 'Cushi', active: false, image: 'assets/imgs/shape/cushionb.png' },
        { name: 'Oval', value: 'Oval', active: false, image: 'assets/imgs/shape/ovalb.png' },
        { name: 'Heart', value: 'Heart', active: false, image: 'assets/imgs/shape/heartb.png' },
        { name: 'Emrld', value: 'Emrld', active: false, image: 'assets/imgs/shape/emeraldb.png' },
        // { name: 'Aschr', value: 'Aschr', active: false, image: 'assets/imgs/shape/asscher.png' },
        // { name: 'Shield', value: 'Shield', active: false, image: 'assets/imgs/shape/shield.png' },
        // { name: 'Trill', value: 'Trill', active: false, image: 'assets/imgs/shape/triangular.png' },
        { name: 'Other', value: 'Other', active: false, image: 'assets/imgs/shape/diamb.png' },
    ];

    public colorArray = [
        { name: 'D', value: 'D', active: false },
        { name: 'E', value: 'E', active: false },
        { name: 'F', value: 'F', active: false },
        { name: 'G', value: 'G', active: false },
        { name: 'H', value: 'H', active: false },
        { name: 'I', value: 'I', active: false },
        { name: 'J', value: 'J', active: false },
        { name: 'K', value: 'K', active: false },
        { name: 'L', value: 'L', active: false },
        { name: 'M', value: 'M', active: false },
        { name: 'N', value: 'N', active: false },
        { name: 'O', value: 'O', active: false },
        { name: 'P', value: 'P', active: false },
        { name: 'Q', value: 'Q', active: false },
        { name: 'R', value: 'R', active: false },
        { name: 'S', value: 'S', active: false },
        { name: 'T', value: 'T', active: false },
        { name: 'U', value: 'U', active: false },
        { name: 'V', value: 'V', active: false },
        { name: 'W', value: 'W', active: false },
        { name: 'X', value: 'X', active: false },
        { name: 'Y', value: 'Y', active: false },
        { name: 'Z', value: 'Z', active: false },
    ];


    public clarityArray = [
        { name: 'FL', value: '12', active: false },
        { name: 'IF', value: '1', active: false },
        { name: 'VVS1', value: '2', active: false },
        { name: 'VVS2', value: '3', active: false },
        { name: 'VS1', value: '4', active: false },
        { name: 'VS2', value: '5', active: false },
        { name: 'SI1', value: '6', active: false },
        { name: 'SI2', value: '7', active: false },
        { name: 'I1', value: '9', active: false },
        { name: 'I2', value: '10', active: false },
        { name: 'I3', value: '11', active: false },
    ];

    public formData: any = {
        sale_by: "",
        a_status: "",
        a_cust_name: "",
        a_mobile_no: "",
        a_from_date: "",
        a_to_date: "",
        a_cert_no: "",
        a_lab_type: "",
        a_from_carat: "",
        a_to_carat: "",
        a_size_code: "",
        a_shape: "",
        a_color: "",
        a_clarity: "",
        caratlist: "",
        page: 1,
        user: ""
    }

    public dateOrder: any = 'DESC';
    public priceOrder: any = 'DESC';

    public searchResultData = [];
    public salesByData: any = [];
    public totalRecord: any;
    public totalPage: any;
    public totalCount: any = 0;


    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public imageViewerCtrl: ImageViewerController,
        public loadingCtrl: LoadingController,
        public globalServiceProvider: GlobalServiceProvider,
        private toastCtrl: ToastController,
        private photoViewer: PhotoViewer
    ) {
        this.formData.user = localStorage.getItem('icq-username');
        // this.search();
        this.getSalesByData();
        this.getStatusData()
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InvoicesPage');
    }

    getSalesByData() {
        this.globalServiceProvider.getSalesBy().then((success: any) => {
            console.log("search : ", success);
            this.salesByData = success;
        })
            .catch((error) => {
                console.error('API Error : ', error);
                let toast = this.toastCtrl.create({
                    message: error,
                    duration: 3000,
                    position: 'middle'
                });
                toast.present();
            });
    }

    getStatusData() {
        this.globalServiceProvider.getStatus().then((success: any) => {
            console.log("search : ", success);
            this.statusArray = success;
        })
            .catch((error) => {
                console.error('API Error : ', error);
                let toast = this.toastCtrl.create({
                    message: error,
                    duration: 3000,
                    position: 'middle'
                });
                toast.present();
            });
    }

    sorting(order, sortBy) {
        if (order == 'DESC') {
            this.dateOrder = 'ASC'
        } else {
            this.dateOrder = 'DESC';
        }

        this.formData.a_sort_order = this.dateOrder;
        this.formData.a_sort_by = sortBy;
        this.callresultAPI();
    }


    showResult() {
        console.log('formData', this.formData);
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();

        // this.formData.a_status = "";
        if (this.formData.user == 'admin') {
        } else {
            this.formData.sale_by = this.formData.user;
        }

        this.globalServiceProvider.apicall('getCustomerRequestList', this.formData).then((success: any) => {
            this.searchResultData = success;

            this.totalRecord = this.searchResultData[0].TotalCount;
            this.totalPage = Math.ceil(this.totalRecord / 50);
            this.totalCount = this.searchResultData.length;

            for (let result of this.searchResultData) {
                for (let cat of this.statusArray) {
                    if (cat.STATUS_CODE == result.APPLICATION_STATUS) {
                        result.APPLICATION_STATUS = cat.STATUS_NAME;
                    }
                }

                result.TO_CARAT = result.TO_CARAT.toFixed(2);
                result.FROM_CARAT = result.FROM_CARAT.toFixed(2);
            }

            console.log('this.searchResultData', this.searchResultData);
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

    callresultAPI() {
        this.globalServiceProvider.apicall('getCustomerRequestList', this.formData).then((success: any) => {
            // console.log("search : ",  success);
            this.searchResultData = success;

            for (let result of this.searchResultData) {
                for (let cat of this.statusArray) {
                    if (cat.STATUS_CODE == result.APPLICATION_STATUS) {
                        result.APPLICATION_STATUS = cat.STATUS_NAME;
                    }
                }
            }

            console.log('this.searchResultData', this.searchResultData);
        })
            .catch((error) => {
                console.error('API Error : ', error);
                let toast = this.toastCtrl.create({
                    message: error,
                    duration: 3000,
                    position: 'middle'
                });
            });
    }

    showImage(image) {
        this.photoViewer.show(image);
    }

    resetData() {
        this.formData = {
            sale_by: "",
            a_status: "",
            a_cust_name: "",
            a_mobile_no: "",
            a_from_date: "",
            a_to_date: "",
            a_cert_no: "",
            a_lab_type: "",
            a_from_carat: "",
            a_to_carat: "",
            a_size_code: "",
            a_shape: "",
            a_color: "",
            a_clarity: "",
            caratlist: "",
            page: 1
        }

        this.searchResultData = [];
        this.formData.user = localStorage.getItem('icq-username');
    }

    editResult(id) {
        this.navCtrl.push("CustomerListViewPage", {
            id: id
        });
    }


    doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        this.formData.page++;
        console.log('Page: ', this.formData.page);

        if (this.formData.page <= this.totalPage) {
            this.globalServiceProvider.apicall('getCustomerRequestList', this.formData).then((success: any) => {
                // this.searchPost.page++;
                this.totalRecord = this.searchResultData[0].TotalCount;

                for (let partListData of success) {
                    this.searchResultData.push(partListData);
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
}
