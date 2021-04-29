import {useState} from 'react'
import { apiPost } from '../../server/api'

export default function CreatePost() {
  const [title, setTitle] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    await apiPost.post('posts/create', {
      title
    })

    setTitle('')
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group" >
          <label>Title</label>
          <input className="form-control" value={title} onChange={ e => setTitle(e.target.value) } />
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}