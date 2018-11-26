export class Task {
    public constructor(
        public Id?: string,
        public CreatedDate?: Date,
        public UpdatedDate?: Date,
        public Name?: string,
        public Description?: string,
        public Priority?: number,
        public TimeToComplete?: number,
        public Status?: TaskModelStatus
    ) { }

    public get isCompleted(): boolean {
        return this.Status == TaskModelStatus.Completed;
    }
}

export enum TaskModelStatus {
    Active = 1,
    Completed = 2
}

export enum TasksFilter {
    All = 1,
    Active = 2,
    Completed = 3
}