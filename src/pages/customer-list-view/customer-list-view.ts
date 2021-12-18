import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

import { ShapePipe } from '../../pipes/shape/shape';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { s } from '@angular/core/src/render3';
import { PhotoViewer } from '@ionic-native/photo-viewer';


@IonicPage()
@Component({
    selector: 'page-customer-list-view',
    templateUrl: 'customer-list-view.html',
})

export class CustomerListViewPage {
    public ex = false;
    public a_advance: any = [];

    public socialMedia = [
        { name: "Whatsapp", value: "WHATSAPP", image: './assets/imgs/social/whatsapp.png', active: false, },
        { name: "Fb", value: "FB", image: './assets/imgs/social/facebook.png', active: false, },
        { name: "Insta", value: "INSTA", image: './assets/imgs/social/instagram.png', active: false, },
        { name: "Web", value: "WEB", image: './assets/imgs/social/global.png', active: false, },
        { name: "Youtube", value: "YOUTUBE", image: './assets/imgs/social/youtube.png', active: false, },
        { name: "Google", value: "GOOGLE", image: './assets/imgs/social/search.png', active: false, },
        { name: "Phone", value: "PHONE", image: './assets/imgs/social/phone-call.png', active: false, },
        { name: "Other", value: "OTHER", image: './assets/imgs/social/ellipsis.png', active: false, },
    ]

    public shapeArray = [
        { name: 'Round', value: 'Round', active: false, image: 'assets/imgs/shape/roundb.png' },
        { name: 'Princ', value: 'Princ', active: false, image: 'assets/imgs/shape/princessb.png' },
        { name: 'Pear', value: 'Pear', active: false, image: 'assets/imgs/shape/pearb.png' },
        { name: 'Marqi', value: 'Marqi', active: false, image: 'assets/imgs/shape/marquiseb.png' },
        { name: 'Cushi', value: 'Cushi', active: false, image: 'assets/imgs/shape/cushionb.png' },
        { name: 'Oval', value: 'Oval', active: false, image: 'assets/imgs/shape/ovalb.png' },
        { name: 'Heart', value: 'Heart', active: false, image: 'assets/imgs/shape/heartb.png' },
        { name: 'Emrld', value: 'Emrld', active: false, image: 'assets/imgs/shape/emeraldb.png' },
        { name: 'Radiant', value: 'Radiant', active: false, image: 'assets/imgs/shape/radiantb.png' },
        // { name: 'Emrld', value: 'Emrld', active: false, image: 'assets/imgs/shape/radiantb.png' },
        // { name: 'ASCHR', value: 'ASCHR', active: false, image: 'assets/imgs/shape/asscher.png' },
        // { name: 'SHIELD', value: 'SHIELD', active: false, image: 'assets/imgs/shape/shield.png' },
        // { name: 'TRILL', value: 'TRILL', active: false, image: 'assets/imgs/shape/triangular.png' },
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
        { name: 'O-Z', value: 'O-Z', active: false },
    ];


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


    public clarityArray = [
        { name: 'FL', value: 'FL', active: false },
        { name: 'IF', value: 'IF', active: false },
        { name: 'VVS1', value: 'VVS1', active: false },
        { name: 'VVS2', value: 'VVS2', active: false },
        { name: 'VS1', value: 'VS1', active: false },
        { name: 'VS2', value: 'VS2', active: false },
        { name: 'SI1', value: 'SI1', active: false },
        { name: 'SI2', value: 'SI2', active: false },
        { name: 'I1', value: 'I1', active: false },
        { name: 'I2', value: 'I2', active: false },
        { name: 'I3', value: 'I3', active: false },

    ];


    public certificateArray = [
        { name: 'GIA', value: 'GIA', active: false, image: 'assets/icon/gia.png' },
        { name: 'IGI', value: 'IGI', active: false, image: 'assets/icon/igi.png' },
        { name: 'NONE', value: 'NONE', active: false, image: '' },
        { name: 'LOOSE DIAMOND', value: 'LOOSE DIAMOND', active: false, image: '' },
        { name: 'JEWELLERY', value: 'JEWELLERY', active: false, image: '' },
    ];

    public advancedArray = [
        { name: '3EX', value: '3EX', active: true },
        { name: 'EX', value: 'EX', active: false },
        { name: 'VG', value: 'VG', active: true },
        { name: 'GD', value: 'GD', active: true },
        { name: 'FR', value: 'FR', active: false },
        { name: 'PR', value: 'PR', active: false },
        { name: 'ANY', value: 'ANY', active: false },
    ];

