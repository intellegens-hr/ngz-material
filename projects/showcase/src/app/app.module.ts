// Main application module
// ----------------------------------------------------------------------------

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import library
import { NgxMaterialCustomModule } from '../../../ngx-material-custom/src/lib/ngx-material-custom.module';

// Import showcases
import { NgxIntellegensGridShowcaseComponent } from '../showcases/ngx-intellegens-grid-showcase';
const showcases = [
  NgxIntellegensGridShowcaseComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...showcases
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxMaterialCustomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
