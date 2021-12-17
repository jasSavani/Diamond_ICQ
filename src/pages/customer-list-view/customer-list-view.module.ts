import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerListViewPage } from './customer-list-view';

@NgModule({
  declarations: [
    CustomerListViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerListViewPage),
  ],
})
export class CustomerListViewPageModule {}
