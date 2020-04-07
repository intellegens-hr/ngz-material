// <ngz-modal /> component module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

// Import and (re)export components
import { NgzModalComponent } from './ngz-modal';
export { NgzModalComponent };
const components = [
  NgzModalComponent
];

/**
 * <ngz-modal /> component module
 */
@NgModule({
  declarations:     [ ...components ],
  imports:          [ CommonModule, MatDialogModule ],
  exports:          [ ...components ]
})
export class NgzModalModule { }
