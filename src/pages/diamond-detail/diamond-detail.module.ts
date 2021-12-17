import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiamondDetailPage } from './diamond-detail';

@NgModule({
  declarations: [
    DiamondDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DiamondDetailPage),
  ],
})
export class DiamondDetailPageModule {}
