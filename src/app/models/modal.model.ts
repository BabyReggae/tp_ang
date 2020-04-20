export class modal {
    constructor(
        public title: string,
        public bodyText: string,
        public inputLabel: string,
        public inputValue: string = "",  
        public display: string = "true"
    ) {}
}