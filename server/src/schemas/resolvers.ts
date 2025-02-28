// import { Query } from "mongoose";
import Comments, { IComment } from "../models/comments";
// import FavSquirrels, { IFavSquirrels } from "../models/favsquirrels";
import User, { IUser } from "../models/user";

const resolvers = {
    Query: {
        //Query fot getting the entire user object based on the UUID
        findUser: async (_parent: any, { _id }: { _id: string }): Promise<IUser | null> => {
            // Check if _id is provided and use it to find the user
            if (!_id) {
                return null; // or handle the case where _id is not provided
            }
            return User.findById(_id).exec(); // Use findById to get a single user by _id
        },

        // Query for getting the comments for each squirrel on their profile page (will reuquire the squirrels UUID and will return all the comments using a map function?)
        findComments: async (_parent: any, { _id }: { _id: string }): Promise<IComment[] | null> => {
            if (!_id) {
                return null; // Handle the case where _id is not provided
            }

            // Find comments associated with the squirrel's UUID
            const comments = await Comments.find({ squirrelUUID: _id }).exec();

            return comments; // Return the array of comments
        },
    },
    Mutation: {
        //Mutation to create a user account (will require Username, Email, & Password)
        createUser: async (_parent: any, { username, email, password }: { username: string, email: string, password: string }): Promise<IUser | null> => {
            const newUser = await User.create({ username, email, password });

            return newUser
        },
        //Mutation for appending favorite squirrels to the favorite squirrel array in user profiles (will requre the squirrel fovorite UUID)
        addFavSquirrels: async (_parent: any, { _id, squirrelUUID }: { _id: string, squirrelUUID: string }): Promise<IUser | null> => {
            const newFavSquirrel = await User.findByIdAndUpdate(
                _id, // The ID of the user
                { $push: { favSquirrels: squirrelUUID } }, // Use $push to append the squirrelUUID
                { new: true } // This option returns the updated document
            );

            return newFavSquirrel
        },

        // Mutation to for adding a comment to a squirrel (will requrie a squirrel UUID and the comment from the users input)
        addComment: async (_parent: any, { username, squirrelUUID, textContent }: { username: string, squirrelUUID: string, textContent: string }): Promise<IComment | null> => {
            const newComment = await Comments.create({ username, squirrelUUID, textContent })

            return newComment;
        }

    }
}

export default resolvers