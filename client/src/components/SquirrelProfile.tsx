import React from "react";

interface Squirrel {
    squirrelUUID: string;
    squirrelName: string;
    primaryFurColor: string;
    age: string;
    actions: string[];
    location: string;
}

const SquirrelProfile: React.FC<Squirrel> = ({squirrelName, primaryFurColor, age, actions, location  }) => {
    return (
        <div>
            <section className="profile-header">
                <h1> {squirrelName}</h1>
            </section>
            <section className="profile-body"> 
                <p> {age} </p>
                <p> {primaryFurColor} </p>
                <p> {location} </p>
                <p> {actions} </p>
            </section>
        </div>
    );
};

export default SquirrelProfile;