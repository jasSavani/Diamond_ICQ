import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController, ToastController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { DomSanitizer } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing';

// import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { TranslateService } from '@ngx-translate/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
/**
 * Generated class for the RingdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ringdetail',
  templateUrl: 'ringdetail.html',
})
export class RingdetailPage {

  diamond: string = "certificate";
    isAndroid: boolean = false;

    public stonedata: any = "";
    public imageurl1: any = "";
    public imageurl2: any = "";
    public imageurl3: any = "";
    public videourl: any = "";

    public fullname: any = "";
    public userid: any;
    public stoneid: any = '';
    public email: any = '';

    public certPath: any;
    public dType: any;
    public userName: any;

    public fileTransfer: FileTransferObject = this.transfer.create();

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public Doms: DomSanitizer,
        public platform: Platform,
        private transfer: FileTransfer,
        private file: File,
        private globalServiceProvider: GlobalServiceProvider,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        // private iab: InAppBrowser,
        private toastCtrl: ToastController,
        private socialSharing: SocialSharing,
        private androidPermissions: AndroidPermissions
    ) {

        this.isAndroid = platform.is('android');
        this.stoneid = this.navParams.get('stoneid');
        this.dType = this.navParams.get('dType');

        console.log('dType', this.stoneid);
        this.userName = localStorage.getItem('icq-username');
        this.userid = localStorage.getItem('icq-userid');



        this.fullname = localStorage.getItem('icq-fullname');
        this.email = localStorage.getItem('icq-email');

        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
            result => console.log('Has permission?',result.hasPermission),
            err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
          );
      
      
          this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);
          console.log(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);

        this.getdetail();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DiamondDetailPage');
    }

    backToResult() {
        this.navCtrl.pop();
    }

    openCertPDF(certPath) {
        if (certPath) {
            // this.iab.create(certPath, '_system');
        }
    }

    getdetail() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        let eventData = {
          ring_no: this.stoneid,
          user: this.userid
        }

        this.globalServiceProvider.apicall('ringDetail', eventData).then((success: any) => {
            console.log('detail diamond', success);

            this.stonedata = success[0];
            this.imageurl1 = success[0].image1;
            this.imageurl2 = success[0].image2;
            this.imageurl3 = success[0].image3;
            this.videourl = success[0].video;
            this.certPath = success[0].certificate_pdf;

            
            loading.dismiss();
        });
    }

    saveRemark() {
        let eventData = {
            id: this.stonedata.RING_NO,
            type: 'ring',
            user: this.userid,
            remarks: this.stonedata.remarks, //'test data'
        }

        this.globalServiceProvider.apicall('saveRemarks', eventData).then((success: any) => {
            console.log('save remarkkk', success);
            let toast = this.toastCtrl.create({
                message: success.message,
                duration: 3000,
                position: 'top'
              });

              toast.present();

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


    addtocart() {

        // if (true) {
        //     let eventData: any = {
        //         id: this.userid,
        //         pid: this.stoneid,
        //         email: this.email,
        //         fn: 'addtocart'
        //     }
        //     let loading = this.loadingCtrl.create({
        //         content: this._translate.instant('Adding to Cart')
        //     });

        //     loading.present();

        //     this.globalServiceProvider.apicall(eventData).then((success: any) => {
        //         this.globalServiceProvider.letToast(success.message);
        //         if (success.isSuccess == 1) {
        //             this.globalServiceProvider.letToast(this._translate.instant('Stone Added Successfully!'));
        //         }
        //         loading.dismiss();
        //     }).catch((error) => {
        //         console.error('API Error : ', error);
        //         this.globalServiceProvider.letToast(error);
        //         this.navCtrl.setRoot('SearchPage');
        //     });
        // }
        // else {
        // }
    }

    confirmstone(type, comment, pid) {

        /*
        let loading = this.loadingCtrl.create({
            content: 'Processing...'
        });
        let eventData: any = {

            pcode: this.pcode,
            userid: this.userid,
            pid: pid,
            fullname: this.fullname,
            atype: type,
            comment: comment,
            scode: this.scode

        }

        loading.present();

        this.globalServiceProvider.apicall('confirmstone', eventData).then((success: any) => {

            this.globalServiceProvider.letToast(success.message);
            loading.dismiss();
        }).catch((error) => {
            console.error('API Error : ', error);
            this.globalServiceProvider.letToast(error);
            this.navCtrl.setRoot('SearchPage');
        });
        */

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
            console.log('download complete: ' , entry);
            // this.presentToast(entry.toURL());
            this.presentToast('Download image successfully...')

        }, (error) => {
            // handle error
            console.log('error Image');
            console.log(error);

        });

    }

    downloadVideo(downloadURL){
        console.log(downloadURL);

        let targetURL: any;

        if (this.isAndroid) {
            targetURL = this.file.externalRootDirectory
        } else {
            targetURL = this.file.dataDirectory
        }
      
       this.fileTransfer.download(downloadURL, targetURL +'download/'+ Date.now()+'.mp4').then((entry) => {
          console.log('download complete: ' + entry.toURL());
          // this.presentToast(entry.toURL())
          this.presentToast('Download image successfully...')
           }, (error) => {
          // handle error
          console.log('error Image');
          console.log(error);
    
        });
    
      }

    async presentToast(savePath) {
        const toast = await this.toastCtrl.create({

            message: '' + savePath,
            duration: 2000
        });
        toast.present();
    }

}
