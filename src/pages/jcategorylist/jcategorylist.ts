import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the JcategorylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-jcategorylist',
    templateUrl: 'jcategorylist.html',
})
export class JcategorylistPage {

    public categoryData: any;
    public temp = [];
    public productCode: any;

    public shapeArray = [
        { name: 'Round', value: 'R', active: false, image: 'assets/imgs/j_shapes/Round.png' },
        { name: 'Princess', value: 'PR', active: false, image: 'assets/imgs/j_shapes/Princess.png' },
        { name: 'Pear', value: 'PE', active: false, image: 'assets/imgs/j_shapes/Pear.png' },
        { name: 'Marquise', value: 'M', active: false, image: 'assets/imgs/j_shapes/Marquises.png' },
        { name: 'Cushion', value: 'CU', active: false, image: 'assets/imgs/j_shapes/Cushion.png' },
        { name: 'Oval', value: 'O', active: false, image: 'assets/imgs/j_shapes/Oval.png' },
        { name: 'Heart', value: 'H', active: false, image: 'assets/imgs/j_shapes/Heart.png' },
        { name: 'Emerald', value: 'EM', active: false, image: 'assets/imgs/j_shapes/Emerald.png' },
        { name: 'Radiant', value: 'RA', active: false, image: 'assets/imgs/j_shapes/Radiant.png' },
        { name: 'Other', value: 'OT', active: false, image: 'assets/imgs/j_shapes/Other.png' },
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private globalServiceProvider: GlobalServiceProvider, public loadingCtrl: LoadingController, private toast: Toast) {

        this.getAllCategory();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JcategorylistPage');
    }


    goToCateDetail(categoryName, categoryId) {

        this.temp = [];
        this.shapeArray.forEach(c => {

            if (c.active == true) {
                this.temp.push(c.value);
            }
        });

        this.navCtrl.push('JcatedetailPage', {
            cateName: categoryName,
            cateId: categoryId,
            shapeName: ''
        });
    }



    getAllCategory() {

        this.temp = [];

        this.shapeArray.forEach(c => {

            if (c.active == true) {
                this.temp.push("'" + c.value + "'");
            }
        });

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();


        let eventData = {
            shape: this.temp.toString()
        }

        console.log(eventData);

        this.globalServiceProvider.apicall("getAllCategory", eventData)
            .then((success: any) => {

                console.log(success);

                this.categoryData = success;
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

    gotoCateDetail(shapeName) {
        this.navCtrl.push('JcatedetailPage', {
            cateName: shapeName.name,
            cateId: '',
            shapeName: shapeName.value
        });
    }

    goToJDetail() {
        this.navCtrl.push('JcatedetailPage', {
            prodCode: this.productCode
        });
    }

    
}
