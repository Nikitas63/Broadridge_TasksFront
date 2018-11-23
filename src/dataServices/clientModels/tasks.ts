import { PaginationContext } from "../serverModels/paginationContext";
import { Task } from "./task";

export class Tasks {

    public constructor(
        public tasks: Task[],
        public paginationContext: PaginationContext) { }
}