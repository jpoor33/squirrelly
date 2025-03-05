import { Schema, model, type Document } from 'mongoose';

export interface IComment extends Document { 
    squirrelUUID: string;
    textContent: string;
    username: string;
}

const commentSchema = new Schema<IComment>({
        squirrelUUID: {
            type: String,
            required: true,
        },
        textContent: {
            type: String,
            required: true,
        },
        username: {
            type: String,
        },
});

export interface IComments extends Document {
    arrayOfComments: IComment[];
}

const Comments = model<IComment>('Comment', commentSchema);

export default Comments;