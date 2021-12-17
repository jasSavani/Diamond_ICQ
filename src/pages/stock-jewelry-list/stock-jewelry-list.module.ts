import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';
import { StockJewelryListPage } from './stock-jewelry-list';

@NgModule({
  declarations: [
    StockJewelryListPage,
  ],
  imports: [
    IonicPageModule.forChild(StockJewelryListPage),
    PipesModule
  ],
})
export class StockJewelryListPageModule {}
