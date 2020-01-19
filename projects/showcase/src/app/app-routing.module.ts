// Application routing module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import route components
import { NgxIntellegensGridShowcaseComponent } from '../showcases/ngx-intellegens-grid-showcase';

// Set routes
const routes: Routes = [
  // Functional directives and components
  { path: 'ngx-intellegens-grid', component: NgxIntellegensGridShowcaseComponent },
  // Default
  { path: '**', redirectTo: '/ngx-intellegens-grid' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
