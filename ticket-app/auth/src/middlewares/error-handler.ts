import { NextFunction, Request, Response } from "express";
import { ErrorsHandlingImp } from '../errors/errors-handling-imp'

export async function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if(err instanceof ErrorsHandlingImp) {
        
        return res.status(err.statusCode).send({ errors: err.serializeErrors() })
    }

    res.status(400).send({
        errors: [
            {
                message: 'Something went wrong'
            }
        ]
    })
}