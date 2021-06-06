import { CreateUserComponent } from './users/create-user/create-user.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: ListUsersComponent },
  { path: 'user/detail/:id', component: UserDetailComponent },
  { path: 'create', component: CreateUserComponent },
  { path: '**', redirectTo: 'users' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
