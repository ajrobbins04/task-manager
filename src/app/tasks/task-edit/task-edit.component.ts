import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'task-manager-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {

  onSubmit(form: NgForm) {}
}
