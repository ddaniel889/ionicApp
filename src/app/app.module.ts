import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiciodeProductosService } from './providers/serviciode-productos.service';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule,
    ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },HttpClient,
     ServiciodeProductosService,  NativeStorage,Network,FingerprintAIO,Device],
  bootstrap: [AppComponent],
})
export class AppModule {}
