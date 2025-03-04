import React from "react";
import { useMutation } from "@apollo/client";
import { FAV_SQUIRREL } from "@/utils/mutations";


interface Squirrel {
    userUUID: string;
    squirrelUUID: string;
    squirrelName: string;
    primaryFurColor: string;
    age: string;
    actions: string[];
    location: string;
}



//needs to be styled as a card
const SquirrelCard: React.FC<Squirrel> = ({userUUID,squirrelUUID, squirrelName, primaryFurColor, age, actions, location  }) => {
    const [addFavorite, { error } ]= useMutation(FAV_SQUIRREL);

    const favoriteSquirrel = async () => {
        try {

           await addFavorite({
            variables: {userUUID, squirrelUUID}
           }) 

        } catch (err: any) {
            console.error('Error favoriting Squirrel:', err.message);
        }

    }

    return (
        <div>
            <section className="card-header">
                <h1> {squirrelName}</h1>
                <h2> {squirrelUUID}</h2>
            </section>
            <section className="card-body"> 
                <p> {age} </p>
                <p> {primaryFurColor} </p>
                <p> {location} </p>
                <p> {actions} </p>
            </section>
            <section className="card-button">
                <button onClick={favoriteSquirrel}> Favorite this Squirrel </button>
            </section>
            {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
                 Something went wrong...
            </div>
            )}
        </div>
    );
};

export default SquirrelCard;