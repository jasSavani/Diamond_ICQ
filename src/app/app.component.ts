import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';

// import { SelectpagePage } from '../pages/selectpage/selectpage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "";

  pages: Array<{title: string, component: any}>;
 public dash =false;
  public sstone =false;
  public cstone =false;
  public mcart =false;
  public hstone =false;
  public vr =false;
  public offer =false;
  public na =false;
  public up =false;
  public pro =false;
  public not =false;
  public aus =false;
  public lout =false;
  public cus =false;

public userid :any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.userid = localStorage.getItem('icq-userid');
    
    console.log(this.userid);

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: "HomePage" }
    ];


    if(this.userid == null || this.userid =='')
    {
     this.rootPage = "HomePage"
    }
    else
    {
      // this.rootPage = SearchPage;
      this.rootPage = 'SelectpagePage';
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#baaf84');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
 
gotosearch(){
  this.nav.push('SearchPage');
  this.dash =false;
  this.sstone =true;
  this.cstone =false;
  this.mcart =false;
  this.hstone =false;
  this.vr =false;
  this.offer =false;
  this.na =false;
  this.up =false;
  this.pro =false;
  this.not =false;
  this.aus =false;
  this.lout =false;
  this.cus =false;
 
}
  

logout()
{
  localStorage.setItem('icq-userid',"");
  localStorage.setItem('icq-username','');
  localStorage.setItem('icq-fullname',"");
  localStorage.setItem('icq-scode',"");
  localStorage.setItem('icq-userid',"");
  this.nav.setRoot("HomePage");
  this.dash =false;
  this.sstone =false;
  this.cstone =false;
  this.mcart =false;
  this.hstone =false;
  this.vr =false;
  this.offer =false;
  this.na =false;
  this.up =false;
  this.pro =false;
  this.not =false;
  this.aus =false;
  this.lout =true;
  this.cus =false;
}

}

