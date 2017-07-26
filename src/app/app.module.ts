import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

// Modules
import { ToastrModule  } from 'ngx-toastr';

// bootstrap
import { AlertModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ng2-bootstrap/carousel';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// services
import { SeoService } from './services/seo.service';

// shared module
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 4000}),
    FormsModule,
    HttpModule,
    SharedModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, { useHash: false })
  ],
  providers: [
    Title,
    SeoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
