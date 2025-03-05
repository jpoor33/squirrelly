import { useQuery } from "@apollo/client";
import { GET_SINGLE_SQUIRREL } from "@/utils/queries";
import { useParams } from "react-router-dom";
import SquirrelProfile from "@/components/SquirrelProfile";

const Profile: React.FC = () => {
  const { squirrelUUID } = useParams<{ squirrelUUID: string }>();

  const { loading, data, error } = useQuery(GET_SINGLE_SQUIRREL, {
    variables: { squirrelUUID },
  });

  if (loading) {
    return (
      <div
        className="flex justify-center p-8"
        style={{ fontFamily: "'Bagel Fat One', cursive", color: "var(--primary)" }}
      >
        Squirrel data is loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center p-8 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  const squirrel = data?.getSingleSquirrel;

  return (
    <div className="container mx-auto p-4">
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
        <h4 className="text-center">
          That squirrel does not live in Central Park! Head back to explore others.
        </h4>
      )}
    </div>
  );
};

export default Profile;
