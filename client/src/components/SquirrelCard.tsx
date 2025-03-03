import React from "react";

interface Squirrel {
    squirrelUUID: string;
    squirrelName: string;
    primaryFurColor: string;
    age: string;
    actions: string[];
    location: string;
}

//needs to be styled as a card
const SquirrelCard: React.FC<Squirrel> = ({squirrelUUID, squirrelName, primaryFurColor, age, actions, location  }) => {
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
        </div>
    );
};

export default SquirrelCard;