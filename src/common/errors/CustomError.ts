export default class CustomError extends Error {
    message: string;
    code: string;
    name: string;
    constructor(message: string, code: string, name: string) {
        super();
        this.message = message;
        this.code = code;
        this.name = name;
    }
}
