import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskEditComponent } from './tasks/task-list/task-edit/task-edit.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'tasks', component: TasksComponent,
        children: [
          { path: 'task-list/new', component: TaskEditComponent },
          { path: 'task-list/:id/edit', component: TaskEditComponent },
        ],
      }
    ]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    })
    export class AppRoutingModule {}