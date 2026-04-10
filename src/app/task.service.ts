import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, take, tap } from 'rxjs';
import { Task } from './layout/task.types';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private _selectedTask: any = new BehaviorSubject(null);

  private KEY: string = "todoList";

  get tasks$(): Observable<any> {
    return this._tasks.asObservable();
  }

  get selectedTask$(): Observable<any> {
    return this._selectedTask.asObservable();
  }

  setSelectedTask(task: any) {
    this._selectedTask.next(task);
  }

  setLocalStorage(localVal: Task[]) {
    localStorage.setItem(this.KEY, JSON.stringify(localVal));
  }

  constructor() { }

  getAll() {
    const localRead = localStorage.getItem(this.KEY);
    console.log(localRead)
    this._tasks.next(localRead ? JSON.parse(localRead) : []);
  }

  createTask(newTask: any) {
    const added = this._tasks.value;
    this._tasks.next([...added, newTask]);
    console.log(this._tasks.value);
    this.setLocalStorage(this._tasks.value);
  }

  updateTask(updatedTask: any) {
    const updated = this._tasks.value?.map(task => task.id == updatedTask.id ? updatedTask : task);
    this._tasks.next(updated);
    this.setLocalStorage(this._tasks.value);
  }

  deleteTask(id: string) {
    const deleted = this._tasks.value?.filter(task => task.id != id);
    this._tasks.next(deleted);
    this.setLocalStorage(this._tasks.value);
  }

  toggleComplete(id: string, checked: boolean) {
    const isComplete = this._tasks.value?.map(data => data.id == id ? ({...data, isCompleted: checked}) : data);
    this._tasks.next(isComplete);
    this.setLocalStorage(this._tasks.value);
  }

  toggleAllComplete(checked: boolean) {
    const markAll = this._tasks.value?.map(data => ({ ...data, isCompleted: checked }));
    this._tasks.next(markAll);
    this.setLocalStorage(this._tasks.value);
  }
}
