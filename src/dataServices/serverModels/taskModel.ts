export class TaskModel {
    public constructor(
        public id: string,
        public createdDate: string,
        public updatedDate: string,
        public name: string,
        public description: string,
        public prioriry: number,
        public timeToComplete: number,
        public status: number,
        public isDeleted: boolean
    ) { }
}