export default function ListComments({ comments }) {
  return (
    <ul>
      { comments.map( (comment ) => {
        return (    
          <li key={comment.id}>{comment.content}</li>
        )})}
    </ul>
  )
}