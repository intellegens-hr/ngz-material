// Main library module
// ----------------------------------------------------------------------------

// Import and (re)export modules
import { NgModule } from '@angular/core';
import { NgzGridModule } from './components/ngz-grid.module';
export * from './components/ngz-grid.module';
import { NgzModalModule } from './components/ngz-modal.module';
export * from './components/ngz-modal.module';
const imports = [
  NgzGridModule, NgzModalModule
];

/**
 * Intellegens' NGX Material module
 */
@NgModule({
  imports,
  exports: [ ...imports ]
})
export class NgzMaterialModule { }
