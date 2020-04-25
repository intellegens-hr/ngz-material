// <ngz-modal /> component module
// ----------------------------------------------------------------------------

// Import modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
const imports = [
  CommonModule, MatDialogModule
];

// Import and (re)export components
import { ModalComponent } from './Modal';
export { ModalComponent };
const declarations = [
  ModalComponent
];

/**
 * <ngz-modal /> component module
 */
@NgModule({
  imports,
  declarations,
  exports: [ ...imports, ...declarations ]
})
export class ModalModule { }