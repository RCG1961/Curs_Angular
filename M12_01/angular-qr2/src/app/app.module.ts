// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'
import { QRCodeModule } from 'angular2-qrcode';
import { NgQrScannerModule } from 'angular2-qrscanner';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QRCodeModule,
    NgQrScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }