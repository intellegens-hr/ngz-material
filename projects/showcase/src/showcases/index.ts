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
import { NgzModalShowcaseComponent, components as NgzModalShowcaseChildComponents } from './ngz-modal-showcase';
const components = [
  NgzGridShowcaseComponent,
  ...NgzGridShowcaseChildComponents,
  NgzModalShowcaseComponent,
  ...NgzModalShowcaseChildComponents
];

@NgModule({
  declarations:     [ ...components ],
  imports:          [ CommonModule, NgxMaterialCustomModule, MatButtonModule ],
  exports:          [ ...components ]
})
export class NgzGridShowcaseModule { }
