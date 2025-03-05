import { useMutation, useQuery } from '@apollo/client';
import SearchBar from '@/components/SearchBar';
import SquirrelCard from '@/components/SquirrelCard';
import { GET_SQUIRRELS, GET_USER_FAVORITES} from '@/utils/queries';
import { ADD_FAV_SQUIRREL } from '@/utils/mutations';

interface Squirrel {
  squirrelUUID: string;
  squirrelName: string;
  primaryFurColor: string;
  age: string;
  actions: string[];
  location: string;
}

const SquirrelList: React.FC = () => {
  const username = "pikachu"

  const { loading:squirrelloading, data:squirreldata } = useQuery(GET_SQUIRRELS);

  const { loading:faovritesloading, data: favoritesData,refetch} = useQuery(GET_USER_FAVORITES, {
    variables: { username },
  });

  const [addFavSquirrel] = useMutation(ADD_FAV_SQUIRREL, {
  onCompleted: () => refetch(),
  });

  if (squirrelloading || faovritesloading) {
  return <div>Loading...</div>
 }

  
  const SquirrelArray:Squirrel[] = squirreldata?.getSquirrels || [];
  const userFavorites = favoritesData?.getUserFavorites?.map((sq: {squirrelUUID:string}) => sq.squirrelUUID) || [];

  const handleToggleFavorite = async (squirrelUUID: string) => {
    await addFavSquirrel({ variables: { username, squirrelUUID}});
  };


  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <SearchBar onSearch={(query) => console.log('Search query:', query)} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SquirrelArray.map((squirrel) => (
          <SquirrelCard squirrelUUID={squirrel.squirrelUUID} squirrelName={squirrel.squirrelName} primaryFurColor={squirrel.primaryFurColor} age = {squirrel.age} location = {squirrel.location} actions={squirrel.actions} isFavorited={userFavorites.includes(squirrel.squirrelUUID)} onToggleFavorite={handleToggleFavorite}/>
        ))}
      </div>
    </div>
  );
};

export default SquirrelList;
