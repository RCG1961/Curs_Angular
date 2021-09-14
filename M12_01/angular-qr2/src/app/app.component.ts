// app.component.ts
import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})


export class AppComponent implements OnInit {

  public qrCodeVal: any = null;
  public level: "L" | "M" | "Q" | "H";
  public width: number;
  public background:string;
  public foreground:string;
  title = 'angular-qrscanner';

  
   @ViewChild(QrScannerComponent, { static : false }) qrScannerComponent: QrScannerComponent ;
  

  ngOnInit() {
  
  }

     constructor() {
      this.level = "L";
      this.qrCodeVal = "QR code string value";
      this.width = 200;
      this.background="white";
      this.foreground="blue";
    }
  
    
    updateLevel(newValue: "L" | "M" | "Q" | "H") {
      this.level = newValue;
    }
  
    updateQrInfo(newValue: string) {
      this.qrCodeVal = newValue;
    }
  
    updateWidth(newValue: number) {
      this.width = newValue;
    }
  
    updateBackground(newValue: "white" | "yellow" | "lime" | "aqua") {
      this.background = newValue;
    }
  
    updateForeground(newValue: "blue" | "black" | "purple" | "fuchsia") {
      this.foreground = newValue;
    } 
    
    ngAfterViewInit(): void {
  
      this.qrScannerComponent.getMediaDevices().then(devices => {
        console.log(devices);
        const videoDevices: MediaDeviceInfo[] = [];
        for (const device of devices) {
            if (device.kind.toString() === 'videoinput') {
                videoDevices.push(device);
            }
        }
        if (videoDevices.length > 0){
            let choosenDev;
            for (const dev of videoDevices){
                if (dev.label.includes('front')){
                    choosenDev = dev;
                    break;
                }
            }
            if (choosenDev) {
                this.qrScannerComponent.chooseCamera.next(choosenDev);
            } else {
                this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
            }
        }
    });
    
    this.qrScannerComponent.capturedQr.subscribe(result => {
        console.log(result);
    });
    }

}