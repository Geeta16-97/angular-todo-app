import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { Task } from '../layout/task.types';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-incomplete-tasks',
  templateUrl: './incomplete-tasks.component.html',
  styleUrls: ['./incomplete-tasks.component.css']
})
export class IncompleteTasksComponent implements OnInit {
  incompleteTasksList$!: Observable<Task[]>;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.incompleteTasksList$ = this.taskService.tasks$.pipe(
      map(tasks => tasks.filter((task: Task) => !task.isCompleted))
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
