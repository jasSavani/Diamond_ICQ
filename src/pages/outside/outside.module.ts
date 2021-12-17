import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutsidePage } from './outside';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    OutsidePage,
  
  ],
  imports: [
    IonicPageModule.forChild(OutsidePage),
    PipesModule
  ],
})
export class OutsidePageModule {}
