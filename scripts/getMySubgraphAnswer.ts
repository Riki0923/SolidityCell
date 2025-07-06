import axios from "axios";

// --- Replace with your actual subgraph URL ---
const SUBGRAPH_URL = "https://api.studio.thegraph.com/query/115550/solidity-cell/version/latest";

async function getFirstToCellValue(): Promise<string> {
  const query = `
    {
      playerAdvanceds(first: 1, orderBy: blockTimestamp, orderDirection: asc) {
        toCell
      }
    }
  `;

  try {
    const { data } = await axios.post(SUBGRAPH_URL, { query });

    if (data.errors) {
      console.error("❌ GraphQL Error:", data.errors);
      return "GraphQL Error";
    }

    const events = data.data.playerAdvanceds;

    if (!events.length) {
      console.warn("⚠️ No playerAdvanceds events found in subgraph.");
      return "No data";
    }

    return events[0].toCell;

  } catch (err: any) {
    console.error("❌ Network or Query Error:", err.message);
    return "Error";
  }
}

async function main() {
  console.log("🔍 Querying your custom subgraph...");
  
  const result = await getFirstToCellValue();

  console.log("\n====================================");
  console.log("📦 First `toCell` Value:", result);
  console.log("====================================\n");
}

main().catch((err) => {
  console.error("Unhandled Error:", err);
  process.exit(1);
});
