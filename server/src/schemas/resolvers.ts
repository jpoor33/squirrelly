// import { Query } from "mongoose";
import Comments, { IComment } from "../models/comments.js";
import FavSquirrels, { IFavSquirrels } from "../models/favsquirrels.js";
import User, { IUser } from "../models/user.js";
import { faker } from '@faker-js/faker';

const APP_TOKEN = "DzPQYwjBW9vgaLpcrQ6qzKuaY";

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
        getSquirrels: async () => {
            try {
                const response = await fetch("https://data.cityofnewyork.us/resource/vfnx-vebw.json", {
                    headers: {
                        "X-App-Token": APP_TOKEN,
                    },
                });

                if (!response.ok) {
                    throw new Error("failed API repsonse")
                }

                const squirrels: any[] = await response.json();

                return squirrels.map((squirrel: any) => ({
                    squirrelUUID: squirrel.unique_squirrel_id,
                    squirrelName: faker.person.firstName(),
                    primaryFurColor: squirrel.primary_fur_color || "Unknown",
                    age: squirrel.age || "Unknown",
                    actions: [
                        squirrel.running === "true" || squirrel.running === true ? "running" : null,
                        squirrel.chasing === "true" || squirrel.chasing === true ? "chasing" : null,
                        squirrel.eating === "true" || squirrel.eating === true ? "eating" : null,
                        squirrel.foraging === "true" || squirrel.foraging === true ? "foraging" : null,
                        squirrel.climbing === "true" || squirrel.climbing === true ? "climbing" : null,
                    ].filter(Boolean),
                    location: squirrel.location || "Unknown",

                }));
            } catch (error) {
                console.error("Error getting squirrels", error);
                throw new Error("Failed to get squirrels");

                
            }
        },

        getUserFavorites: async (_parent: any, { username }: {username:string}) => {
            const user = await User.findOne({username});
            if(!user) throw new Error("User not found");

            const response = await fetch("https://data.cityofnewyork.us/resource/vfnx-vebw.json", {
                headers: {
                    "X-App-Token": APP_TOKEN,
                },
            });

            if (!response.ok) {
                throw new Error("failed API repsonse")
            }

            const squirrels: any[] = await response.json();

            const allSquirrels = squirrels.map((squirrel:any) => ({

                squirrelUUID: squirrel.unique_squirrel_id,
                    squirrelName: faker.person.firstName(),
                    primaryFurColor: squirrel.primary_fur_color || " ",
                    age: squirrel.age || " ",
                    actions: [
                        squirrel.running === "true" || squirrel.running === true ? "running" : null,
                        squirrel.chasing === "true" || squirrel.chasing === true ? "chasing" : null,
                        squirrel.eating === "true" || squirrel.eating === true ? "eating" : null,
                        squirrel.foraging === "true" || squirrel.foraging === true ? "foraging" : null,
                        squirrel.climbing === "true" || squirrel.climbing === true ? "climbing" : null,
                    ].filter(Boolean),
                    location: squirrel.location || " ",

            }));

            return allSquirrels.filter(squirrel => user.favSquirrels?.includes(squirrel.squirrelUUID))


           
        },
          
        getAllUsers: async() => {
            return await User.find({});
        },
        
        getSingleSquirrel: async (_parent: any, { _id }: { _id: string }): Promise<IFavSquirrels | null> => {
            try {
                const response = await fetch("https://data.cityofnewyork.us/resource/vfnx-vebw.json", {
                    headers: {
                        "X-App-Token": APP_TOKEN,
                    },
                });

                if (!response.ok) {
                    throw new Error("failed API repsonse")
                }
                // console.log(response);
                const squirrels: any[] = await response.json();
                // console.log(squirrels);

                const squirrel = squirrels.find((squirrel) => squirrel.unique_squirrel_id == _id);

                const comments = await Comments.find({ squirrelUUID: _id }).exec();

                return new FavSquirrels ({
                    squirrelUUID: squirrel.unique_squirrel_id,
                    squirrelName: faker.person.firstName(),
                    primaryFurColor: squirrel.primary_fur_color || " ",
                    age: squirrel.age || " ",
                    actions: [
                        squirrel.running === "true" || squirrel.running === true ? "running" : null,
                        squirrel.chasing === "true" || squirrel.chasing === true ? "chasing" : null,
                        squirrel.eating === "true" || squirrel.eating === true ? "eating" : null,
                        squirrel.foraging === "true" || squirrel.foraging === true ? "foraging" : null,
                        squirrel.climbing === "true" || squirrel.climbing === true ? "climbing" : null,
                    ].filter(Boolean),
                    location: squirrel.location || " ",
                    comments,
                });

            } catch (error) {
                console.error("Error getting squirrels", error);
                throw new Error("Failed to get squirrels");
            }
        },
    },
    Mutation: {
        //Mutation to create a user account (will require Username, Email, & Password)
        createUser: async (_parent: any, { username, email, password }: { username: string, email: string, password: string }): Promise<IUser | null> => {
            const newUser = await User.create({ username, email, password });

            return newUser
        },
        //Mutation for appending favorite squirrels to the favorite squirrel array in user profiles (will requre the squirrel fovorite UUID)
        addFavSquirrels: async (_parent: any, { username, squirrelUUID }: { username: string, squirrelUUID: string }): Promise<IUser | null> => {
            const user = await User.findOne({username});

            if(!user) {
                throw new Error("user does not exist")
            }

            user.favSquirrels ||= [];


            if (user.favSquirrels.includes(squirrelUUID)) {
                user.favSquirrels = user.favSquirrels.filter(uuid => uuid !== squirrelUUID);
            } else {
                user.favSquirrels.push(squirrelUUID);
            }
            

            await user.save();
            return user;
        },
          
        // Mutation to for adding a comment to a squirrel (will requrie a squirrel UUID and the comment from the users input)
        addComment: async (_parent: any, { username, squirrelUUID, textContent }: { username: string, squirrelUUID: string, textContent: string }): Promise<IComment | null> => {
            const newComment = await Comments.create({ username, squirrelUUID, textContent })

            return newComment;
        },

    },
};

export default resolvers;