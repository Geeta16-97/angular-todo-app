import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from '../task.service';
import { filter, Observable } from 'rxjs';
import { Task } from '../layout/task.types';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit{

  allTasks$!: Observable<Task[]>;
  
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.allTasks$ = this.taskService.tasks$;
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
