import { useQuery } from "@apollo/client";
import { GET_SINGLE_SQUIRREL } from "@/utils/queries";
import { useParams } from "react-router-dom";
import SquirrelProfile from "@/components/SquirrelProfile";

const Profile = () => {
    const { squirrelUUID } = useParams<{ squirrelUUID: string }>();

    const { loading, data } = useQuery(GET_SINGLE_SQUIRREL, {
        variables: { squirrelUUID: squirrelUUID },
    });

    const squirrel = data?.getSingleSquirrel || {};

    if (loading) {
        return <div>Squirrel data is loading...</div>;
    }

    return (
        <div>
            {squirrel ? (
                <SquirrelProfile
                    squirrelUUID={squirrel.squirrelUUID}
                    squirrelName={squirrel.squirrelName}
                    primaryFurColor={squirrel.primaryFurColor}
                    age={squirrel.age}
                    location={squirrel.location}
                    actions={squirrel.actions}
                />
            ) : (
                <h4>That squirrel does not live in Central Park! Head back to explore others.</h4>
            )}
        </div>
    );
};

export default Profile;

