import axios from "axios";


// The stable endpoint for the Super Accounts subgraph on Optimism

const SUPER_ACCOUNTS_URL = "https://gateway.thegraph.com/api/f41765b2dfae639b1e940b4c604146c1/subgraphs/id/A8Hs1ciwnqsdR8owyFZ77GM5PEXpQBqUTEUpNcnUS6xt";


async function getSuperAccountsAnswers() {

// CORRECTED: Simplified the query to remove the invalid sorting parameter

const query = `{

ownerAddeds(first: 1) {

newOwner

superChainId

}

}`;

try {

console.log("Querying stable Super Accounts subgraph...");

const response = await axios.post(SUPER_ACCOUNTS_URL, { query });

console.log(response)


if (response.data.errors) {

console.error("GraphQL Error:", response.data.errors);

return { answer1: "GraphQL Error", answer2: "GraphQL Error" };

}


const firstEvent = response.data.data.ownerAddeds[0];

return {

answer1: firstEvent.newOwner,

answer2: firstEvent.superChainId,

};

} catch (error) {

console.error("Network Error:", (error as Error).message);

return { answer1: "Network Error", answer2: "Network Error" };

}

}


function getSubstreamAnswer() {

return "0xa0712d68";

}


async function main() {

console.log("🔍 Fetching answers for Cell #2...");

console.log("------------------------------------");


const { answer1, answer2 } = await getSuperAccountsAnswers();

const answer3 = getSubstreamAnswer();


console.log("Answer 1 (Super Accounts New Owner):", answer1);

console.log("Answer 2 (Super Accounts Chain ID):", answer2);

console.log("Answer 3 (Substream Gas Guzzler):", answer3);

console.log("------------------------------------");

}


main().catch(error => {

console.error(error);

process.exitCode = 1;

});

