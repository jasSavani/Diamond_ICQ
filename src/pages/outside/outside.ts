import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import {  ImageViewerController } from 'ionic-img-viewer';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { Clipboard } from '@ionic-native/clipboard';
import { Platform } from 'ionic-angular';
import { SearchPage } from '../search/search';
/**

/**
 * Generated class for the OutsidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-outside',
  templateUrl: 'outside.html',
})

export class OutsidePage {

  
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
  public caratlist:any='';
  public shapeArray = [
    { name: 'Round', value: 'R', active: false, image: 'assets/imgs/shape/roundb.png' },
    { name: 'Princess', value: 'PR', active: false, image:  'assets/imgs/shape/princessb.png' },
    { name: 'Pear', value: 'PE', active: false, image:'assets/imgs/shape/pearb.png' },
    { name: 'Marquise', value: 'M', active: false, image: 'assets/imgs/shape/marquiseb.png' },
    { name: 'Cushion', value: 'CU', active: false, image: 'assets/imgs/shape/cushionb.png' },
    { name: 'Oval', value: 'O', active: false, image:'assets/imgs/shape/ovalb.png' },
    { name: 'Heart', value: 'H', active: false, image: 'assets/imgs/shape/heartb.png' },
    { name: 'Emerald', value: 'EM', active: false, image:  'assets/imgs/shape/emeraldb.png' },
    { name: 'Radiant', value: 'RA', active: false, image: 'assets/imgs/shape/radiantb.png' },
    { name: 'Other', value: 'OT', active: false, image:'assets/imgs/shape/diamb.png' },
    
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
    { name: '2.00 - 2.99', value: '11', active: false },
    { name: '3.00 - 3.99', value: '12', active: false },
    { name: '4.00 - 4.99', value: '13', active: false },
    { name: '5.00 - 5.99', value: '14', active: false },
    { name: '6.00 - 6.99', value: '15', active: false },
    { name: '7.00 - 7.99', value: '16', active: false },
    { name: '8.00 - 8.99', value: '17', active: false },
    { name: '9.00 - 9.99', value: '18', active: false },
    { name: '10.00 - 100.00', value: '19', active: false },
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

  
  public searchPost = {

    fcarat: 0,
    tcarat: 0,
    caratlist: '',
    color: '',
    shape: '',
    clarity: '',
    page:1,    
    userid: '',
    isfancy:0,
    fcolor:'',
    certificate:'',
    ex:0

    
  }
  public fcarat: number = 0;
  public tcarat: number = 0;
  public stoneid = '';
  public isData = 0;

  constructor(public platform: Platform,public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public imageViewerCtrl: ImageViewerController
    ,private globalServiceProvider: GlobalServiceProvider,private clipboard: Clipboard,public loadingCtrl: LoadingController, private toastCtrl: ToastController
    ) {

    
    //this.searchPost.userid = localStorage.getItem('userid');
    this.search();
  }

  copyText(txtVal)
  {
    cordova.plugins.clipboard.copy(txtVal);
    //console.log(txtVal);
    //alert("Certificate No. Copied");
    //this.clipboard.copy(txtVal.toString());
    let toast = this.toastCtrl.create({
      message: "Certificate "+txtVal+" Copied!",
      duration: 3000,
      position: 'middle'
    });
    toast.present();

   
  }
  colorClass(color) {
    color.active = !color.active;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  gotoOutSide()
  {
    console.log('searth page');
    this.navCtrl.push(SearchPage);
  }
  goTosearchresult() {
    let temp = [];


    // shape array finding
    temp = [];
    this.shapeArray.forEach(c => {

      if (c.active == true) {
        temp.push("'"+c.value+"'");
      }
    });
    this.searchPost.shape = temp.toString();


    // color  array finding
    temp = [];
    this.colorArray.forEach(c => {

      if (c.active == true) {
        temp.push("'"+c.value+"'");
      }
    });
    this.searchPost.color = temp.toString();


    // clarity  array finding
    temp = [];
    this.clarityArray.forEach(c => {

      if (c.active == true) {
        temp.push("'"+c.value+"'");
      }
    });
    this.searchPost.clarity = temp.toString();

  
    this.searchPost.caratlist = this.caratlist.toString();


    console.log(this.searchPost);
    //this.navCtrl.push('SearchresultPage', { 'searchPost': this.searchPost });
  }
  exFilter()
  {
    if(this.searchPost.ex ==0)
    {
      this.searchPost.ex =  1;
    }
    else
    {
      this.searchPost.ex =  0;
    }
    
  }

  isFancy()
  {
    if(this.searchPost.isfancy ==0)
    {
      this.searchPost.isfancy =  1;
    }
    else
    {
      this.searchPost.isfancy =  0;
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
  
  

  resetPost() {

    this.isData = 0;
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

    this.searchPost.fcarat = 0;
    this.searchPost.tcarat = 0;
    this.searchPost.caratlist = '';
    this.caratlist="";

    this.disMin = '0';
    this.disMax = '0';
    this.usdMin = '0';
    this.usdMax = '0';

    
    
    this.searchPost.color="";
    this.searchPost.shape="";
    this.searchPost.clarity="";
    this.searchPost.page=1;
    this.searchPost.userid="";
    this.searchPost.isfancy=0;
    this.searchPost.fcolor="";
    this.searchPost.certificate="";
    this.searchPost.ex=0;

    this.searchResult=[];
    this.totalRecord=0;
    this.isData=0;
    this.totalPage=0;
    this.totalCount=0;
  }
  presentImage(myImage) {
    const imageViewer = this.imageViewerCtrl.create(myImage)
    imageViewer.present();

    // setTimeout(() => imageViewer.dismiss(), 1000);
    //imageViewer.onDidDismiss(() => alert('Viewer dismissed'));
  }

    public showhidefilter() {

        this.hideme = !this.hideme;
     
    }
    public isResult = true;
    public totalPage = 1;
    public shareUrl = "";
    public searchResult: any;
    public totalRecord=0;
    public totalCount:any=0;

    
    search() 
    {

      this.searchPost.page = 1;
  this.isData = 0;
      this.goTosearchresult();

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
  
      loading.present();
  
      let partList: any;

      console.log("searchPost: ",this.searchPost);

      this.globalServiceProvider.apicall('Outside', this.searchPost).then((success: any) => {
  
   
        console.log("search : "+this.searchPost.page);
          this.searchResult = success;
          this.totalCount = this.searchResult.length;
         if(this.searchResult.length)
         {

          this.isData = 1;
          this.totalRecord = this.searchResult[0].TotalCount; 
          this.totalPage = Math.ceil(this.totalRecord / 50);
          this.totalCount = this.searchResult.length;
        }
         // this.resetAll();
   
        console.log(success);
        loading.dismiss();
      })
      .catch((error) =>
      {
        this.isData = 1;
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
      this.searchPost.page++;
  console.log(this.totalPage);
  console.log('Page:');
  console.log(this.searchPost.page);
      if(this.searchPost.page <= this.totalPage )
      {
        
       
        this.globalServiceProvider.apicall('Outside', this.searchPost).then((success: any) => {
            
           
         // this.searchPost.page++;
          this.totalRecord = this.searchResult[0].TotalCount;         
          
          for (let partListData of success) {
                   this.searchResult.push(partListData);
          }
          this.totalCount = this.searchResult.length;
          infiniteScroll.complete();
          
        });
      }
      else
      {
        this.searchPost.page++;
        infiniteScroll.enable(false);
      }
     
    }


}
