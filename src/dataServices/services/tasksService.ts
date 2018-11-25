import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaskModel } from '../serverModels/taskModel';
import { PaginationContext } from '../serverModels/paginationContext';
import { TasksModel } from '../serverModels/tasksModel';
import { TasksSource } from '../clientModels/tasksSource';
import { Task } from '../clientModels/task';

@Injectable()
export class TasksService {
    constructor(private _httpClient: HttpClient) { }

    public getTasks(pageNumber?: number, pageSize?: number): Observable<TasksSource> {

        var page = pageNumber ? pageNumber : 1;
        var size = pageSize ? pageSize : 25;

        // TODO: use params like this (not worked for now)
        /*var params = new HttpParams();
        params.append('page', page.toString());
        params.append('size', size.toString());*/

        return this._httpClient.get<TasksModel>(`http://localhost:5055/api/tasks?page=${page}&size=${size}`)
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
}