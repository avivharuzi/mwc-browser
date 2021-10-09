import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MwcBrowserDemoUiHeaderModule } from '@mwc-browser/mwc-browser-demo/ui-header';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MwcBrowserDemoUiHeaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
