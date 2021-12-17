import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { ShapePipe } from '../../pipes/shape/shape';




/**
 * Generated class for the RingsearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-ringsearch',
    templateUrl: 'ringsearch.html',
})
export class RingsearchPage {

    public activeClass: any = false;
    public hideme: boolean = true;
    public wtype = true;
    public ftype = false;
    public utype = false;
    public ntype = false;
    public disMin = '0';
    public disMax = '0';
    public usdMin = '0';
    public usdMax = '0';

    public exnon = false;
    public ex = false;
    public vg = false;
    public nobgm: boolean = false;
    public caratlist: any = '';
    // public shapeArray = [
    //     { name: 'Round', value: 'R', active: false, image: 'assets/imgs/shape/roundb.png' },
    //     { name: 'Princess', value: 'PR', active: false, image: 'assets/imgs/shape/princessb.png' },
    //     { name: 'Pear', value: 'PE', active: false, image: 'assets/imgs/shape/pearb.png' },
    //     { name: 'Marquise', value: 'M', active: false, image: 'assets/imgs/shape/marquiseb.png' },
    //     { name: 'Cushion', value: 'CU', active: false, image: 'assets/imgs/shape/cushionb.png' },
    //     { name: 'Oval', value: 'O', active: false, image: 'assets/imgs/shape/ovalb.png' },
    //     { name: 'Heart', value: 'H', active: false, image: 'assets/imgs/shape/heartb.png' },
    //     { name: 'Emerald', value: 'EM', active: false, image: 'assets/imgs/shape/emeraldb.png' },
    //     { name: 'Radiant', value: 'RA', active: false, image: 'assets/imgs/shape/radiantb.png' },
    //     { name: 'ASCHR', value: 'SA', active: false, image: 'assets/imgs/shape/asscher.png' },
    //     { name: 'SHIELD', value: 'SD', active: false, image: 'assets/imgs/shape/shield.png' },
    //     { name: 'TRILL', value: 'TRI', active: false, image: 'assets/imgs/shape/triangular.png' },
    //     // { name: 'Other', value: 'OT', active: false, image: 'assets/imgs/shape/diamb.png' },
    // ];

    public shapeArray = [
        { name: 'Round', value: 'R', active: false, image: 'assets/imgs/shape/roundb.png' },
        { name: 'Princ', value: 'PR', active: false, image: 'assets/imgs/shape/princessb.png' },
        { name: 'Pear', value: 'PE', active: false, image: 'assets/imgs/shape/pearb.png' },
        { name: 'Marqi', value: 'M', active: false, image: 'assets/imgs/shape/marquiseb.png' },
        { name: 'Cushi', value: 'CU', active: false, image: 'assets/imgs/shape/cushionb.png' },
        { name: 'Oval', value: 'O', active: false, image: 'assets/imgs/shape/ovalb.png' },
        { name: 'Heart', value: 'H', active: false, image: 'assets/imgs/shape/heartb.png' },
        { name: 'Emrld', value: 'EM', active: false, image: 'assets/imgs/shape/emeraldb.png' },
        { name: 'Radiant', value: 'RD', active: false, image: 'assets/imgs/shape/radiantb.png' },
        // { name: 'Emrld', value: 'Emrld', active: false, image: 'assets/imgs/shape/radiantb.png' },
        // { name: 'ASCHR', value: 'ASCHR', active: false, image: 'assets/imgs/shape/asscher.png' },
        // { name: 'SHIELD', value: 'SHIELD', active: false, image: 'assets/imgs/shape/shield.png' },
        // { name: 'TRILL', value: 'TRILL', active: false, image: 'assets/imgs/shape/triangular.png' },
        { name: 'Other', value: 'OT', active: false, image: 'assets/imgs/shape/diamb.png' },
    ];

    public fancyArray = [
        { name: 'Yellow', value: 'Yellow', active: false },
        { name: 'Pink', value: 'Pink', active: false },
        { name: 'Blue', value: 'Blue', active: false },
        { name: 'Red', value: 'Red', active: false },
        { name: 'Green', value: 'Green', active: false },
        { name: 'Purple', value: 'Purple', active: false },
        { name: 'Gray', value: 'Gray', active: false },
        { name: 'Violet', value: 'Violet', active: false },
        { name: 'Brown', value: 'Brown', active: false },
        { name: 'Black', value: 'Black', active: false },
        { name: 'Champagne', value: 'Champagne', active: false },
        { name: 'Cognac', value: 'Cognac', active: false },
        { name: 'Chameleon', value: 'Chameleon', active: false },
        { name: 'Other', value: 'Other', active: false },
        { name: 'Pink Purple', value: 'Pink Purple', active: false },
        { name: 'Very Light Brown', value: 'Very Light Brown', active: false },
        { name: 'Very Light Pink Brown', value: 'Very Light Pink Brown', active: false },
        { name: 'Yellow-Green', value: 'Yellow-Green', active: false },
        { name: 'Orange-Yellow', value: 'Orange-Yellow', active: false },
    ];

    public colorArray = [
        { name: 'D', value: '1', active: false },
        { name: 'E', value: '2', active: false },
        { name: 'F', value: '3', active: false },
        { name: 'G', value: '4', active: false },
        { name: 'H', value: '5', active: false },
        { name: 'I', value: '6', active: false },
        { name: 'J', value: '7', active: false },
        { name: 'K', value: '8', active: false },
        { name: 'L', value: '9', active: false },
        { name: 'M', value: '10', active: false },
        { name: 'N', value: '15', active: false },
        { name: 'O', value: '16', active: false },
        { name: 'P', value: '17', active: false },
        { name: 'Q', value: '18', active: false },
        { name: 'R', value: '19', active: false },
        { name: 'S', value: '20', active: false },
        { name: 'T', value: '21', active: false },
        { name: 'U', value: '22', active: false },
        { name: 'V', value: '23', active: false },
        { name: 'W', value: '24', active: false },
        { name: 'X', value: '25', active: false },
        { name: 'Y', value: '26', active: false },
        { name: 'Z', value: '27', active: false },



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

    public cutArray = [
        { name: 'EX', value: '1', active: false },
        { name: 'VG', value: '2', active: false },
        { name: 'GD', value: '3', active: false },
        { name: 'FR', value: '4', active: false },
        { name: 'PR', value: '5', active: false },
        { name: 'NONE', value: '6', active: false },
    ];

    public polishArray = [
        { name: 'EX', value: '1', active: false },
        { name: 'VG', value: '2', active: false },
        { name: 'GD', value: '3', active: false },
        { name: 'FR', value: '4', active: false },
        { name: 'PR', value: '5', active: false },
        { name: 'NONE', value: '6', active: false },
    ];

    public symArray = [
        { name: 'EX', value: '1', active: false },
        { name: 'VG', value: '2', active: false },
        { name: 'GD', value: '3', active: false },
        { name: 'FR', value: '4', active: false },
        { name: 'PR', value: '5', active: false },
        { name: 'NONE', value: '6', active: false },
    ];

    public flurArray = [
        { name: 'NONE', value: '1', active: false },
        { name: 'VERY SLIGHT', value: '5', active: false },
        { name: 'FAINT', value: '2', active: false },
        { name: 'MEDIUM', value: '3', active: false },
        { name: 'STRONG', value: '4', active: false },
        { name: 'NILL', value: '7', active: false },
    ];


    public searchPost = {
        fcarat: 0,
        tcarat: 0,
        caratlist: '',
        color: '',
        shape: '',
        clarity: '',
        page: 1,
        userid: '',
        isfancy: 0,
        fcolor: '',
        certificate: '',
        ad_no: '',
        ex: 0,
        design_no: '',
        consign_no: '',
        lab: '',

        cut: '',
        pol: '',
        sym: '',
        flo: '',
        cat_code: '',

        price_from: '',
        price_to: ''
    }


    public fcarat: number = 0;
    public tcarat: number = 0;
    public stoneid = '';
    public isData = 0;
    public isAdvance: any = false;


    // public certificateArray = [
    //     { name: 'GIA', value: '1', active: false, image: 'assets/icon/gia.png' },
    //     { name: 'IGI', value: '2', active: false, image: 'assets/icon/igi.png' },
    //     { name: 'HRD', value: '3', active: false, image: 'assets/icon/hrd.png' },
    // ];

    public certificateArray = [
        { name: 'GIA', value: '1', active: false, image: 'assets/icon/gia.png' },
        { name: 'IGI', value: '2', active: false, image: 'assets/icon/igi.png' },
        { name: 'OTHERS', value: '0', active: false, image: '' },
        { name: 'NONE', value: '4', active: false, image: '' },
    ];

    public pageOption: any;


    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public imageViewerCtrl: ImageViewerController
        , private globalServiceProvider: GlobalServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController,) {

            this.searchPost.cat_code = this.navParams.get("pageOption");
            this.pageOption =  this.navParams.get("pageOption");
    }


    colorClass(color) {
        color.active = !color.active;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad RingsearchPage');
    }

    gotoOutSide() {
        console.log('caalled this');
        this.navCtrl.push('OutsidePage');
    }

    goTosearchresult() {
        let temp = [];


        // shape array finding
        temp = [];
        this.shapeArray.forEach(c => {
            if (c.active == true) {
                temp.push("'" + c.value + "'");

                if (c.value == 'OT') {
                    temp.push("'" + 'TRI' + "'");
                    temp.push("'" + 'OT' + "'");
                    temp.push("'" + 'SD' + "'");
                    temp.push("'" + 'OC' + "'");
                    temp.push("'" + 'SA' + "'");
                    temp.push("'" + 'SE' + "'");
                    temp.push("'" + 'SR' + "'");
                }
            }

            
        });


        this.searchPost.shape = temp.toString();


        // color  array finding
        temp = [];
        this.colorArray.forEach(c => {

            if (c.active == true) {
                temp.push("'" + c.value + "'");
            }
        });
        this.searchPost.color = temp.toString();


        // clarity  array finding
        temp = [];
        this.clarityArray.forEach(c => {

            if (c.active == true) {
                temp.push("'" + c.value + "'");
            }
        });
        this.searchPost.clarity = temp.toString();


        this.searchPost.caratlist = this.caratlist.toString();

        // cut  array finding
        temp = [];
        this.cutArray.forEach(c => {
            if (c.active == true) {
                temp.push("'" + c.value + "'");
            }
        });
        this.searchPost.cut = temp.toString();

        // pol  array finding
        temp = [];
        this.polishArray.forEach(c => {
            if (c.active == true) {
                temp.push("'" + c.value + "'");
            }
        });
        this.searchPost.pol = temp.toString();

        // sym  array finding
        temp = [];
        this.symArray.forEach(c => {
            if (c.active == true) {
                temp.push("'" + c.value + "'");
            }
        });
        this.searchPost.sym = temp.toString();

        // flo  array finding
        temp = [];
        this.flurArray.forEach(c => {
            if (c.active == true) {
                temp.push("'" + c.value + "'");
            }
        });
        this.searchPost.flo = temp.toString();


        // certificate  array finding
        temp = [];
        this.certificateArray.forEach(c => {
            if (c.active == true) {
                temp.push("'" + c.value + "'");

                if (c.value == '0') {
                    temp.push("'" + '3' + "'");
                    temp.push("'" + '5' + "'");
                    temp.push("'" + '6' + "'");
                    temp.push("'" + '7' + "'");
                    temp.push("'" + '8' + "'");
                    temp.push("'" + '9' + "'");
                    temp.push("'" + '10' + "'");
                    temp.push("'" + '11' + "'");
                    temp.push("'" + '12' + "'");
                    temp.push("'" + '13' + "'");
                    temp.push("'" + '14' + "'");
                    temp.push("'" + '15' + "'");
                    temp.push("'" + '16' + "'");
                    temp.splice(0, 1);
                }
                
            }
        });

        
        this.searchPost.lab = temp.toString();

        console.log(this.searchPost);
        // this.navCtrl.push('RingsearchresultPage', { 'searchPost': this.searchPost });
        this.navCtrl.push('StockJewelryListPage', {
            option: this.searchPost.cat_code,
            searchPost: this.searchPost,
            pageOption: this.pageOption
        });
    }
    exFilter() {
        if (this.searchPost.ex == 0) {
            this.searchPost.ex = 1;
        }
        else {
            this.searchPost.ex = 0;
        }

    }

    public isExFilter: boolean = false;
    exFilterSet() {
        console.log('in exfilter');

        if (this.searchPost.ex == 0) {
            // this.isExFilter = false;
            this.searchPost.ex = 1;
            let resultArray = [];
            this.exnon = false;
            this.ex = true;
            this.vg = false;
            this.cutArray.forEach(i => {
                resultArray.push(
                    {
                        "active": i.active,
                        "value": i.value,
                    });
                if (i.value == '1')
                    i.active = true;
                else
                    i.active = false;

            });
            this.polishArray.forEach(i => {
                resultArray.push(
                    {
                        "active": i.active,
                        "value": i.value,
                    });
                if (i.value == '1')
                    i.active = true;
                else
                    i.active = false;

            });
            this.symArray.forEach(i => {
                resultArray.push(
                    {
                        "active": i.active,
                        "value": i.value,
                    });
                if (i.value == '1')
                    i.active = true;
                else
                    i.active = false;

            });
            this.flurArray.forEach(i => {
                resultArray.push(
                    {
                        "active": i.active,
                        "value": i.value,
                    });
                if (i.value == '1') {
                    i.active = false;
                }
            });
        } else {
            this.searchPost.ex = 0;
            // this.isExFilter = true;
            let resultArray = [];
            this.exnon = false;
            this.ex = false;
            this.vg = false;
            this.cutArray.forEach(i => {
                resultArray.push(
                    {
                        "active": i.active,
                        "value": i.value,
                    });
                if (i.value == '1')
                    i.active = false;
                else
                    i.active = false;

            });
            this.polishArray.forEach(i => {
                resultArray.push(
                    {
                        "active": i.active,
                        "value": i.value,
                    });
                if (i.value == '1')
                    i.active = false;
                else
                    i.active = false;

            });
            this.symArray.forEach(i => {
                resultArray.push(
                    {
                        "active": i.active,
                        "value": i.value,
                    });
                if (i.value == '1')
                    i.active = false;
                else
                    i.active = false;

            });
            this.flurArray.forEach(i => {
                resultArray.push(
                    {
                        "active": i.active,
                        "value": i.value,
                    });
                if (i.value == '1') {
                    i.active = false;
                }
            });
        }

        console.log('this.searchPost.ex', this.searchPost.ex);
        console.log('cutArray', this.cutArray);
    }

    isFancy() {
        if (this.searchPost.isfancy == 0) {
            this.searchPost.isfancy = 1;
        }
        else {
            this.searchPost.isfancy = 0;
        }

    }
    fancyFilter() {
        this.wtype = false;
        this.ftype = true;
    }
    whiteFilter() {
        this.wtype = true;
        this.ftype = false;
    }

    cpsSelect(color) {
        color.active = !color.active;


        // cut  array finding
        let temp = [];
        this.cutArray.forEach(c => {
            if (c.active == true) {
                temp.push("'" + c.value + "'");
            }
        });
        this.searchPost.cut = temp.toString();

        temp = [];
        this.polishArray.forEach(c => {
            if (c.active == true) {
                temp.push("'" + c.value + "'");
            }
        });
        this.searchPost.pol = temp.toString();

        // sym  array finding
        temp = [];
        this.symArray.forEach(c => {
            if (c.active == true) {
                temp.push("'" + c.value + "'");
            }
        });
        this.searchPost.sym = temp.toString();

        let cutArr = this.searchPost.cut.split(',');
        let polArr = this.searchPost.pol.split(',');
        let symArr = this.searchPost.sym.split(',');

        console.log('sssss', this.searchPost.cut, this.searchPost.cut.indexOf('1'));

        if (this.searchPost.cut.indexOf('1') > 0) {
            if (cutArr.length > 1) {
                this.searchPost.ex = 0;
            }
        } else {
            this.searchPost.ex = 0;
        }

        if (this.searchPost.pol.indexOf('1') > 0) {
            if (polArr.length > 1) {
                this.searchPost.ex = 0;
            }
        } else {
            this.searchPost.ex = 0;
        }

        if (this.searchPost.sym.indexOf('1') > 0) {
            if (symArr.length > 1) {
                this.searchPost.ex = 0;
            }
        } else {
            this.searchPost.ex = 0;
        }

    }


    resetPost() {

        this.isData = 0;
        this.colorArray.forEach(c => {
            c.active = false;
        });

        // shape array finding
        this.shapeArray.forEach(c => {
            c.active = false;
        });

        // cut array finding
        this.cutArray.forEach(c => {
            c.active = false;
        });

        // polish array finding
        this.polishArray.forEach(c => {
            c.active = false;
        });

        // symnetry array finding
        this.symArray.forEach(c => {
            c.active = false;
        });

        // florocence array finding
        this.flurArray.forEach(c => {
            c.active = false;
        });

        // lab array finding
        this.certificateArray.forEach(c => {
            c.active = false;
        });


        // fancyColor array finding
        this.clarityArray.forEach(c => {
            c.active = false;
        });

        this.searchPost.fcarat = 0;
        this.searchPost.tcarat = 0;
        this.searchPost.caratlist = '';
        this.caratlist = "";
        this.disMin = '0';
        this.disMax = '0';
        this.usdMin = '0';
        this.usdMax = '0';



        this.searchPost.color = "";
        this.searchPost.shape = "";
        this.searchPost.clarity = "";
        this.searchPost.page = 1;
        this.searchPost.userid = "";
        this.searchPost.isfancy = 0;
        this.searchPost.fcolor = "";
        this.searchPost.certificate = "";
        this.searchPost.ad_no = "";
        this.searchPost.ex = 0;
        this.searchPost.design_no = "";
        this.searchPost.consign_no = "";
        // this.searchPost.cat_code = "";

        this.searchPost.price_from="";
        this.searchPost.price_to="";

        this.searchResult = [];
        this.totalRecord = 0;
        this.isData = 0;
        this.totalPage = 0;
        this.totalCount = 0;
    }

    // downloadImage(downloadURL){
    //     console.log(downloadURL);
    // }

    advanceFilter(param) {
        this.isAdvance = param;
    }



    public showhidefilter() {

        this.hideme = !this.hideme;

    }
    public isResult = true;
    public totalPage = 1;
    public shareUrl = "";
    public searchResult: any;
    public totalRecord = 0;
    public totalCount: any = 0;


    search() {

        this.searchPost.page = 1;
        this.isData = 0;
        this.goTosearchresult();


        let partList: any;
        // this.navCtrl.push('RingsearchresultPage', { 'searchPost': this.searchPost });

        console.log("ringData: ", this.searchPost);

        // this.globalServiceProvider.apicall('ringData', this.searchPost).then((success: any) => {


        //     console.log("ringData : " + this.searchPost.page);
        //     this.searchResult = success;
        //     this.totalCount = this.searchResult.length;
        //     if (this.searchResult.length) {

        //         this.isData = 1;
        //         this.totalRecord = this.searchResult[0].TotalCount;
        //         this.totalPage = Math.ceil(this.totalRecord / 50);
        //         this.totalCount = this.searchResult.length;
        //     }
        //     // this.resetAll();

        //     console.log(success);
        //     loading.dismiss();
        // })
        //     .catch((error) => {
        //         this.isData = 1;
        //         console.error('API Error : ', error);

        //         let toast = this.toastCtrl.create({
        //             message: error,
        //             duration: 3000,
        //             position: 'middle'
        //         });
        //         loading.dismiss();

        //     });

    }

    
    doInfinite(infiniteScroll) {
        this.searchPost.page++;
        console.log(this.totalPage);
        console.log('Page:');
        console.log(this.searchPost.page);
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




