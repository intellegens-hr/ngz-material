// Main application module
// ----------------------------------------------------------------------------

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import showcase material components
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material';

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
    // Showcase material modules
    MatSidenavModule,
    MatButtonModule,
    MatSortModule,
    // Intellegens modules
    NgxMaterialCustomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
