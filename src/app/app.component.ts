import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { E1Component } from './e1/e1.component';
import { E2Component } from './e2/e2.component';
import { E4Component } from './e4/e4.component';
import { E5Component } from './e5/e5.component';
import { E3Component } from './e3/e3.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { AdminLoginComponent } from './adminlogin/adminlogin.component';
import { AdminregiserComponent } from './adminregiser/adminregiser.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavComponent,FooterComponent,E1Component,E2Component,E3Component,E4Component,E5Component,ReactiveFormsModule, HttpClientModule,AdminLoginComponent,AdminregiserComponent,CategoryManagementComponent,AddCategoryComponent,UpdateCategoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'first-angular';
}
