import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
const routes: Routes = [
  {path : '', pathMatch: 'full', redirectTo: 'view' },
  {path : 'employee-detail/:id', component : EmployeeDetailComponent},
  {path : 'employee-detail', component : EmployeeDetailComponent},
  {path : 'view', component : EmployeeListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
