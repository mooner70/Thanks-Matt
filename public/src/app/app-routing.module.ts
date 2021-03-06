import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    loadChildren: 'app/client/client.module#ClientModule' 
  },
  {
    path: 'admin', 
    redirectTo: 'auth' 
  },
  {
    path: 'dashboard',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
