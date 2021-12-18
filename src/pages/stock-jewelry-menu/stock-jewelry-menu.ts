import { Component, ElementRef, Renderer, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StockJewelryMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-stock-jewelry-menu',
    templateUrl: 'stock-jewelry-menu.html',
})
export class StockJewelryMenuPage {
    @ViewChild('main') main: ElementRef;
    @ViewChild('sub1') sub1: ElementRef;
    @ViewChild('sub2') sub2: ElementRef;


    @ViewChild('imgBtn1') imgBtn1: ElementRef;
    @ViewChild('imgBtn2') imgBtn2: ElementRef;
    @ViewChild('imgBtn3') imgBtn3: ElementRef;
    @ViewChild('imgBtn4') imgBtn4: ElementRef;
    @ViewChild('imgBtn5') imgBtn5: ElementRef;
    

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public renderer: Renderer
    ) {

        setTimeout(() => {
            let mainHeight = this.main.nativeElement.offsetHeight;
            let sub1Height = this.sub1.nativeElement.offsetHeight;
            let sub2Height = this.sub2.nativeElement.offsetHeight;

            console.log(mainHeight + sub1Height)
            sub2Height = mainHeight - sub1Height + 'px';

            this.sub2.nativeElement.style.height = sub2Height;

            console.log('sub2Height > ', sub2Height);
        }, 1000);
    }

    ionViewDidEnter() {
        // setTimeout(() => {
            this.renderer.setElementStyle(this.imgBtn1.nativeElement, 'opacity', '1');
            this.renderer.setElementStyle(this.imgBtn2.nativeElement, 'opacity', '1');
            this.renderer.setElementStyle(this.imgBtn3.nativeElement, 'opacity', '1');
            this.renderer.setElementStyle(this.imgBtn4.nativeElement, 'opacity', '1');
            this.renderer.setElementStyle(this.imgBtn5.nativeElement, 'opacity', '1');
            
        // }, 2000);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StockJewelryMenuPage');
    }

    openListPage(params) {
        console.log('params', params);
        if (params === 1) {
            this.renderer.setElementStyle(this.imgBtn1.nativeElement, 'opacity', '0.5');
        } else if (params === 2) {
            this.renderer.setElementStyle(this.imgBtn2.nativeElement, 'opacity', '0.5');
        } else if (params === 4) {
            this.renderer.setElementStyle(this.imgBtn3.nativeElement, 'opacity', '0.5');
        } else if (params === 0) {
            this.renderer.setElementStyle(this.imgBtn4.nativeElement, 'opacity', '0.5');
        } else  if (params === ''){
            this.renderer.setElementStyle(this.imgBtn5.nativeElement, 'opacity', '0.5');
        }


        setTimeout(() => {
            this.navCtrl.push('StockJewelryListPage', {
                option: params
            });
        }, 300);

    }

}
