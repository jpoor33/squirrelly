import { Schema, model, type Document } from 'mongoose';

export interface IFavSquirrels extends Document {
    squirrelUUID: string;
    squirrelName: string;
    primaryFurColor: string;
    age: string;
    actions: {};
    }

    const FavSquirrelsSchema = new Schema<IFavSquirrels>({
        squirrelUUID: {
            type: String,
            required: true,
        },
        squirrelName: {
            type: String,
        },
        primaryFurColor: {
            type: String,
        },
        age: {
            type: String,
        },
        actions: {
            type: Object,
        },
    });

    const FavSquirrels = model('FavSquirrels', FavSquirrelsSchema);

    export default FavSquirrels;
