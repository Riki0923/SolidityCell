# Hardhat 3 Alpha: `node:test` and `viem` example project

> **WARNING**: This example project uses Hardhat 3, which is still in development. Hardhat 3 is not yet intended for production use.

Welcome to the Hardhat 3 alpha version! This project showcases some of the changes and new features coming in Hardhat 3.

To learn more about the Hardhat 3 Alpha, please visit [its tutorial](https://hardhat.org/hardhat3-alpha). To share your feedback, join our [Hardhat 3 Alpha](https://hardhat.org/hardhat3-alpha-telegram-group) Telegram group or [open an issue](https://github.com/NomicFoundation/hardhat/issues/new?template=hardhat-3-alpha.yml) in our GitHub issue tracker.

## Project Overview

The Project name is Solidity Cell, an onchain escape Game, for project description and how it's built you can check it on this page: ETHGLOBAL one HAVE TO ADD THIS BEORE SUBMISSION

HOW to use this project step-by-step:

After you cloned the repo to your computer, run npm install and set up your env file:

env file should contain the following:

PRIVATE_KEY=
BASE_SEPOLIA_RPC_URL=
ETHERSCAN_API_KEY=
MANTLE_SEPOLIA_RPC_URL= 
ZERO_G_PRIVATE_KEY=

THE PRIVATE_KEY and ZERO_G_PRIVATE_KEY are the same, but add it twice, later it is going to be fixed. 

MANTLE_SEPOLIA_RPC_URL you do not really need, just left it there because the project works on there too. 

Once you have those environment variables, you can start compiling && deploying

run: npx hardhat compile --buildProfile production ( needed for hardhat v3 verification )

run this command: npx hardhat run scripts/deployAndVeriy.ts --buildProfile production --network baseSepolia

the above command will deploy the two contracts (ProofOfEscape.sol and Soliditycell.sol)

You will need tokens on baseSepolia to run the transactions but also to use 0g AI you need their tokens as well, otherwise you won't be able to use their tool. You can request 0g tokens here: https://docs.0g.ai/developer-hub/testnet/testnet-overview

Once you have those you can start the game:

run: npx hardhat run scripts/solvingFirstCell.ts --network baseSepolia

This will start the first puzzle which the user has to solve, if stuck, 0G AI will help. 

There is a helper function implemented, the hashForCell1.ts, that is containing the correct answer for Cell1. You can run it with this command: npx hardhat run scripts/hashForCell1.ts ( DO NOT FORGET TO CHANGE THE ADDRESS IN HERE TO YOURS!!!)

For second puzzle, run: npx hardhat run scripts/solvingSecondCell.ts --network baseSepolia

To solve this you will need to run the graph scripts, the getSubgraphAnswer.ts will contain the answer for the two first question, just simply run it, the third one you will need to create a subgraph of your own, but for now use the one builded in the getMySubgraphAnswer.ts file and just run it like the others: npx hardhat run scripts/getMySubgraphAnswer.ts

I will leave the correct answers just in case here:

- 0x63dED784c8Da63A79eE47f9a53BcB1BAD1d9F3e0 (new Owner address)
- 60975000 (USDC amount)
- 1 (For the own subgraph )

If you pass these values, you will get to the third cell

Last but not least, run the third cell: npx hardhat run scripts/solvingThirdCell.ts --network baseSepolia

You will get a riddle here, implemented this for fun, the answer here is Knowledge.

Once you done this the Nft should minted to your address and you can check it.

HAVE FUN WITH THE GAME 
