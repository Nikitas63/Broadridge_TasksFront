import { Injectable } from "@angular/core";
import { Observable, interval, timer } from 'rxjs';
import { map, share } from "rxjs/operators";
import { Task } from "../dataServices/clientModels/task";

@Injectable()
export class TimeToCompleteService {

    // Start date for calculation time to complete
    private _startDate: Date;

    private _tasksWithTimeToCompleteHash: Map<string, number>;

    private Timer: Observable<void>;

    constructor() {
        this._startDate = new Date();

        this.Timer = timer(0, 1000)
            .pipe(map(() => 
                {
                    this._tasksWithTimeToCompleteHash.forEach((value, key) => {
                        this._tasksWithTimeToCompleteHash.set(key, value > 0 ? --value : 0);
                    });
                })
            )
            .pipe(share());
    }

    public initTimer(tasks: Task[]) {
        this._tasksWithTimeToCompleteHash = new Map();
        var secondsPassed = (new Date().getTime() - this._startDate.getTime()) / 1000;

        tasks.forEach(task => {
            if (!this._tasksWithTimeToCompleteHash.has(task.Id)) {
                var timeToComplete = Math.round((task.TimeToComplete - secondsPassed));
                this._tasksWithTimeToCompleteHash.set(task.Id, timeToComplete > 0 ? timeToComplete : 0);
            }
        });
    }

    public getTimeToCompleteAsync(taskId: string): Observable<number> {
        return this.Timer.pipe(map(() => {
            return this._tasksWithTimeToCompleteHash.get(taskId)
        }));
    }
}