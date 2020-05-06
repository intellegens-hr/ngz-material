// A11n directives component module
// ----------------------------------------------------------------------------

// Import modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
const modules = [
  CommonModule,
];

// Import and (re)export directives
import { FocusDirective } from './Focus';
export { FocusDirective };
const declarations = [
  FocusDirective
];

/**
 * A11n directives module
 */
@NgModule({
  imports:      [ ...modules ],
  declarations: [ ...declarations ],
  exports:      [ ...modules, ...declarations ],
})
export class A11nModule { }
