// Main library module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';

// Import and (re)export child modules
import { NgzGridModule } from './components/ngz-grid.module';
export * from './components/ngz-grid.module';
import { NgzModalModule } from './components/ngz-modal.module';
export * from './components/ngz-modal.module';

/**
 * Intellegens' NGX Material module
 */
@NgModule({
  declarations: [],
  imports:      [
    NgzGridModule,
    NgzModalModule
  ],
  exports:      [
    NgzGridModule,
    NgzModalModule
  ]
})
export class NgxMaterialCustomModule { }
