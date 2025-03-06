import { useQuery } from "@apollo/client";
import { GET_SINGLE_SQUIRREL } from "@/utils/queries";
import { useParams } from "react-router-dom";
import SquirrelProfile from "@/components/SquirrelProfile";
import { squirrelImages } from "@/utils/squirrelImages";
import { faker } from "@faker-js/faker";
import { useMemo } from "react";

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, data } = useQuery(GET_SINGLE_SQUIRREL, {
    variables: { _id: id },
  });

  const randomBio = useMemo(() => faker.lorem.paragraph(), []);

  if (loading) {
    return (
      <div
        className="flex justify-center p-8"
        style={{
          fontFamily: "'Bagel Fat One', cursive",
          color: "var(--primary)",
        }}
      >
        Squirrel data is loading...
      </div>
    );
  }

  const squirrel = data?.getSingleSquirrel || {};

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <main className="mb-8">
        {squirrel.squirrelName ? (
          <SquirrelProfile
          squirrelUUID={squirrel.squirrelUUID}
          squirrelName={squirrel.squirrelName}
          primaryFurColor={squirrel.primaryFurColor}
          age={squirrel.age}
          location={squirrel.location}
          actions={squirrel.actions}
          squirrelImage={
            squirrelImages[Math.floor(Math.random() * squirrelImages.length)]
          }
          isFavorited={squirrel.isFavorited}
          onToggleFavorite={(uuid: string) => console.log("Toggle favorite for", uuid)}
        />
        ) : (
          <p className="text-center text-gray-600">
            That squirrel does not live in Central Park! Head back to explore
            others.
          </p>
        )}
      </main>
      <section className="mb-8 px-4">
        <h2 className="text-2xl font-bold text-center mb-4">About This Squirrel</h2>
        <p className="text-lg text-gray-700 text-center">{randomBio}</p>
      </section>
    </div>
  );
};

export default Profile;
