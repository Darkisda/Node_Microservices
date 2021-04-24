import { useState, useEffect } from 'react'
import { apiEvent } from '../../server/api'
import CreateComment from '../Comments/CreateComment'
import ListComments from '../Comments/ListComents'

export default function ListPost() {
  const [posts, setPosts] = useState({})
  const [isLoaded, setLoaded] = useState(false)
  
  async function fetchPosts() {
    const response = await apiEvent.get('/posts')

    setPosts(response.data)
  }

  useEffect(()=> {
    fetchPosts()
    setLoaded(true)
  }, [])

  const renderedPosts = Object.values(posts)

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      { isLoaded ? (
        renderedPosts.map((post, key) => (
          <div 
            key={key} 
            className="card"
            style={{width: '30%', marginBottom: '15px'}}
            >
            <div className="card-body">
              <h3>{post.title}</h3>

              <ListComments comments={post.comments} />
              <CreateComment postId={post.id} />
            </div>
          </div>
        ))
      ) : 'Carregando...' }
    </div>
  )
}