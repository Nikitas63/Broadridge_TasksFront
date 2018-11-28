import { PaginationContext } from "../serverModels/paginationContext";
import { Task } from "./task";

/*
  Represents tasks paginated source.
*/
export class TasksSource {

    public constructor(
        public tasks: Task[],
        public paginationContext: PaginationContext) { }
}