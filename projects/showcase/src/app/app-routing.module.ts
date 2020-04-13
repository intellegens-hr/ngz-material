// Application routing module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import route components
import { NgzGridShowcaseComponent } from './showcases/ngz-grid-showcase';
import { NgzModalShowcaseComponent } from './showcases/ngz-modal-showcase';

// Set routes
const routes: Routes = [
  // Functional directives and components
  { path: 'ngz-grid',   component: NgzGridShowcaseComponent },
  { path: 'ngz-modal',  component: NgzModalShowcaseComponent },
  // Default
  { path: '**', redirectTo: '/ngz-grid' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
