// Main library module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';

// Import and (re)export modules
export * from './components/grid';
export { GridModule } from './components/grid'; // Required IVY hinting
import { GridModule } from './components/grid';

export * from './components/modal';
export { ModalModule }  from './components/modal'; // Required IVY hinting
import { ModalModule } from './components/modal';

export * from './directives/a11n';
export { A11nModule } from './directives/a11n'; // Required IVY hinting
import { A11nModule } from './directives/a11n';

const modules = [
  GridModule, ModalModule, A11nModule
];

// Import and (re)export services
export * from './services';
export { EnTTManagerService } from './services'; // Required IVY hinting
import { EnTTManagerService } from './services';
export { EnTTValidationMessagesService } from './services'; // Required IVY hinting
import { EnTTValidationMessagesService } from './services';

// Import and (re)export pipes
export * from './pipes';
export { EnTTValidationMessagePipe, EnTTValidationMessagesPipe } from './pipes'; // Required IVY hinting
import { EnTTValidationMessagePipe, EnTTValidationMessagesPipe } from './pipes';
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
    { provide: EnTTManagerService },
    { provide: EnTTValidationMessagesService }
  ],
  exports: [
    ...modules,
    ...declarations
  ]
})
export class NgzMaterialModule { }
