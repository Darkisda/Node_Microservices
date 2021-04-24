import {useState} from 'react'
import { apiComment } from '../../server/api'

export default function CreateComment({ postId }) {
  const [content, setContet] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    await apiComment.post(`posts/${postId}/comments`, {
      content
    })

    setContet('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input className="form-control" value={content} onChange={e => setContet(e.target.value)} />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}