// import { useMutation } from "@apollo/client";
// import { ADD_COMMENT } from "@/utils/mutations";
// import { GET_SINGLE_SQUIRREL } from "@/utils/queries";
// import { useState } from "react";

// // interface CommentFormInfo {
// //     squirrelId: string
// // }


// // COMMENTING OUT FOR NOW -- MAR NEEDS TO EDIT

// // creating a form that accepts the squirrelId as props (destructed)
// const CommentForm: REACT.FC<CommentFormProps> = ({ squirrelID }) => {

//     //initialize state with empty string, comments will be passed through to update the CommentText
//     const [commentText, setCommentText] = useState("");

//     // send the GraphQL mutation to Apollo Client and send in variables with mutation
//     const [addComment] = useMutation(ADD_COMMENT, {
//         variables: { squirrelId, textContent: commentText },
//         refetchQueries: [{ query: GET_SINGLE_SQUIRREL, variables: { _id: squirrelId } }], // refetch the squirrel data to include the new comment
//         onCompleted: () => setCommentText(""), // clear the input after the comment is added
//     });

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         if (commentText.trim()) {
//             addComment();
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <textarea
//                 value={commentText}
//                 onChange={(event) => setCommentText(event.target.value)}
//                 placeholder="Add a comment here..."
//                 rows={4}
//             />    
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default CommentForm;

