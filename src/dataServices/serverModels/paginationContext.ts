export class PaginationContext {
    public constructor(
        public page: number,
        public pages: number,
        public size: number,
        public totalRows: number
    ) { }
}