import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JcategorylistPage } from './jcategorylist';

@NgModule({
  declarations: [
    JcategorylistPage,
  ],
  imports: [
    IonicPageModule.forChild(JcategorylistPage),
  ],
})
export class JcategorylistPageModule {}
