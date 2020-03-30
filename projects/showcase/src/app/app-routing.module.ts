// Application routing module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import route components
import { NgzGridShowcaseComponent } from '../showcases/ngz-grid-showcase';

// Set routes
const routes: Routes = [
  // Functional directives and components
  { path: 'ngz-grid', component: NgzGridShowcaseComponent },
  // Default
  { path: '**', redirectTo: '/ngz-grid' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