    public statusArray = [
        // { name: 'Completed', value: '0' },
        // { name: 'Not Done', value: '1' },
        // { name: 'In Process', value: '2' },
        // { name: 'Not Have Stone', value: '3' },
        // { name: 'Made Invoice', value: '4' },
        // { name: 'Waiting For Customer Response', value: '5' }
    ];

    public flurArray = [
        { name: 'NONE', value: 'NONE', active: false },
        { name: 'VERY SLIGHT', value: 'VERY SLIGHT', active: false },
        { name: 'FAINT', value: 'FAINT', active: false },
        { name: 'MEDIUM', value: 'MEDIUM', active: false },
        { name: 'STRONG', value: 'STRONG', active: false },
        { name: 'NILL', value: 'NILL', active: false },
    ];



    public searchPost: any = {
        a_from_carat: "",
        a_to_carat: "",
        a_color: '',
        a_shape: '',
        a_clarity: '',
        page: 1,
        userid: '',
        a_fancy_color: "",
        a_cert_no: '',
        ex: 0,
        a_lab_type: '',
        a_from_price: '',
        a_to_price: '',

        a_type: 4,
        a_advance: [],
        a_cust_name: "",
        a_mobile_no: "",
        p_how_cert: "",
        a_comment: "",
        a_flou: "",

        a_smedia: "",


        a_date: "",
        a_time: "",
        staff_name: "",
        a_size_code: "",
        a_status: "",
    }

    public isFancyColor: any = false;
    public editId: any;

