import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { authGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'user-details',component:UserDetailsComponent, canActivate: [authGuard]},
  { path: 'home', component: HomeComponent, canActivate: [authGuard] }, 
  {path:'task-list',component:TaskListComponent, canActivate: [authGuard]},
  {path:'task-form',component:TaskFormComponent, canActivate: [authGuard]},
  {path:'',redirectTo:'/login',pathMatch:'full'}, 
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
