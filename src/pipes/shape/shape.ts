import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ShapePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'shape',
})
export class ShapePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  public shapeArray = [
    { name: 'RND', value: 'R', fullName: "Round" },
    { name: 'PRN', value: 'PR', fullName: "Princess" },
    { name: 'PER', value: 'PE', fullName: "Pear" },
    { name: 'MRQ', value: 'M', fullName: "Marquise"  },
    { name: 'CUS', value: 'CU',  fullName: "Cushion" },
    { name: 'OVL', value: 'O',  fullName: "Oval" },
    { name: 'HRT', value: 'H',  fullName: "Heart" },
    { name: 'EMR', value: 'EM', fullName: "Emerald"  },
    { name: 'RAD', value: 'RA',  fullName: "Radiant" },
    { name: 'ASC', value: 'SA',  fullName: "Asscher"},
    { name: 'SHLD', value: 'SD', fullName: "Shield" },
    { name: 'TRL', value: 'TRI', fullName: "Trillion" },
    { name: 'Other', value: 'OT', fullName: "Other" },
    
    
  ];  

  transform(value: string, ...args) {
    
    //console.log("v:",value);
    var test="";
    // this.shapeArray.forEach(c => {

    //   if (c.value == value) {
    //     console.log("v:", c.name);
    //    test= c.name;
       
    //   }
    // });
    
    for (let c of this.shapeArray) {
      if (c.value == value) {
        // console.log("v:", c.name);
       return c.name;
       
      }
    }

    // return test;
  }
}
