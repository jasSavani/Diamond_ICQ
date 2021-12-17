import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

/**
 * Generated class for the TrackDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-track-detail',
  templateUrl: 'track-detail.html',
})
export class TrackDetailPage {

  public getUserTrackData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private globalServiceProvider: GlobalServiceProvider,
  ) {
    this.trackRecord();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackDetailPage');
  }

  trackRecord() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    let eventData: any = {

    }

    this.globalServiceProvider.apicall("getUserTrack", eventData)
      .then((success: any) => {
        console.log('userTrack', success);

        this.getUserTrackData = success;
        loading.dismiss();
      })
      .catch((error) => {
        console.error('API Error : ', error);
        loading.dismiss();
      });
  }

}
