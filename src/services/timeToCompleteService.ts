import { Injectable } from "@angular/core";
import { Observable, interval, timer } from 'rxjs';
import { map, share } from "rxjs/operators";
import { Task } from "../dataServices/clientModels/task";
import { TaskModel } from '../dataServices/serverModels/taskModel';

@Injectable()
/*
  Service for time to complete UI async calculation for tasks
*/
export class TimeToCompleteService {

    private _timer: Observable<number>;

    constructor() {
        this._timer = timer(0, 1000);
    }

    public getTimeToCompleteAsync(task: Task): Observable<number> {
        return this._timer.pipe(map(() => {
            var nowDate = new Date();
            var dateDiff = nowDate.getTime() - task.CreatedDate.getTime();

            var residueTimeInSeconds = task.TimeToComplete - (dateDiff / 1000);

            return residueTimeInSeconds > 0 ? residueTimeInSeconds : 0;
        }));
    }
}