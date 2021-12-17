import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerInquiryPage } from './customer-inquiry';

@NgModule({
  declarations: [
    CustomerInquiryPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerInquiryPage),
  ],
})
export class CustomerInquiryPageModule {}
