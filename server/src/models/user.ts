import { Schema, model, type Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    searchhistory?: string[];
    favSquirrels?: string[];
    // favSquirrels: [{ type: Schema.Types.ObjectId, ref: "FavSquirrels" }],

}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
    },
    searchhistory: [String],
    favSquirrels: [String],

});

const User = model('User', userSchema);

export default User;