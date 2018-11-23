import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaskModel } from '../serverModels/taskModel';
import { PaginationContext } from '../serverModels/paginationContext';
import { TasksModel } from '../serverModels/tasksModel';
import { Tasks } from '../clientModels/tasks';
import { Task } from '../clientModels/task';

@Injectable()
export class TasksService {
    constructor(private _httpClient: HttpClient) { }

    public getTasks(): Observable<Tasks> {
        return this._httpClient.get<TasksModel>('http://localhost:5055/api/tasks')
            .pipe(map(res => {
                var tasks = res.data.map(t => new Task(
                    t.id,
                    new Date(t.createdDate),
                    new Date(t.updatedDate),
                    t.name,
                    t.description,
                    t.prioriry,
                    t.timeToComplete,
                    t.status,
                    t.isDeleted
                ));

                return new Tasks(
                    tasks,
                    res.paginationContext
                );
            }));
    }
}