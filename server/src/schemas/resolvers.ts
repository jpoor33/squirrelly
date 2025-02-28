const APP_TOKEN = process.env.APP_TOKEN as string;

const resolvers = {
    Query: {
        getSquirrels: async() => {
            try {
                const response = await fetch("https://data.cityofnewyork.us/resource/vfnx-vebw.json", {
                    headers: {
                        "X-App-Token": APP_TOKEN,
                    },
                });

                if (!response.ok) {
                    throw new Error("failed API repsonse")
                }

                const squirrels: any[] = await response.json();

                return squirrels.map((squirrel:any) => ({
                    squirrelUUID: squirrel.unique_squirrel_id,
                    squirrelName: "Unknown",
                    primaryFurColor: squirrel.primary_fur_color || "Unknown",
                    age: squirrel.age || "Unknown",
                    actions: {
                        running: squirrel.running === "true" || squirrel.running === true,
                        chasing: squirrel.chasing === "true" || squirrel.chasing === true,
                        eating: squirrel.eating === "true" || squirrel.eating === true,
                        foraging: squirrel.foraging === "true" || squirrel.foraging === true,
                        climbing: squirrel.climbing === "true" || squirrel.climbing === true,
                    },
                    location: squirrel.location || "Unknown",


                }));
            } catch (error) {
                console.error ("Error getting squirrels",error);
                throw new Error("Failed to get squirrels");
            }
        },
    },
}

export default resolvers;
    
      