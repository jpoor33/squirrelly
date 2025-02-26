import { Schema, model, type Document } from 'mongoose';

interface IComment extends Document { 
    squirrelUUID: string;
    textContent: string;
    username: string;
}

const commentSchema = new Schema<IComment>({
        squirrelUUID: {
            type: String,
            required: true,
            unique: true,
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

const commentsSchema = new Schema<IComments>({
    arrayOfComments: {
        type: [commentSchema]
    }
})

const Comments = model<IComments>('Comments', commentsSchema);

export default Comments;