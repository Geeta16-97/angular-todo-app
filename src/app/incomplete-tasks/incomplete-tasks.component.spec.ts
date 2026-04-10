import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteTasksComponent } from './incomplete-tasks.component';

describe('IncompleteTasksComponent', () => {
  let component: IncompleteTasksComponent;
  let fixture: ComponentFixture<IncompleteTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncompleteTasksComponent]
    });
    fixture = TestBed.createComponent(IncompleteTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
