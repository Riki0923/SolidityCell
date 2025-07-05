import axios from "axios";

// The base URL for the Super Accounts subgraph
const SUPER_ACCOUNTS_BASE_URL = "https://gateway.thegraph.com/api/f41765b2dfae639b1e940b4c604146c1/subgraphs/id/A8Hs1ciwnqsdR8owyFZ77GM5PEXpQBqUTEUpNcnUS6xt";

// --- Query Functions ---

async function getGraphQLAnswer() {
    const query = `{
    ownerAddeds(first: 1) {
      newOwner
    }
  }`;

    try {
        const response = await axios.post(SUPER_ACCOUNTS_BASE_URL, { query });
        if (response.data.errors) {
            console.error("GraphQL Error:", response.data.errors);
            return "GraphQL Error";
        }
        return response.data.data.ownerAddeds[0].newOwner;
    } catch (error) {
        console.error("Network Error (GraphQL):", (error as Error).message);
        return "Network Error";
    }
}

async function getRestApiAnswer() {
    const address = '0x6fA26735bDCD8D598f6F1384Fc59F0180e903101';
    const apiKey = 'eyJhbGciOiJLTVNFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3ODc3NDE2ODAsImp0aSI6IjJiMmE0YmE5LTcxNGQtNDZiZC04MmUwLWMwNzMwYzdmODViOCIsImlhdCI6MTc1MTc0MTY4MCwiaXNzIjoiZGZ1c2UuaW8iLCJzdWIiOiIwY2FtbzE1NTNhYzRlNmU3ZDc0ZDEiLCJ2IjoxLCJha2kiOiI2M2Y2YmY5MDNkNTkyYTU0ZmRkMjViYjk3YmFkZThjMDIxN2E4Yzc3OTZlY2E1YzE1NzJiZTY4MGJkMGY0MzIyIiwidWlkIjoiMGNhbW8xNTUzYWM0ZTZlN2Q3NGQxIn0.GV2cFroDgQWuW-vLoqy7KxiBMzV23iM2t-Q_aqDLlgIXZKR47L_7zuAnhIZV7vnT-9Ta4De2YucRIBz0-iTLjA';
    const url = `https://token-api.thegraph.com/balances/evm/${address}`;
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
    };

    try {
        // Use axios to make the GET request
        const response = await axios.get(url, config);
        
        // Find the token with the symbol 'USDC' in the data array
        const usdcToken = response.data.data.find((token: any) => token.symbol === 'USDC');

        if (usdcToken) {
            // Return the amount if the token is found
            return usdcToken.amount;
        } else {
            return "USDC not found in response";
        }
    } catch (error) {
        console.error("Network Error (REST):", (error as Error).message);
        return "REST API Error";
    }
}

function getSubstreamAnswer() {
    return "0xa0712d68";
}

// --- Main Execution ---

async function main() {
    console.log("🔍 Fetching answers for Cell #2...");
    console.log("------------------------------------");

    // Call both functions to get the separate answers
    const [answer1, answer2, answer3] = await Promise.all([
        getGraphQLAnswer(),
        getRestApiAnswer(),
        getSubstreamAnswer(),
    ]);

    console.log("Answer 1 (GraphQL - newOwner):", answer1);
    console.log("Answer 2 (REST API - USDC Amount):", answer2);
    console.log("Answer 3 (Substream - Gas Guzzler):", answer3);

    console.log("------------------------------------");
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});