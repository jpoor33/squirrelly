import React from "react";

interface Comment {
    textContent: string;
    username: string;
}

const SquirrelComments: React.FC<Comment> = ({username, textContent}) => {
    return (
        <div>
            <section className="squirrel-comments"> 
                <p>{username}</p>
                <p>{textContent}</p>
            </section>
        </div>
    );
};

export default SquirrelComments;