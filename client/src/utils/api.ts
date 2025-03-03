import { GET_SQUIRRELS } from "./queries";

export const fetchSquirrels = async () => {
    const response = await fetch("http://localhost:3001/graphql",{
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({query: GET_SQUIRRELS}),
    });

    const { data } = await response.json();
    return data.getSquirrels;
}