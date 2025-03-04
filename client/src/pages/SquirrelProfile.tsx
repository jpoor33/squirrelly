import { useQuery } from "@apollo/client";
import { GET_SINGLE_SQUIRREL } from "@/utils/queries";
import { useParams } from "react-router-dom";
import SquirrelProfile from "@/components/SquirrelProfile";
import SquirrelComments from "@/components/Comment";

const Profile = () => {
    const { id } = useParams<{ id: string }>();

    const { loading, data } = useQuery(GET_SINGLE_SQUIRREL, {
        variables: { id: id },
    });

    const squirrel = data?.getSingleSquirrel || {};

    // const squirrel = { ...data.getSingleSquirrel };

    console.log("Squirrel Data:", squirrel);
    console.log("Squirrel Prototype:", Object.getPrototypeOf(squirrel));

    console.log(squirrel);

    if (loading) {
        return <div>Squirrel data is loading...</div>;
    }

    return (
        <div>
            {squirrel ? (
                <div> 
                <SquirrelProfile
                    squirrelUUID={squirrel.squirrelUUID}
                    squirrelName={squirrel.squirrelName}
                    primaryFurColor={squirrel.primaryFurColor}
                    age={squirrel.age}
                    location={squirrel.location}
                    actions={squirrel.actions}
                />
                    {/* access the array of squirrels comments - for each comment, run the call back function with props as parameters. Each "comment" has these props, and an index of where it is in the array. */}
                    {squirrel.comments?.map((comment: { username: string; textContent: string }, index: number) => (
                        <SquirrelComments
                            key={index}
                            username={comment.username}
                            textContent={comment.textContent} />
                    ))}
            </div>

            ) : (
                <h4>That squirrel does not live in Central Park! Head back home explore others.</h4>
            )}
        </div>
    );
};

export default Profile;

