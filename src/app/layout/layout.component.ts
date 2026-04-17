import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from './task.types';
import { DatePipe } from '@angular/common';
import { TaskService } from '../task.service';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {
  smallScreen: boolean = false;
  isTablet: boolean = false;
  isOpen: boolean = true;
  newTask: string = "";
  setTask!: Task;
  taskList$!: Observable<Task[]>;

  isEditTask: boolean = false;
  incompleteTasks$!: Observable<any>;
  completedTasks$!: Observable<any>;

  private _unsubscribeAll = new Subject();

  constructor(private datePipe: DatePipe, private taskService: TaskService, private observer: BreakpointObserver) { }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 1024px)', '(min-width: 768px)']).subscribe(res => {
      this.smallScreen = res.breakpoints['(max-width: 1024px)'];
      this.isTablet = res.breakpoints['(min-width: 768px)'];
      console.log("tab", this.isTablet);
      if (this.smallScreen) this.isOpen = false;
    });

    this.taskService.getAll();
    this.taskList$ = this.taskService.tasks$;

    this.taskService.selectedTask$.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.setTask = res;
      if (this.setTask) {
        this.newTask = this.setTask.taskName;
        this.isEditTask = true;
      }
    });

    this.incompleteTasks$ = this.taskService.tasks$.pipe(
      map(tasks => tasks.filter((task: Task) => !task.isCompleted).length)
    );

    this.completedTasks$ = combineLatest([this.taskList$, this.incompleteTasks$]).pipe(
      map(([allTasks, imcompleteTasks]) => allTasks.length - imcompleteTasks)
    );
  }

  toggleSideBar(): void {
    this.isOpen = !this.isOpen;
  }

  markAllCompleted(isChecked: boolean) {
    this.taskService.toggleAllComplete(isChecked);
  }

  addEditTask(): void {
    const date: Date = new Date();

    if (!this.isEditTask) {
      const task: Task = { id: crypto.randomUUID(), taskName: this.newTask, isCompleted: false, dateCreated: this.datePipe.transform(date, 'MMMM d, y') };
        this.taskService.createTask(task);
    } else {
      const task: Task = { ...this.setTask, taskName: this.newTask, dateCreated: this.datePipe.transform(date, 'MMMM d, y') };
      this.isEditTask = false;
      this.taskService.updateTask(task);
      this.taskService.setSelectedTask(null);
    }
    this.newTask = "";
  }

  editTask(index: number): void {
    this.isEditTask = true;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
