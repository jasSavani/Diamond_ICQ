import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController, ToastController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { DomSanitizer } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing';

import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { TranslateService } from '@ngx-translate/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Observable } from 'rxjs';

/**
 * Generated class for the DiamondDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-diamond-detail',
    templateUrl: 'diamond-detail.html',
})
export class DiamondDetailPage {

    diamond: string = "certificate";
    isAndroid: boolean = false;

    public stonedata: any = "";
    public imageurl: any = "";
    public videourl: any = "";

    public fullname: any = "";
    public userid: any;
    public stoneid: any = '';
    public email: any = '';

    public certPath: any;
    public dType: any;
    public userName: any;

    public fileTransfer: FileTransferObject = this.transfer.create();
    public remarks: any;

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
        private iab: InAppBrowser,
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




        this.fullname = localStorage.getItem('icq--fullname');
        this.email = localStorage.getItem('icq--email');

        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
            result => console.log('Has permission?', result.hasPermission),
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

    openCert(certPath) {
        if (certPath) {
            // this.iab.create(certPath, '_system');
            this.iab.create("https://starrays.com/aspxpages/FrmShowLabPdfFile.aspx?reportno=" + certPath, '_system');
        }
    }

    getdetail() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        let eventData = {
            id: this.stoneid,
            user: this.userid
        }

        this.globalServiceProvider.apicall('diamondDetail', eventData).then((success: any) => {
            console.log('detail diamond', success);

            this.stonedata = success[0];
            this.imageurl = success[0].image;
            this.videourl = success[0].video;
            this.certPath = success[0].certificate_pdf;

            // console.log('stonedata', this.imageurl);
            loading.dismiss();
        });
    }

    shareImage(url) {
        console.log('sharee', url);

        let targetURL: any;
        if (this.isAndroid) {
            targetURL = this.file.externalRootDirectory
        } else {
            targetURL = this.file.dataDirectory
        }

        if (this.isAndroid) {
            this.socialSharing.shareViaWhatsApp('',  url, '').then((res) => {
                // Sharing via email is possible
                console.log('resss social share', res);
            }).catch((error) => {
                console.log('error social share', error);
                // Sharing via email is not possible
            });
        } else {
            this.socialSharing.share('', '',  url, '');
        }

        // this.socialSharing.share('', '',  url, '');
            // this.socialSharing.shareViaWhatsApp('', '', entry.nativeURL).then((res) => {
            //     // Sharing via email is possible
            //     console.log('resss social share', res);
            // }).catch((error) => {
            //     console.log('error social share', error);
            //     // Sharing via email is not possible
            // });
    }

    saveRemark() {
        let eventData = {
            id: this.stonedata.STONEID,
            type: 'diamond',
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

    downloadImage(downloadURL) {
        console.log('this.file documentsDirectory', this.file.externalCacheDirectory);

        let targetURL: any;

        if (this.isAndroid) {
            targetURL = this.file.documentsDirectory
        } else {
            targetURL = this.file.dataDirectory
        }

        this.fileTransfer.download(downloadURL, targetURL + 'download/' + Date.now() + '.jpg').then((entry) => {
            console.log('download complete: ', JSON.stringify(entry));
            this.presentToast('Download image successfully...');
        }, (error) => {
            // handle error
            console.log('error Image');
            console.log(error);
        });

    }

    downloadVideo(downloadURL) {
        console.log('downalod', downloadURL);
        let targetURL: any;

        if (this.isAndroid) {
            targetURL = this.file.externalRootDirectory;
        } else {
            targetURL = this.file.dataDirectory
        }

        this.fileTransfer.download(downloadURL, targetURL + 'download/' + Date.now() + '.mp4').then((entry) => {
            console.log('download complete: ' + entry.toURL());
            //   this.presentToast(entry.toURL());
            this.presentToast('Download video successfully...');
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
