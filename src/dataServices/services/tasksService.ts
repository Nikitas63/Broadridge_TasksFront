import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaskModel } from '../serverModels/taskModel';
import { TasksModel } from '../serverModels/tasksModel';
import { TasksSource } from '../clientModels/tasksSource';
import { Task, TaskModelStatus, TasksFilter } from '../clientModels/task';

const API_URL = 'http://localhost:5055';

@Injectable()
export class TasksService {
    constructor(private _httpClient: HttpClient) { }

    public getTasks(pageNumber?: number, pageSize?: number, filter?: TasksFilter, orderAsk?: boolean): Observable<TasksSource> {
        var page = pageNumber ? pageNumber : 1;
        var size = pageSize ? pageSize : 25;
        var filter = filter ? filter : TasksFilter.All;
        var orderAskValue = orderAsk == null ? true: orderAsk;

        var orderValue = orderAskValue ? 'OrderAsc=date' : 'OrderDesc=date';

        // TODO: use params like this (not worked for now)
        /*var params = new HttpParams();
        params.append('page', page.toString());
        params.append('size', size.toString());*/

        return this._httpClient.get<TasksModel>(`${API_URL}/api/tasks?page=${page}&size=${size}&filter=${this.filterToString(filter)}&${orderValue}`)
            .pipe(map(res => {
                var tasks = res.data.map(t => new Task(
                    t.id,
                    new Date(t.createdDate),
                    new Date(t.updatedDate),
                    t.name,
                    t.description,
                    t.priority,
                    t.timeToComplete,
                    t.status
                ));

                return new TasksSource(
                    tasks,
                    res.paginationContext
                );
            }));
    }

    public getTask(id: string): Observable<Task> {
        return this._httpClient.get<TaskModel>(`${API_URL}/api/tasks/${id}`)
            .pipe(map(task => {
                return new Task(
                    task.id,
                    new Date(task.createdDate),
                    new Date(task.updatedDate),
                    task.name,
                    task.description,
                    task.priority,
                    task.timeToComplete,
                    task.status
                );
            }));
    }

    public completeTask(id: string): Observable<boolean> {
        return this._httpClient.put<TaskModel>(`${API_URL}/api/tasks/${id}?status=${TaskModelStatus.Completed}`, null)
            .pipe(map(res => res.status === TaskModelStatus.Completed));
    }

    public deleteTask(id: string): Observable<any> {
        return this._httpClient.delete(`${API_URL}/api/tasks/${id}`);
    }

    public createTask(task: Task): Observable<Task> {
        return this._httpClient.post<TaskModel>(`${API_URL}/api/tasks?name=${task.Name}&description=${task.Description}&priority=${task.Priority}&timeToComplete=${task.TimeToComplete}`, null)
        .pipe(map(task => {
            return new Task(
                task.id,
                new Date(task.createdDate),
                new Date(task.updatedDate),
                task.name,
                task.description,
                task.priority,
                task.timeToComplete,
                task.status
            );
        }));
    }

    private filterToString(filter: TasksFilter) {
        switch (filter) {
            case TasksFilter.All:
                return 'all';
            case TasksFilter.Active:
                return 'active';
            case TasksFilter.Completed:
                return 'completed';
        }
    }
}