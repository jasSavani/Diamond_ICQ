import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';
import { RingsearchresultPage } from './ringsearchresult';

@NgModule({
  declarations: [
    RingsearchresultPage,
  ],
  imports: [
    IonicPageModule.forChild(RingsearchresultPage),
    PipesModule
  ],
})
export class RingsearchresultPageModule {}
