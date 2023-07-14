import { Component } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { EchoPlugin } from 'echo';
import {  NgZone } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page {
  private _storage: Storage | null = null;
  constructor(private storage: Storage, private zone: NgZone) {
    this.initStorage();

    EchoPlugin.addListener('dwBarcodeReading', (info: any) => {
      console.log('tab1.page.ts intent '+info.value+' received from dwBarcodeReading');

      this.printDWreading(info.value);
    });

  }

  public txtIn="123";  //this is the input text in the html page
  
  ionViewDidEnter(){
    console.log("ionViewDidEnter");
    this.initButton();
}



  async initStorage() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    let res = await this._storage?.set(key, value);
    console.log('set result ='+res);
  }

  public async get(key: string){
    let value:number = await Promise.resolve( this._storage?.get(key) );
    if (value==null)
      value=0;
    console.log('get result ='+value);
    return value;
  }





  myCounter=-1;
  btnCount=0;
  btnClicked(){

    this.btnCount++;

    this.set('count', this.btnCount );

    //alert('Count='+this.btnCount+' Hey you pressed the button! in tab1.page.html');
    console.log('NDZL tab1.page.html / button value='+this.btnCount);

    
    let echo_plugin_res = EchoPlugin.echo({value: 'NeS+D'})
    console.log('NDZL tab1.page.html / echoed by my plugin='+echo_plugin_res);

    this.mirrorInput();

    //exercising INTENTS


  }


  async initButton(){
        let _v = await Promise.resolve( this.get('count') );

        this.btnCount = _v;
  }

  async getCounter(){
    
    this.myCounter = await Promise.resolve( this.get('count') );

  }

  async mirrorInput(){
    
    let mirroredStr =   EchoPlugin.mirror({value: this.txtIn})
    console.log('NDZL tab1.page.html / mirrored by my plugin='+mirroredStr);
    this.txtIn = (await mirroredStr).value;

  }
  async printDWreading(s: string){
    this.zone.run(() => {
      this.txtIn = s;
    });
  }
}
