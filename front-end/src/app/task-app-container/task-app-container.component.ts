import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../dto/task";

@Component({
  selector: 'app-task-app-container',
  templateUrl: './task-app-container.component.html',
  styleUrls: ['./task-app-container.component.scss']
})
export class TaskAppContainerComponent {
  taskList: Array<Task>=[];
  constructor(private http: HttpClient) {
    http.get<Array<Task>>("http://localhost:8080/app/api/v1/tasks")
      .subscribe(taskList=>{
        this.taskList=taskList;
        // console.log((new Date(taskList[0].date.toString())).toLocaleDateString());
      });
  }

  saveTask(txt: HTMLInputElement, date: HTMLInputElement) {
    console.log(date.value)
    if (!txt.value.trim()){
      txt.select();
      return;
    }
    if (!date.value.trim()){
      date.select();
      return;
    }
    this.http.post<Task>("http://localhost:8080/app/api/v1/tasks",
      new Task(0, txt.value, date.value, "NOT_COMPLETED") )
      .subscribe(task =>{
        this.taskList.push(task);
      });
    txt.value = '';
    date.value = '';

  }

  deleteTask(task: Task) {
    this.http.delete(`http://localhost:8080/app/api/v1/tasks/${task.id}`)
      .subscribe(data=>{
        const index: number = this.taskList.indexOf(task);
        this.taskList.splice(index, 1);
      })
  }

  updateTask(task: Task) {
    const newStatus = task.status === 'COMPLETED' ? 'NOT_COMPLETED' : 'COMPLETED';
    const updatedTask = {status: newStatus};

    this.http.patch(`http://localhost:8080/app/api/v1/tasks/${task.id}`, updatedTask)
      .subscribe(data => {
        task.status = newStatus;
      });
  }
}


