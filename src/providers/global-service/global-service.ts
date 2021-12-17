import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalServiceProvider {

  public serverUrl: string = 'https://api.zairradiamond.com/Home/';
  //public serverUrl: string = 'http://snjdiam.com/Apini/';
  constructor(public http: HttpClient) {
    console.log('Hello GlobalServiceProvider Provider');
  }
  
  apicall(fn,postData) 
  {
    return this.http.post(this.serverUrl+fn+"/", postData).toPromise();
  }

  getTrack() {
    return this.http.get('https://api.zairradiamond.com/Home/getUserTrack').toPromise();
  }

  getCategory() {
    return this.http.get('https://api.zairradiamond.com/Home/getSaleCategoryList').toPromise();
  }

  getSalesBy() {
    return this.http.get('https://api.zairradiamond.com/Home/getActiveApplicationUserList').toPromise();
  }

  getStatus() {
    return this.http.get('https://api.zairradiamond.com/Home/getCustomerAppoinmentStatus').toPromise();
  }

  getDetail(id) {
    return this.http.get('https://api.zairradiamond.com/Home/getCustomerRequestByID?request_id=' + id).toPromise();
  }

  

}
