import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { DatePipe } from '@angular/common';
import { TaskService } from './task.service';
import { IncompleteTasksComponent } from './incomplete-tasks/incomplete-tasks.component';
import { CompleteTasksComponent } from './complete-tasks/complete-tasks.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    IncompleteTasksComponent,
    CompleteTasksComponent,
    AllTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [DatePipe, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
