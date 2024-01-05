import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NavigateComponent } from './components/navigate/navigate.component';
import { ProjectListingComponent } from './components/project-listing/project-listing.component';


const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: 'login', component: LoginComponent },
  {
    path: 'navigate',
    component: NavigateComponent,
   // canActivate: [AuthGuard], // Protect the 'navigate' route with an AuthGuard
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'project-listing', component: ProjectListingComponent },
      { path: 'add-customer', component: AddCustomerComponent }
    ]
  },
  { path: '**', redirectTo: '/login' } // Redirect to login for any unmatched route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
