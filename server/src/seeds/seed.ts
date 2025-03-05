import db from "../config/connection.js";
import models from "../models/index.js";
const { User, Comments, FavSquirrels} = models;
// import { Comments } from "../models/index.js";
// import { FavSquirrels } from "../models/index.js";
import { commentsSeeds } from '../seeds/commentsSeeds.js';
import { favSquirrelsSeeds } from '../seeds/favsquirrelsSeeds.js';
import { usersSeeds } from '../seeds/userSeeds.js'


const seedDatabase = async (): Promise<void> => {
    try {
        await db();
        
        await User.insertMany(usersSeeds);
        console.log('Users seeded successfully');

        await Comments.insertMany(commentsSeeds);
        console.log('Comments seeded successfully!');

        await FavSquirrels.insertMany(favSquirrelsSeeds);
        console.log('Squirrels seeded successfully');

        process.exit(0);

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error seeding database:', error.message);
        } else {
            console.error('Unknown error seeding database');
        }
        process.exit(1);
    }
};

seedDatabase();