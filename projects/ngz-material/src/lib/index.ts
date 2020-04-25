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

// Import and (re)export services
import { EnTTValidationMessagesService } from './services';
export * from './services';

// Import and (re)export pipes
import { EnTTValidationMessagesPipe } from './pipes';
export * from './pipes';
const pipes = [
  EnTTValidationMessagesPipe
];

const declarations = [
  ...pipes
];

/**
 * Intellegens' NGX Material module
 */
@NgModule({
  imports,
  declarations,
  providers: [
    { provide: EnTTValidationMessagesService }
  ],
  exports: [
    ...imports,
    ...declarations
  ]
})
export class NgzMaterialModule { }
