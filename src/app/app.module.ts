import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskStatusFilterPipe } from './task-list/task-status-filter.pipe';
import { HighlightTaskDirective } from './task-list/highlight-task.directive';

// Angular Forms
import { FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator'; // Optional if you use pagination
import { MatIconModule } from '@angular/material/icon'; // Optional for icons
import { MatGridListModule } from '@angular/material/grid-list'; 

// Import NavigationService
import { NavigationService } from './services/navigation.service'; // Adjust the path if necessary

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserDetailsComponent,
    HomeComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskStatusFilterPipe,
    HighlightTaskDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatIconModule,
    MatGridListModule
  ],
  providers: [NavigationService,
    provideAnimations()
  ], // Add NavigationService here if desired
  bootstrap: [AppComponent]
})
export class AppModule { }