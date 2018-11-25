import { PaginationContext } from "../serverModels/paginationContext";
import { Task } from "./task";

export class TasksSource {

    public constructor(
        public tasks: Task[],
        public paginationContext: PaginationContext) { }
}