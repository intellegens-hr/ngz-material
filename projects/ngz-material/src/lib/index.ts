// Main library module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';

// Import and (re)export modules
import { GridModule } from './components/grid';
export * from './components/grid';

import { ModalModule } from './components/modal';
export * from './components/modal';

import { A11nModule } from './directives/a11n';
export * from './directives/a11n';

const modules = [
  GridModule, ModalModule, A11nModule
];

// Import and (re)export services
import { EnTTValidationMessagesService } from './services';
export * from './services';

// Import and (re)export pipes
import { EnTTValidationMessagePipe, EnTTValidationMessagesPipe } from './pipes';
export * from './pipes';
const pipes = [
  EnTTValidationMessagePipe,
  EnTTValidationMessagesPipe
];

const declarations = [
  ...pipes
];

/**
 * Intellegens' NGX Material module
 */
@NgModule({
  imports:      [
    ...modules
  ],
  declarations: [
    ...declarations
  ],
  providers: [
    { provide: EnTTValidationMessagesService }
  ],
  exports: [
    ...modules,
    ...declarations
  ]
})
export class NgzMaterialModule { }
