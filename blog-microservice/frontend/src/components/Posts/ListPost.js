import { useState, useEffect } from 'react'
import { apiPost } from '../../server/api'
import CreateComment from '../Comments/CreateComment'
import ListComments from '../Comments/ListComents'

export default function ListPost() {
  const [posts, setPosts] = useState({})
  const [isLoaded, setLoaded] = useState(false)
  
  async function fetchPosts() {
    const response = await apiPost.get('/posts')

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
              
              <ListComments postId={post.id} />
              <CreateComment postId={post.id} />
            </div>
          </div>
        ))
      ) : 'Carregando...' }
    </div>
  )
}