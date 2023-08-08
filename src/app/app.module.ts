import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgHttpLoaderModule } from 'ng-http-loader';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './router/app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    LayoutModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
