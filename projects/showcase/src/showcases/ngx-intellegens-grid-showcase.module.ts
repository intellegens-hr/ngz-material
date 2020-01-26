// <ngx-intellegens-grid-showcase /> component module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import showcase material components
import { MatButtonModule } from '@angular/material/button';

// Import library
import { NgxMaterialCustomModule } from '../../../ngx-material-custom/src/lib/ngx-material-custom.module';

// Import components
// tslint:disable-next-line: max-line-length
import { NgxIntellegensGridShowcaseComponent, components as NgxIntellegensGridShowcaseChildComponents } from './ngx-intellegens-grid-showcase';
const components = [
  NgxIntellegensGridShowcaseComponent,
  ...NgxIntellegensGridShowcaseChildComponents
];
const entryComponents = [];

@NgModule({
  declarations:     [ ...components ],
  imports:          [ CommonModule, NgxMaterialCustomModule, MatButtonModule ],
  exports:          [ ...components ],
  entryComponents:  [ ...entryComponents ]
})
export class NgxIntellegensGridShowcaseModule { }
