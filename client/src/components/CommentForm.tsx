import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '@/utils/mutations';

const CommentForm = ({ username, squirrelID }: any) => {
  const [commentText, setCommentText] = useState('');
//   const [characterCount, setCharacterCount] = useState(0);

  const [addComment] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await addComment({
        variables: { 
          squirrelID, username 
        }
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
    //   setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>Add a comment about this squirrel...</h4>
      {/* <p
        className={`m-0 ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p> */}
      <form
        onSubmit={handleFormSubmit}
      >
        <div>
          <textarea
            name="commentText"
            placeholder="What are your thoughts?"
            value={commentText}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;