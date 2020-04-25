// Main library module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';

// Import and (re)export modules
import { GridModule } from './components/grid';
export * from './components/grid';

import { ModalModule } from './components/modal';
export * from './components/modal';

const imports = [
  GridModule, ModalModule
];

/**
 * Intellegens' NGX Material module
 */
@NgModule({
  imports,
  exports: [ ...imports ]
})
export class NgzMaterialModule { }
