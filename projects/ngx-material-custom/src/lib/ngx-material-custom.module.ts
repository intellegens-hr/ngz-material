// Main library module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';

// Import child modules
import { NgxIntellegensGridModule } from './components/ngx-intellegens-grid.module';

/**
 * Intellegens' NGX Material module
 */
@NgModule({
  declarations: [],
  imports:      [
    NgxIntellegensGridModule
  ],
  exports:      [
    NgxIntellegensGridModule
  ]
})
export class NgxMaterialCustomModule { }
