import { Component } from '@angular/core';
import { NavController, LoadingController, IonicPage } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    public username;
    public password;
    passwordType: string = 'password';
    passwordshown: Boolean = false;


    constructor(
        public navCtrl: NavController,
        private globalServiceProvider: GlobalServiceProvider, 
        public loadingCtrl: LoadingController, 
        private toast: Toast
    ) {
        var pcode = localStorage.getItem('icq-p_code');
        console.log("Pcode : " + pcode);
        if (pcode == null) {

        }
        else {
            this.navCtrl.setRoot('SearchPage');
            // this.navCtrl.setRoot('SelectpagePage');
        }

    }


    // gotoSearchPage(){
    //   this.navCtrl.push('SearchPage');
    // }
    doLogin() {
        if (this.username && this.password) {
            let loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });

            loading.present();


            let eventData = {

                username: this.username,
                password: this.password
            }

            this.globalServiceProvider.apicall("Login", eventData)
                .then((success: any) => {

                    console.log(success);
                    if (success.isSuccess == 1) {

                        localStorage.setItem('icq-userid', success.userid);
                        localStorage.setItem('icq-username', success.username);

                        this.navCtrl.setRoot('SelectpagePage');
                    }
                    else {
                        this.toast.show(success.message, '5000', 'center').subscribe(toast => { });
                    }
                    loading.dismiss();

                })
                .catch((error) => {
                    console.error('API Error : ', error);
                    this.toast.show(error, '5000', 'center').subscribe(toast => { });
                    loading.dismiss();
                });
        }
        else {
            this.toast.show('Please Enter username and password!', '5000', 'center').subscribe(toast => { });
        }
    }
    hideShowPassword() {
        if (this.passwordshown) {
            this.passwordshown = false;
            this.passwordType = 'password';
        } else {
            this.passwordshown = true;
            this.passwordType = 'text';
        }
    }

}
