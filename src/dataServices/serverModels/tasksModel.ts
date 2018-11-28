import { TaskModel } from "./taskModel";
import { PaginationContext } from "./paginationContext";

/*
  Represents API tasks models with pagination.
*/
export class TasksModel {
    public data: TaskModel[];
    public paginationContext: PaginationContext
}