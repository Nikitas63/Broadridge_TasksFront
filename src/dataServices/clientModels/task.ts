export class Task {
    public constructor(
        public Id: string,
        public CreatedDate: Date,
        public UpdatedDate: Date,
        public Name: string,
        public Description: string,
        public Priority: number,
        public TimeToComplete: number,
        public Status: number
    ) { }
}