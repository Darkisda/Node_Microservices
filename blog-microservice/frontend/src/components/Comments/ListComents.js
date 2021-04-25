export default function ListComments({ comments }) {
  return (
    <ul>
      { comments.map( (comment ) => {

        let content

        switch (comment.status) {
          case 'approved':
            content = comment.content
            break;
        
          case 'pending':
            content = 'This comment is awating moderation'
            break;

          case 'rejected':
            content = 'This comment has been rejected'
            break;

          default:
            break;
        }

        return (    
          <li key={comment.id}>{content}</li>
        )})}
    </ul>
  )
}