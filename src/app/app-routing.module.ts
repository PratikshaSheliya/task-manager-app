import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoginAuthGuard } from './services/login-auth.guard';
import { ShowTaskComponent } from './Tasks/show-task/show-task.component';
import { TaskComponent } from './Tasks/task/task.component';
import { ForgotPwdComponent } from './Users/forgot-pwd/forgot-pwd.component';
import { LinkPwdComponent } from './Users/link-pwd/link-pwd.component';
import { LoginComponent } from './Users/login/login.component';
import { ProfileComponent } from './Users/profile/profile.component';
import { SignupComponent } from './Users/signup/signup.component';
import { UserComponent } from './Users/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent ,canActivate:  [LoginAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuard] },
  { path: 'task', component: TaskComponent , canActivate: [AuthGuard]},
  { path: 'user', component: UserComponent , canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'showtask/:id', component: ShowTaskComponent, canActivate: [AuthGuard] },
  { path: 'password', component: ForgotPwdComponent },
  { path: 'forgotpassword/:id', component: LinkPwdComponent },
  { path: 'forgotpassword', component: LinkPwdComponent },
  { path: '**', component: LoginComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
