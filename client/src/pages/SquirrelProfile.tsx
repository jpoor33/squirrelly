import { useQuery } from "@apollo/client";
import { GET_SINGLE_SQUIRREL } from "@/utils/queries";
import { useParams } from "react-router-dom";
import SquirrelProfile from "@/components/SquirrelProfile";
import SquirrelComments from "@/components/Comment";
import CommentForm from "@/components/CommentForm";

const Profile: React.FC = () => {

    const { loading, data } = useQuery(GET_SINGLE_SQUIRREL, {
        variables: { _id: id },
    });

    const squirrel = data?.getSingleSquirrel || {};

    //squirrel name is returning undefined?
    console.log("Squirrel Name:", squirrel.squirrelName);

    console.log(squirrel);

    if (loading) {
        return <div
        className="flex justify-center p-8"
        style={{ fontFamily: "'Bagel Fat One', cursive", color: "var(--primary)" }}
      >
        Squirrel data is loading...
      </div>
    };
        
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
          <SquirrelComments comments={squirrel.comments} />
                    <CommentForm />
      ) : (
        <h4 className="text-center">
          That squirrel does not live in Central Park! Head back to explore others.
        </h4>
      )}
    </div>
  );
};

export default Profile;
