import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RingsearchPage } from './ringsearch';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    RingsearchPage,
  ],
  imports: [
    IonicPageModule.forChild(RingsearchPage),
    PipesModule
  ],
})
export class RingsearchPageModule {}
