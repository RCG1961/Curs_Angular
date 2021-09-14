// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public qrCodeVal: any = null;
  public level: "L" | "M" | "Q" | "H";
  public width: number;
  public background:string;
  public foreground:string;

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

}