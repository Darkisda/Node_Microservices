import { ErrorsHandlingImp } from "./errors-handling-imp"

export class DatabaseConnectionError extends ErrorsHandlingImp {
    statusCode = 500
    reason = 'Error connecting to database'
    
    constructor() {
        super('Error connecting to database')

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }


    serializeErrors() {
        return [
            { 
                message: this.reason
            }
        ]
    }
}