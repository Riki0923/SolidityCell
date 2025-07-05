// scripts/hashForCell1.ts
import { encodeAbiParameters, keccak256, parseAbiParameters } from "viem";

const encoded = encodeAbiParameters(
  parseAbiParameters("string, uint256, address"),
  ["Correctly", BigInt(123), "0x6fA26735bDCD8D598f6F1384Fc59F0180e903101"]
);

console.log("Hash:", keccak256(encoded));