import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNavComponent } from './task-nav.component';

describe('TaskNavComponent', () => {
  let component: TaskNavComponent;
  let fixture: ComponentFixture<TaskNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
