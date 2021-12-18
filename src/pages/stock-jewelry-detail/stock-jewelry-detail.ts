import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController, ToastController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { DomSanitizer } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing';

// import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { TranslateService } from '@ngx-translate/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { FullShapePipe } from '../../pipes/full-shape/full-shape';
import { Slides } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the StockJewelryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-stock-jewelry-detail',
    templateUrl: 'stock-jewelry-detail.html',
})
export class StockJewelryDetailPage {
    @ViewChild(Slides) slides: Slides;

    public detailData: any;
    public ringNo: any;
    public userid: any;
    public isAndroid: any;
    public remarks: any;
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
        private androidPermissions: AndroidPermissions,
        public photoViewer: PhotoViewer
    ) {

        this.isAndroid = platform.is('android');

        this.ringNo = this.navParams.get('ringNo');
        this.userid = localStorage.getItem('icq-userid');
        this.userName = localStorage.getItem('icq-username');

        // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
        //     result => console.log('Has permission?', result.hasPermission),
        //     err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
        // );


        // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);
        console.log(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);


        this.getdetail();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StockJewelryDetailPage');
    }

    onChangeSlider(slideNo) {
        this.slides.slideTo(slideNo, 500);
    }



    getdetail() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        let eventData = {
            ring_no: this.ringNo,
            user: this.userid
        }

        this.globalServiceProvider.apicall('ringDetail', eventData).then((success: any) => {
            console.log('detail diamond', success);

            this.detailData = success[0];
            // this.imageurl1 = success[0].image1;
            // this.imageurl2 = success[0].image2;
            // this.imageurl3 = success[0].image3;
            // this.videourl = success[0].video;
            // this.certPath = success[0].certificate_pdf;


            loading.dismiss();
        });
    }

    shareImage() {
        let index = this.slides.getActiveIndex();
        let url =  this.detailData.RingImage[index-1];

        if (this.isAndroid) {
            this.socialSharing.shareViaWhatsApp('', url, '').then((res) => {
                console.log('resss social share', res);
            }).catch((error) => {
                console.log('error social share', error);
            });
        } else {
            this.socialSharing.share('', '', url, '');
        }
    }

    getIndex() {
        this.slides.getActiveIndex();
    }

    downloadImage() {
        // console.log(downloadURL);
        let index = this.slides.getActiveIndex();
        let isVideo = false;
        let targetURL: any;
        let downloadURL: any;

        if (index > this.detailData.RingImage.length) {
            isVideo = true;
            downloadURL = this.detailData.video;
        } else  {
            isVideo = false;
            downloadURL =  this.detailData.RingImage[index-1];
        }
    
        
        if (this.isAndroid) {
            targetURL = this.file.externalRootDirectory
        } else {
            targetURL = this.file.dataDirectory
        }

        console.log('aaaa > ', index, isVideo, downloadURL);

        if (isVideo) {
            this.fileTransfer.download(downloadURL, targetURL + 'download/' + Date.now() + '.mp4').then((entry) => {
                console.log('download complete: ' + entry.toURL());
                // this.presentToast(entry.toURL())
                this.presentToast('Download image successfully...')
            }, (error) => {
                // handle error
                console.log('error Image');
                console.log(error);
    
            });
        } else {
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
    
    }

    openCert(url) {
        const options = {
            share: true, // default is false
            closeButton: true, // default is true
            copyToReference: true, // default is false
            headers: "",  // If it is not provided, it will trigger an exception
            piccasoOptions: {} // If it is not provided, it will trigger an exception
        };

        // this.photoViewer.show(url, 'Test', { share: true });
        this.photoViewer.show(url, this.detailData.NAME, options);
    }

    downloadVideo(downloadURL) {
        console.log(downloadURL);

        let targetURL: any;

        if (this.isAndroid) {
            targetURL = this.file.externalRootDirectory
        } else {
            targetURL = this.file.dataDirectory
        }
    }

    async presentToast(savePath) {
        const toast = await this.toastCtrl.create({

            message: '' + savePath,
            duration: 2000
        });
        toast.present();
    }

    saveRemark() {
        let eventData = {
            id: this.detailData.RING_NO,
            type: 'ring',
            user: this.userid,
            remarks: this.detailData.remarks, //'test data'
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

}
