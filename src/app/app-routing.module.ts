import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'documents', component: TasksComponent,
        children: [
          { path: 'new', component: TaskEditComponent },
          { path: ':id/edit', component: TaskEditComponent },
        ],
      }
    ]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    })
    export class AppRoutingModule {}