import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { HeaderComponent } from './header.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskNavComponent } from './tasks/task-nav/task-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskItemComponent } from './tasks/task-list/task-item/task-item.component';
import { TimeFormatPipe } from './shared/pipes/time-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    HeaderComponent,
    TaskEditComponent,
    TaskListComponent,
    TaskNavComponent,
    TaskItemComponent,
    TimeFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
