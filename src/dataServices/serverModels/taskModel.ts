/*
  Represents API task model.
*/
export class TaskModel {
    public constructor(
        public id: string,
        public createdDate: string,
        public updatedDate: string,
        public name: string,
        public description: string,
        public priority: number,
        public timeToComplete: number,
        public status: number
    ) { }
}