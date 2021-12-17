import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the JcatedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-jcatedetail',
    templateUrl: 'jcatedetail.html',
})
export class JcatedetailPage {

    public cateName: any;
    public cateId: any;
    public shapeName: any;
    public productData: any;

    public totalRecord = 0;

    public selectedShape;


    public shapeArray = [
        { name: 'Round', value: 'R', active: false, image: 'assets/imgs/shape/roundb.png' },
        { name: 'Princess', value: 'PR', active: false, image: 'assets/imgs/shape/princessb.png' },
        { name: 'Pear', value: 'PE', active: false, image: 'assets/imgs/shape/pearb.png' },
        { name: 'Marquise', value: 'M', active: false, image: 'assets/imgs/shape/marquiseb.png' },
        { name: 'Cushion', value: 'CU', active: false, image: 'assets/imgs/shape/cushionb.png' },
        { name: 'Oval', value: 'O', active: false, image: 'assets/imgs/shape/ovalb.png' },
        { name: 'Heart', value: 'H', active: false, image: 'assets/imgs/shape/heartb.png' },
        { name: 'Emerald', value: 'EM', active: false, image: 'assets/imgs/shape/emeraldb.png' },
        { name: 'Radiant', value: 'RA', active: false, image: 'assets/imgs/shape/radiantb.png' },
        { name: 'Other', value: 'OT', active: false, image: 'assets/imgs/shape/diamb.png' },

    ];


    public searchId: any;


    constructor(public navCtrl: NavController, public navParams: NavParams,
        private globalServiceProvider: GlobalServiceProvider, public loadingCtrl: LoadingController, private toast: Toast) {

        this.cateName = navParams.get('cateName');
        this.cateId = navParams.get('cateId');
        this.shapeName = navParams.get('shapeName');

        this.searchId = navParams.get('prodCode');
        //this.selectedShape = navParams.get('selectedShape');

        console.log(this.cateName + " " + this.cateId + " " + this.shapeName);
        console.log("sekerted: ");
        console.log(this.selectedShape);



        let valString = this.selectedShape;
        if (valString) {
            var checkArray = valString.split(',');

            console.log(checkArray);
            this.shapeArray.map(function (name) {

                console.log('1111:' + name.value);
                if (checkArray.includes(name.value)) {

                    console.log('find:' + name.value);
                    name.active = true;
                }
            });

        }


        if (this.searchId) {
            this.getSearchProducts();
        } else {
            this.getAllProduct();
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JcatedetailPage');
    }

    goToJDetail(productCode) {
        this.navCtrl.push('JdetailPage', {
            prodCode: productCode
        });
    }

    getSearchProducts() {
        let eventData: any ={
            id: this.searchId
        }

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();
        this.globalServiceProvider.apicall("searchJewellery", eventData)
            .then((success: any) => {

                console.log(success);

                this.productData = success;

                this.totalRecord = this.productData.length;
                loading.dismiss();

            })
            .catch((error) => {
                console.error('API Error : ', error);
                this.toast.show(error, '5000', 'center').subscribe(toast => { });
                loading.dismiss();
            });
    }


    getAllProduct() {
        let temp = [];

        this.shapeArray.forEach(c => {

            if (c.active == true) {
                temp.push("'" + c.value + "'");
            }
        });
        console.log("jiks:", temp);

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        let eventData = {
            id: this.cateId,
            shape: this.shapeName

        }

        console.log(eventData);

        this.globalServiceProvider.apicall("getAllProduct", eventData)
            .then((success: any) => {

                console.log(success);

                this.productData = success;


                this.totalRecord = this.productData.length;

                // if (success.isSuccess == 1) 
                // {

                //   console.log(success);
                //   // localStorage.setItem('pcode',success.pcode);
                //   // localStorage.setItem('email',success.email);
                //   // localStorage.setItem('fullname',success.fullname);                    

                // }
                // else
                // {
                //   this.toast.show(success.message, '5000', 'center').subscribe(toast => {});	
                // }
                loading.dismiss();

            })
            .catch((error) => {
                console.error('API Error : ', error);
                this.toast.show(error, '5000', 'center').subscribe(toast => { });
                loading.dismiss();
            });
    }

    colorClass(color) {
        color.active = !color.active;
    }


}
