import express from 'express'
import {v4 as uuidv4} from 'uuid'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(express.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = uuidv4()
    const { content } = req.body

    const comments = commentsByPostId[req.params.id] || []

    comments.push({ id: commentId, content, status: 'pending' })

    commentsByPostId[req.params.id] = comments

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })

    res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
    console.log('Event Receivd:', req.body.type)

    const { type, data } = req.body

    if(type === 'CommentModerated') {
        const { postId, id, status, content } = data
        const comments = commentsByPostId[postId]

        const comment = comments.find( comment => {
            return comment.id === id
        })

        comment.status = status

        console.log( 'COMMENTS: ' + status)

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }

    res.send({})
})

app.listen(4001, ()=> {
    console.log("Listening on 4001")
})