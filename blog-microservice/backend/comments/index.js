import express from 'express'
import {v4 as uuidv4} from 'uuid'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    const commentId = uuidv4()
    const { content } = req.body

    const comments = commentsByPostId[req.params.id] || []

    comments.push({ id: commentId, content })

    commentsByPostId[req.params.id] = comments

    res.status(201).send(comments)
})

app.listen(4001, ()=> {
    console.log("Listening on 4001")
})