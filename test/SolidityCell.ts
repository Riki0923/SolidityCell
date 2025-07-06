import { describe, it } from "node:test";
import assert from "node:assert";
import { network } from "hardhat";
import { keccak256, encodeAbiParameters, parseAbiParameters } from "viem";

describe("SolidityCell", async () => {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();
  const wallets = await viem.getWalletClients();
  const user = wallets[0];

  it("should solve Cell #1 with correct hash", async () => {
    const proofNFT = await viem.deployContract("ProofOfEscape");
    const cell = await viem.deployContract("SolidityCell", [proofNFT.address]);

const expectedHash = keccak256(
  encodeAbiParameters(
    parseAbiParameters("string, uint256, address"),
    ["Correctly", BigInt(123), user.account.address]
  )
);

    const tx = await cell.write.solveCell1([expectedHash]);
    const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });

    assert.equal(receipt.status, "success");

    const progress = await cell.read.playerProgress([user.account.address]);
    assert.equal(progress, 1n);
  });

  it("should reject incorrect hash in Cell #1", async () => {
  const proofNFT = await viem.deployContract("ProofOfEscape");
  const cell = await viem.deployContract("SolidityCell", [proofNFT.address]);

  const wrongHash = "0x" + "00".repeat(32) as `0x${string}`;
  let reverted = false;

  try {
    await cell.write.solveCell1([wrongHash]);
  } catch (err) {
    reverted = true;
  }

  assert.ok(reverted, "Expected transaction to revert on wrong hash");
});
});
