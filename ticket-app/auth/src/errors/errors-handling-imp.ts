import SerializeErrors from "./serialize-errors-interface"

export abstract class ErrorsHandlingImp extends Error  {
    abstract statusCode: number

    constructor(message: string) {
        super(message)

        Object.setPrototypeOf(this, ErrorsHandlingImp.prototype)
    }

    abstract serializeErrors(): SerializeErrors[]
}