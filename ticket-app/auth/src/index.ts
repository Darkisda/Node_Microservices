import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'

import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'

import { NotFoundError } from './errors/not-found-error'
import { ErrorHandler } from './middlewares/error-handler'

const app = express()
app.use(express.json())

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.get('*', async () => {
    throw new NotFoundError()
})

app.use(ErrorHandler)

const start = async () => {
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        console.log('Connected to MongoDB!!!')
    } catch(err) {
        console.log(err)
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!')
    })
}

start()