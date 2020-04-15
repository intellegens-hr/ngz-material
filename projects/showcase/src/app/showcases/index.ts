// <ngz-grid-showcase /> component module
// ----------------------------------------------------------------------------

// Import modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgzMaterialModule } from '../../../../ngz-material/src/lib';
const imports = [
  CommonModule, NgzMaterialModule, MatButtonModule
];

// Import components
// tslint:disable-next-line: max-line-length
import { NgzGridShowcaseComponent, components as NgzGridShowcaseChildComponents } from './ngz-grid-showcase';
import { NgzModalShowcaseComponent, components as NgzModalShowcaseChildComponents } from './ngz-modal-showcase';
const declarations = [
  NgzGridShowcaseComponent,
  ...NgzGridShowcaseChildComponents,
  NgzModalShowcaseComponent,
  ...NgzModalShowcaseChildComponents
];

@NgModule({
  imports,
  declarations,
  exports: [ ...imports, ...declarations ]
})
export class NgzGridShowcaseModule { }
