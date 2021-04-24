import { useEffect, useState } from 'react'
import { apiComment } from '../../server/api'

export default function ListComments({ postId }) {
  const [comments, setComments] = useState([])
  const [isLoaded, setLoaded] = useState(false)

  async function fetchComments() {
    const response = await apiComment.get(`posts/${postId}/comments`)

    setComments(response.data)
  }

  useEffect(()=> {
    fetchComments()
    setLoaded(true)
  }, [])

  return (
    <div>
      { isLoaded ? (
        comments.map( (comment, key) => {
          return (
            <ul>
              <li key={comment.id}>{comment.content}</li>
            </ul>
          )} )
      ) : 'Carregando' }
    </div>
  )
}