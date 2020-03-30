// <ngz-grid-showcase /> component module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import showcase material components
import { MatButtonModule } from '@angular/material/button';

// Import library
import { NgxMaterialCustomModule } from '../../../ngz-material/src/lib';

// Import components
// tslint:disable-next-line: max-line-length
import { NgzGridShowcaseComponent, components as NgzGridShowcaseChildComponents } from './ngz-grid-showcase';
const components = [
  NgzGridShowcaseComponent,
  ...NgzGridShowcaseChildComponents
];
const entryComponents = [];

@NgModule({
  declarations:     [ ...components ],
  imports:          [ CommonModule, NgxMaterialCustomModule, MatButtonModule ],
  exports:          [ ...components ],
  entryComponents:  [ ...entryComponents ]
})
export class NgzGridShowcaseModule { }
