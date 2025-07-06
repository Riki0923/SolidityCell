import axios from "axios";

// --- CONSTANTS ---
const SUPER_ACCOUNTS_SUBGRAPH_URL =
  "https://gateway.thegraph.com/api/f41765b2dfae639b1e940b4c604146c1/subgraphs/id/A8Hs1ciwnqsdR8owyFZ77GM5PEXpQBqUTEUpNcnUS6xt";

const USER_ADDRESS = "0x6fA26735bDCD8D598f6F1384Fc59F0180e903101";
const GRAPH_API_KEY = "eyJhbGciOiJLTVNFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3ODc3NDE2ODAsImp0aSI6IjJiMmE0YmE5LTcxNGQtNDZiZC04MmUwLWMwNzMwYzdmODViOCIsImlhdCI6MTc1MTc0MTY4MCwiaXNzIjoiZGZ1c2UuaW8iLCJzdWIiOiIwY2FtbzE1NTNhYzRlNmU3ZDc0ZDEiLCJ2IjoxLCJha2kiOiI2M2Y2YmY5MDNkNTkyYTU0ZmRkMjViYjk3YmFkZThjMDIxN2E4Yzc3OTZlY2E1YzE1NzJiZTY4MGJkMGY0MzIyIiwidWlkIjoiMGNhbW8xNTUzYWM0ZTZlN2Q3NGQxIn0.GV2cFroDgQWuW-vLoqy7KxiBMzV23iM2t-Q_aqDLlgIXZKR47L_7zuAnhIZV7vnT-9Ta4De2YucRIBz0-iTLjA";

// --- FETCH FROM GRAPHQL SUBGRAPH ---
async function getGraphQLAnswer(): Promise<string> {
  const query = `
    {
      ownerAddeds(first: 1) {
        newOwner
      }
    }
  `;

  try {
    const response = await axios.post(SUPER_ACCOUNTS_SUBGRAPH_URL, { query });

    if (response.data.errors) {
      console.error("❌ GraphQL Error:", response.data.errors);
      return "GraphQL Error";
    }

    const owner = response.data.data.ownerAddeds[0]?.newOwner;
    return owner || "No newOwner found.";
  } catch (error) {
    console.error("❌ Network Error (GraphQL):", (error as Error).message);
    return "Network Error";
  }
}

// --- FETCH FROM REST TOKEN API ---
async function getRestApiAnswer(): Promise<string> {
  const url = `https://token-api.thegraph.com/balances/evm/${USER_ADDRESS}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${GRAPH_API_KEY}`,
      },
    });

    const usdcToken = response.data.data.find((token: any) => token.symbol === "USDC");
    return usdcToken?.amount ?? "USDC not found.";
  } catch (error) {
    console.error("❌ Network Error (REST):", (error as Error).message);
    return "REST API Error";
  }
}

// --- MAIN ---
async function main() {
  console.log("========================================");
  console.log("        FETCHING ANSWERS FOR CELL #2     ");
  console.log("========================================\n");

  const [answer1, answer2] = await Promise.all([
    getGraphQLAnswer(),
    getRestApiAnswer(),
  ]);

  console.log("✅ Answer 1 (GraphQL - newOwner):", answer1);
  console.log("✅ Answer 2 (REST API - USDC amount):", answer2);

  console.log("\n🧩 Use these answers in to pass CELL #2.");
  console.log("----------------------------------------\n");
}

main().catch((err) => {
  console.error("💥 Fatal error:", err);
  process.exit(1);
});
