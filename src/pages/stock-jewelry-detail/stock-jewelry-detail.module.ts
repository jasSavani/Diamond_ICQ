import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';
import { StockJewelryDetailPage } from './stock-jewelry-detail';

@NgModule({
  declarations: [
    StockJewelryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StockJewelryDetailPage),
    PipesModule
  ],
})
export class StockJewelryDetailPageModule {}
