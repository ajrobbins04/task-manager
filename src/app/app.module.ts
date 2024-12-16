import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { DailyTasksComponent } from './tasks/daily-tasks.component';
import { TaskNavComponent } from './tasks/task-nav/task-nav.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TaskItemComponent } from './tasks/task-list/task-item/task-item.component';
import { TaskService } from './tasks/task.service';
import { TimeFormatPipe } from './shared/pipes/time-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DailyTasksComponent,
    TaskNavComponent,
    TaskEditComponent,
    TaskListComponent,
    TaskItemComponent,
    TimeFormatPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
