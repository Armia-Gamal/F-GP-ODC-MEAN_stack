import { RouterLink, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { E4Component } from './e4/e4.component';
import { E5Component } from './e5/e5.component';
import { E1Component } from './e1/e1.component';
import { E2Component } from './e2/e2.component';
import { E3Component } from './e3/e3.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './adminlogin/adminlogin.component';
import { PasswordGuard } from './password.guard'; 
import { AdminregiserComponent } from './adminregiser/adminregiser.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';


export const routes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/register', pathMatch: 'full' },
    {path:'Home',component: E1Component },
    {path:'About',component: E2Component },
    { path: 'admin-login', component: AdminLoginComponent },
    {path:'menu',component: E3Component },
    {path : "admin-register", component: AdminregiserComponent ,canActivate: [PasswordGuard]},
    {path:'Book A Table',component: E4Component },
    { path: 'update-category/:id', component: UpdateCategoryComponent },
    {path:'add-category',component: AddCategoryComponent },
    {path:'Contact',component: E5Component },
    {path:'category-management',component: CategoryManagementComponent },
    {path: '**', redirectTo: 'Home' }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    
  })
  export class AppRoutingModule { }
