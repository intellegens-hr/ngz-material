// Main application module
// ----------------------------------------------------------------------------

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import showcase material components
import { MatSidenavModule } from '@angular/material/sidenav';

// Import showcases
import { NgxIntellegensGridShowcaseModule } from '../showcases/ngx-intellegens-grid-showcase.module';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // Showcase modules
    NgxIntellegensGridShowcaseModule,
    // Showcase material modules
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
