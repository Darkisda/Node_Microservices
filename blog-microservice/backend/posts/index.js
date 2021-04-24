import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => {
    const id = uuidv4()
    const { title } = req.body

    posts[id] = {
        id, title
    }

    res.status(201).send(posts[id])
})

app.listen(4000, () => {
    console.log("Listening on 4000")
})