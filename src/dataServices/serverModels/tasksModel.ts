import { TaskModel } from "./taskModel";
import { PaginationContext } from "./paginationContext";

export class TasksModel {
    public data: TaskModel[];
    public paginationContext: PaginationContext
}