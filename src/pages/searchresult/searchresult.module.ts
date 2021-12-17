import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchresultPage } from './searchresult';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SearchresultPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchresultPage),
    PipesModule
  ],
})
export class SearchresultPageModule {}
