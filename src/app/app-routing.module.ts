import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { IncompleteTasksComponent } from './incomplete-tasks/incomplete-tasks.component';
import { CompleteTasksComponent } from './complete-tasks/complete-tasks.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'all-tasks', pathMatch: 'full'},
      { path: 'all-tasks', component: AllTasksComponent},
      { path: 'incomplete-tasks', component: IncompleteTasksComponent },
      { path: 'complete-tasks', component: CompleteTasksComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
