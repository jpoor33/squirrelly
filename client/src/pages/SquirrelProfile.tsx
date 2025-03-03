import { useQuery } from "@apollo/client";
import { GET_SQUIRRELS } from "@/utils/queries";
import { useParams } from "react-router-dom";

const Profile  = () => {
    const { squirrelUUID } = useParams<{ squirrelUUID: string }>();

const { loading, data } = useQuery(GET_SQUIRRELS);

if (loading) {
    return <div>Squirrel data is loading...</div>;
  }

// need to find individual squirrel, assign to const squirrelInfo
const squirrelInfo = data?.getSquirrels.find (
    (squirrel: any) => squirrel.squirrelUUID == squirrelUUID
);

if (!squirrelInfo?.squirrelName) {
    return (
        <h4>
            That squirrel does not live in Central Park! Head back to explore others.
        </h4>
    )
}

console.log(squirrelInfo);

// do we want to search by id? if so...
// if ( ().data._id === squirrelUUID) {
//     return <Navigate to = '/:' />
// }

return (
    <div>
        <h2> { squirrelInfo.squirrelName } </h2>;
    </div>
)
};

export default Profile;

