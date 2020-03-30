// Main library module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';

// Import and (re)export child modules
import { NgzGridModule } from './components/ngz-grid.module';
export * from './components/ngz-grid.module';

/**
 * Intellegens' NGX Material module
 */
@NgModule({
  declarations: [],
  imports:      [
    NgzGridModule
  ],
  exports:      [
    NgzGridModule
  ]
})
export class NgxMaterialCustomModule { }
