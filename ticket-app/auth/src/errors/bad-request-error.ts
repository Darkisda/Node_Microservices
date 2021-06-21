import { ErrorsHandlingImp } from './errors-handling-imp'

export class BadRequestError extends ErrorsHandlingImp {
    statusCode = 400

    constructor(public message: string) {
        super(message)

        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors() {
        return [{
            message: this.message
        }]
    }
}