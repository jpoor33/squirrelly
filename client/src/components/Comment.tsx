import React from "react";

interface Comment {
    _id: string;
    createdAt: string;
    commentText: string;
  }
interface CommentProps {
    comments?: Comment[]
}

const SquirrelComments: React.FC<CommentProps> = ({ comments = [] }) => {
    console.log(comments);
    if (!comments.length) {
      return <h3>No Comments Yet</h3>;
    }
  
    return (
      <>
        <h3>
          Comments
        </h3>
        <div>
          {comments &&
            comments.map((comment) => (
              <div key={comment._id}>
                <div >
                  <h5 >
                    An anonymous user commented{' '}
                    <span>
                      on {new Date(Number(comment.createdAt)).toLocaleString()}
                    </span>
                  </h5>
                  <p>{comment.commentText}</p>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  };
  
  export default SquirrelComments;