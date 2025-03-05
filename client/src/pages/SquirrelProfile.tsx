import { useQuery } from "@apollo/client";
import { GET_SINGLE_SQUIRREL } from "@/utils/queries";
import { useParams } from "react-router-dom";
import SquirrelProfile from "@/components/SquirrelProfile";
import SquirrelComments from "@/components/Comment";
import CommentForm from "@/components/CommentForm";

const Profile = () => {
    const { id } = useParams<{ id: string }>();

    const { loading, data } = useQuery(GET_SINGLE_SQUIRREL, {
        variables: { _id: id },
    });

    const squirrel = data?.getSingleSquirrel || {};

    //squirrel name is returning undefined?
    console.log("Squirrel Name:", squirrel.squirrelName);

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
                    <SquirrelComments comments={squirrel.comments} />
                    <CommentForm />
                </div>

            ) : (
                <h4>That squirrel does not live in Central Park! Head back home explore others.</h4>
            )}
        </div>
    );
};

export default Profile;

