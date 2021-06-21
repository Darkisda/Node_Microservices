import { ErrorsHandlingImp } from "./errors-handling-imp";

export class NotAuthorizedError extends ErrorsHandlingImp {
    statusCode = 401

    constructor() {
        super('Not authorized')

        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    serializeErrors() {
        return [{
            message: 'Not authorized'
        }]
    }
}