// <ngx-intellegens-grid /> component module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

// Import components
import { NgxIntellegensGridComponent } from './ngx-intellegens-grid';
const components = [
  NgxIntellegensGridComponent
];

@NgModule({
  declarations: [ ...components ],
  imports:      [ CommonModule, MatTableModule ],
  exports:      [ ...components ]
})
export class NgxIntellegensGridModule { }
