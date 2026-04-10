import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { Task } from '../layout/task.types';

@Component({
  selector: 'app-complete-tasks',
  templateUrl: './complete-tasks.component.html',
  styleUrls: ['./complete-tasks.component.css']
})
export class CompleteTasksComponent implements OnInit {
  completeTasks$!: Observable<Task[]>;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.completeTasks$ = this.taskService.tasks$.pipe(
      map(tasks => tasks.filter((task: Task) => task.isCompleted))
    );
  }

  onEditTask(task: Task): void {
    this.taskService.setSelectedTask(task);
  }

  onDeleteTask(id: string): void {
    this.taskService.deleteTask(id);
  }

  onTaskCheck(taskId: string, checked: boolean) {
    this.taskService.toggleComplete(taskId, checked);
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