    imageURI: any;
    imageFileName: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public imageViewerCtrl: ImageViewerController,
        private globalServiceProvider: GlobalServiceProvider,
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private transfer: FileTransfer,
        private camera: Camera,
        private photoViewer: PhotoViewer
    ) {
        this.searchPost.staff_name = localStorage.getItem('icq-username');
        this.getStatusData();
        this.editId = this.navParams.get('id');

        if (this.editId) {
            this.getDetail()
        }
    }

    getImage() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            mediaType: this.camera.MediaType.PICTURE,
        }

        this.camera.getPicture(options).then((imageData) => {
            this.imageURI = 'data:image/jpeg;base64,' + imageData;
            console.log('image success >> ', imageData);
            this.presentToast("Image picked successfully");
        }, (err) => {
            console.log(err);
            this.presentToast(err);
        });
    }

    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    setEditData(array, value, isArray) {
        if (isArray) {
            let valArr = value.split(',');
            for (var i = 0; i < valArr.length; i++) {
                let index = array.findIndex(ele => ele.value == valArr[i].toString());

                if (index > -1) {
                    array[index].active = true;
                }
            }

        } else {
            array.forEach(element => {
                if (element.value == value) {
                    element.active = true;
                }
            });
        }
    }

    getDetail() {
        this.globalServiceProvider.getDetail(this.editId).then((success: any) => {
            console.log("search : ", success);
            // this.statusArray = success;
            let data = success[0];

            this.searchPost = {
                a_from_carat: data.FROM_CARAT == 0 ? "" : data.FROM_CARAT,
                a_to_carat: data.TO_CARAT == 0 ? "" : data.TO_CARAT,
                a_color: data.COLOR,
                a_shape: data.SHAPE,
                a_clarity: data.CLARITY,
                page: 1,
                userid: data.ID,
                a_fancy_color: data.FANCY_COLOR,
                a_cert_no: data.CERT_NO,
                // ex: data.FROM_CARAT,
                a_lab_type: data.LAB_TYPE,
                a_from_price: data.FROM_PRICE == 0 ? "" : data.FROM_PRICE,
                a_to_price: data.TO_PRICE == 0 ? "" : data.TO_PRICE,

                a_type: data.APPOINTMENT_TYPE,
                a_advance: data.ADVANCE.split(','),
                a_cust_name: data.CUST_NAME,
                a_mobile_no: data.MOBILE_NO,
                p_how_cert: data.HOW_CERT,
                a_comment: data.COMMENT,
                a_flou: data.FLOU,

                a_smedia: data.SOCIAL_MEDIA,


                a_date: data.APPOINTMENT_DATE,
                a_time: data.APPOINTMENT_TIME,
                staff_name: data.STAFF_NAME,
                a_size_code: data.SIZE_CODE == 0 ? "" : data.SIZE_CODE,
                a_status: data.APPLICATION_STATUS,
            }

            this.imageURI = data.IMAGE_LINK

            this.setEditData(this.socialMedia, data.SOCIAL_MEDIA, false);
            this.setEditData(this.shapeArray, data.SHAPE, false);
            this.setEditData(this.colorArray, data.COLOR, true);
            this.setEditData(this.clarityArray, data.CLARITY, true);
            this.setEditData(this.flurArray, data.FLOU, true);
            this.setEditData(this.certificateArray, data.LAB_TYPE, false);
            this.setEditData(this.certificateArray, data.LAB_TYPE, false);
            this.setEditData(this.statusArray, data.APPLICATION_STATUS, false);
            this.setEditData(this.advancedArray, data.ADVANCE, true);



            this.isFancyColor = data.FANCY_COLOR ? true : false;

            console.log('searchPostsearchPost >>', this.searchPost);
        })
            .catch((error) => {
                console.error('API Error : ', error);
                this.presentToast(error);
            });
    }

    getStatusData() {
        this.globalServiceProvider.getStatus().then((success: any) => {
            console.log("search : ", success);
            this.statusArray = success;
        })
            .catch((error) => {
                console.error('API Error : ', error);
                this.presentToast(error);
            });
    }

    // New Code Start
    changeType(val) {
        if (this.searchPost.a_type == val) {
            this.searchPost.a_type = 4;
        } else {
            this.searchPost.a_type = val;
        }
    }

    howCert(val) {
        if (this.searchPost.p_how_cert == val) {
            this.searchPost.p_how_cert = ""
        } else {
            this.searchPost.p_how_cert = val;
        }
    }

    selectShape(index) {
        console.log(index);
        this.shapeArray.forEach(c => {
            c.active = false;
        });

        this.shapeArray[index].active = true;
        this.searchPost.a_shape = this.shapeArray[index].value;

        console.log('social media', this.shapeArray);
    }

    // New Code end

    colorClass(color) {
        color.active = !color.active;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SearchPage');
    }

    selectSocial(index) {
        console.log(index);
        this.socialMedia.forEach(c => {
            c.active = false;
        });

        this.socialMedia[index].active = true;
        this.searchPost.a_smedia = this.socialMedia[index].name;

        console.log('social media', this.socialMedia);
    }

    selectCerty(index) {
        console.log(index);
        this.certificateArray.forEach(c => {
            c.active = false;
        });

        this.certificateArray[index].active = true;
        this.searchPost.a_lab_type = this.certificateArray[index].value;

        console.log('certificateArray', this.certificateArray);
    }

    goTosearchresult() {
        let temp = [];
        // shape array finding
        temp = [];
        this.shapeArray.forEach(c => {
            if (c.active == true) {
                temp.push(c.value);
            }
        });

        this.searchPost.a_shape = temp.join(',');


        // color  array finding
        temp = [];
        this.colorArray.forEach(c => {
            if (c.active == true) {
                temp.push(c.value);
            }
        });
        this.searchPost.a_color = temp.join(',');

        temp = [];
        this.flurArray.forEach(c => {
            if (c.active == true) {
                temp.push(c.value);
            }
        });
        this.searchPost.a_flou = temp.toString();


        // clarity  array finding
        temp = [];
        this.clarityArray.forEach(c => {
            if (c.active == true) {
                temp.push(c.value);
            }
        });
        this.searchPost.a_clarity = temp.join(',');


        this.searchPost.a_advance = this.searchPost.a_advance ? this.searchPost.a_advance.join(',') : "";

        // certificate  array finding
        temp = [];
        this.certificateArray.forEach(c => {
            if (c.active == true) {
                temp.push(c.value);
            }
        });
        this.searchPost.a_lab_type = temp.join(',');

        
        delete this.searchPost.ex;
        delete this.searchPost.userid;
        delete this.searchPost.page;

        let date = new Date()

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let hours = date.getHours();
        let minute: any =  date.getMinutes();

        this.searchPost.a_date = year + '-' + month + '-' + day;
        
        
        if (minute < 10) {
            minute = '0' + minute;
        }

        this.searchPost.a_time = hours + ':' + minute;


        console.log("searchPost 123: ",this.searchPost.a_time);
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        if (!this.searchPost.a_smedia && !this.searchPost.a_cust_name) {
            this.presentToast('Please select social media & customer name');
        } else if (!this.searchPost.a_smedia && this.searchPost.a_cust_name) {
            this.presentToast('Please select social media');
        } else if (this.searchPost.a_smedia && !this.searchPost.a_cust_name) {
            this.presentToast('Please enter customer name');
        } else if (this.editId) {


            loading.present();
            if (this.imageURI) {
                const fileTransfer: FileTransferObject = this.transfer.create();
                this.searchPost.request_id = this.editId;

                let options: FileUploadOptions = {
                    fileKey: 'image',
                    fileName: 'image.png',
                    chunkedMode: false,
                    mimeType: "image/png",
                    headers: {},
                    params: this.searchPost
                }

                console.log('options >>', options);

                fileTransfer.upload(this.imageURI, 'https://api.zairradiamond.com/Home/updateCustomerRequestByID', options)
                    .then((data: any) => {
                        console.log(data, " Uploaded Successfully");

                        let res = JSON.parse(data.response);
                        if (res.isSuccess == 1) {
                            this.resetPost();
                            this.presentToast("Image uploaded successfully");
                            this.navCtrl.push('CustomerInquiryPage');
                        }

                        loading.dismiss();
                    }, (err) => {
                        console.log('upload error', JSON.stringify(err));
                        loading.dismiss();
                        this.presentToast(err);
                    });
            } else {
                this.searchPost.request_id = this.editId;
                this.searchPost.image = "";
                this.globalServiceProvider.apicall('updateCustomerRequestByID', this.searchPost).then((success: any) => {
                    console.log("search : ", this.searchPost);
                    loading.dismiss();
                    if (success.isSuccess) {
                        this.presentToast("Inquiry updated successfully")
                        this.resetPost();
                        this.navCtrl.push('CustomerInquiryPage');
                    }
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
        } else {
            loading.present();
            if (this.imageURI) {
                const fileTransfer: FileTransferObject = this.transfer.create();

                let options: FileUploadOptions = {
                    fileKey: 'image',
                    fileName: 'image.png',
                    chunkedMode: false,
                    mimeType: "image/png",
                    headers: {},
                    params: this.searchPost
                }

                console.log('options >>', options);

                fileTransfer.upload(this.imageURI, 'https://api.zairradiamond.com/Home/saveCustomerRequestList', options)
                    .then((data: any) => {
                        console.log(data, " Uploaded Successfully");
                        let res = JSON.parse(data.response);
                        if (res.isSuccess == 1) {
                            this.resetPost();
                            this.presentToast("Image uploaded successfully");
                            this.navCtrl.push('CustomerInquiryPage');
                        }

                        loading.dismiss();
                    }, (err) => {
                        console.log('upload error', JSON.stringify(err));
                        loading.dismiss();
                        this.presentToast(err);
                    });
            } else {
                this.searchPost.image = "";
                this.globalServiceProvider.apicall('saveCustomerRequestList', this.searchPost).then((success: any) => {
                    console.log("search : ", this.searchPost);
                    loading.dismiss();
                    if (success.isSuccess == 1) {
                        this.presentToast("Inquiry submited successfully");
                        this.resetPost();
                        this.navCtrl.push('CustomerInquiryPage');
                    }
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
        }
    }

    closeImage() {
        this.imageURI = "";
    }


    isFancy() {
        if (!this.isFancyColor) {
            // this.searchPost.a_fancy_color = 1;
            this.isFancyColor = true;
        }
        else {
            // this.searchPost.a_fancy_color = 0;
            this.isFancyColor = false;
        }
    }


    public isResult = true;
    public totalPage = 1;
    public shareUrl = "";
    public searchResult: any;
    public totalRecord = 0;
    public totalCount: any = 0;

    exFilterSet() {
        if (this.searchPost.ex == 0) {
            this.searchPost.ex = 1;
        } else {
            this.searchPost.ex = 0;
        }
    }

    showImage(image) {
        this.photoViewer.show(image);
    }

    resetPost() {
        this.colorArray.forEach(c => {
            c.active = false;
        });

        // shape array finding
        this.shapeArray.forEach(c => {
            c.active = false;
        });

        // fancyColor array finding
        this.clarityArray.forEach(c => {
            c.active = false;
        });

        // lab array finding
        this.certificateArray.forEach(c => {
            c.active = false;
        });

        this.socialMedia.forEach(c => {
            c.active = false;
        })

        // florocence array finding
        this.flurArray.forEach(c => {
            c.active = false;
        });

        this.a_advance = [];

        // this.searchPost = {
        this.searchPost.a_from_carat = "";
        this.searchPost.a_to_carat = "";
        this.searchPost.a_color = '';
        this.searchPost.a_shape = '';
        this.searchPost.a_clarity = '';
        this.searchPost.page = 1;
        this.searchPost.userid = '';
        this.searchPost.a_fancy_color = "";
        this.searchPost.a_cert_no = '';
        this.searchPost.ex = 0;
        this.searchPost.a_lab_type = '';
        this.searchPost.a_from_price = '';
        this.searchPost.a_to_price = '';

        this.searchPost.a_type = 4;
        this.searchPost.a_advance = [];
        this.searchPost.a_cust_name = "";
        this.searchPost.a_mobile_no = "";
        this.searchPost.p_how_cert = "";
        this.searchPost.a_comment = "";

        this.searchPost.a_smedia = "";


        this.searchPost.a_date = "";
        this.searchPost.a_time = "";
        this.searchPost.staff_name = "";
        this.searchPost.a_size_code = "";
        this.searchPost.a_status = "";

        this.isFancyColor = false;
        this.imageURI = "";
    }
}

