// <ngx-intellegens-grid /> component module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

// Import directive
import { NgxIntellegensGridColumnDefDirective } from '../components/ngx-intellegens-grid/directives/ngxIntellegensGridColumnDef';

// Import components
import { NgxIntellegensGridComponent } from './ngx-intellegens-grid';
const components = [
  NgxIntellegensGridComponent,
  NgxIntellegensGridColumnDefDirective
];
const entryComponents = [
  NgxIntellegensGridComponent
];

@NgModule({
  declarations:     [ ...components ],
  imports:          [ CommonModule, MatTableModule ],
  exports:          [ ...components ],
  entryComponents:  [ ...entryComponents ]
})
export class NgxIntellegensGridModule { }
