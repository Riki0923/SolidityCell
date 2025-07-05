import axios from "axios";

// --- PASTE YOUR NEW SUBGRAPH's QUERY URL HERE ---
const MY_SUBGRAPH_URL = "https://api.studio.thegraph.com/query/115550/solidity-cell/version/latest";

async function getFirstAdvancement() {
  // This query gets the `toCell` value from the very first event emitted
  const query = `{
    playerAdvanceds(first: 1, orderBy: blockTimestamp, orderDirection: asc) {
      toCell
    }
  }`;
  
  try {
    const response = await axios.post(MY_SUBGRAPH_URL, { query });
    if (response.data.errors) {
      console.error("GraphQL Error:", response.data.errors);
      return "GraphQL Error";
    }

    const advancements = response.data.data.playerAdvanceds;
    if (!advancements.length) {
      console.error("No playerAdvanceds found.");
      return "No data";
    }

    return advancements[0].toCell;
  } catch (error) {
    console.error("Network Error:", (error as Error).message);
    return "Error";
  }
}

async function main() {
  console.log("🔍 Fetching answer from your custom subgraph...");
  const answer = await getFirstAdvancement();
  console.log("------------------------------------");
  console.log("Answer (First 'toCell' value):", answer);
  console.log("------------------------------------");
}

main().catch(error => { console.error(error); });