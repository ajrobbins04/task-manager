import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { HeaderComponent } from './header.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskNavComponent } from './tasks/task-nav/task-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    HeaderComponent,
    TaskEditComponent,
    TaskListComponent,
    TaskNavComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
