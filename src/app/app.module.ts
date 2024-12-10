import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskNavComponent } from './tasks/task-nav/task-nav.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskItemComponent } from './tasks/task-list/task-item/task-item.component';
import { TaskService } from './tasks/task.service';
import { TimeFormatPipe } from './shared/pipes/time-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TasksComponent,
    TaskNavComponent,
    TaskEditComponent,
    TaskListComponent,
    TaskItemComponent,
    TimeFormatPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
