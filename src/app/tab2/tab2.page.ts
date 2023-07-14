import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}
  btnCount=0;
  btnClicked(){

    this.btnCount++;

    console.log('NDZL tab2.page.html / button value='+this.btnCount);
  }

}
