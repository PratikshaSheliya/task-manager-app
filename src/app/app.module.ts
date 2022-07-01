import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Users/signup/signup.component';
import { LoginComponent } from './Users/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './Tasks/task/task.component';
import { TemplateComponent } from './template/template.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { MatCardModule } from '@angular/material/card';
import { PopuptaskComponent } from './Tasks/popuptask/popuptask.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { UserComponent } from './Users/user/user.component';
import { ProfileComponent } from './Users/profile/profile.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ShowTaskComponent } from './Tasks/show-task/show-task.component';
import { ForgotPwdComponent } from './Users/forgot-pwd/forgot-pwd.component';
import { LinkPwdComponent } from './Users/link-pwd/link-pwd.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TaskComponent,
    TemplateComponent,
    PopuptaskComponent,
    UserComponent,
    ProfileComponent,
    ShowTaskComponent,
    ForgotPwdComponent,
    LinkPwdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
