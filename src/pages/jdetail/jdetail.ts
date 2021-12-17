import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Platform } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { Toast } from '@ionic-native/toast';
import { SocialSharing } from '@ionic-native/social-sharing';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the JdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-jdetail',
    templateUrl: 'jdetail.html',
})
export class JdetailPage {

    public diamond: string = "silver";
    public prodCode: any;
    public prodDetailData: any = "";
    public goldImgData: any = "";
    public silverImgData: any = "";
    public roseImgData: any = "";
    public sizeData: any = "";

    public fileTransfer: FileTransferObject = this.transfer.create();
    public isAndroid: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private globalServiceProvider: GlobalServiceProvider,
        public loadingCtrl: LoadingController,
        private toast: Toast,
        private platform: Platform,
        public toastCtrl: ToastController,
        public socialSharing: SocialSharing,
        private transfer: FileTransfer,
        private file: File,
    ) {
        this.isAndroid = platform.is('android');
        this.prodCode = navParams.get('prodCode');
        this.getProductDetail();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JdetailPage');
    }


    getProductDetail() {

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        let eventData = {
            id: this.prodCode,
        }

        console.log(eventData);

        this.globalServiceProvider.apicall("getProductDetail", eventData)
            .then((success: any) => {

                console.log(success);

                this.prodDetailData = success;

                console.log(this.prodDetailData);

                this.silverImgData = this.prodDetailData.W;
                this.goldImgData = this.prodDetailData.Y;
                this.roseImgData = this.prodDetailData.R;
                this.sizeData = this.prodDetailData.SIZE;


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

    downloadImage(downloadURL) {
        console.log(downloadURL);
        let targetURL: any;

        if (this.isAndroid) {
            targetURL = this.file.externalRootDirectory
        } else {
            targetURL = this.file.dataDirectory
        }

        this.fileTransfer.download(downloadURL, targetURL + 'download/' + Date.now() + '.jpg').then((entry) => {
            console.log('download complete: ', entry);
            // this.presentToast(entry.toURL());
            this.presentToast('Download image successfully...')

        }, (error) => {
            // handle error
            console.log('error Image');
            console.log(error);

        });
    }

    shareImage(url) {
        console.log('urlurlurl', url);
        if (this.isAndroid) {
            this.socialSharing.shareViaWhatsApp('', url, '').then((res) => {
                console.log('resss social share', res);
            }).catch((error) => { 
                console.log('error social share', error);
            });
        } else {
            this.socialSharing.share('', '',  url, '');
        }
    }

    async presentToast(savePath) {
        const toast = await this.toastCtrl.create({

            message: '' + savePath,
            duration: 2000
        });
        toast.present();
    }

}
