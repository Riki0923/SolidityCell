'use client';

import { useAccount, useReadContract } from 'wagmi';

// --- IMPORTANT ---
// 1. Get this from your deployedAddresses.json file
const contractAddress = '0x80b871df504978707de1745357493a67ce3d61a0'; 

// 2. Get this from your artifacts/contracts/SolidityCell.sol/SolidityCell.json file
const contractAbi = [ {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "playerProgress",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }, ];

export default function PlayerStatus() {
  const { address } = useAccount();

  const { data: progress, isLoading } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'playerProgress',
    args: [address],
  });

  if (isLoading) {
    return <div>Loading player status...</div>;
  }

  const currentCell = Number(progress);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Dashboard</h2>
      <p className="mb-2">
        <span className="text-gray-400">Status:</span> 
        <span className="font-mono p-1 bg-gray-700 rounded">
          {currentCell > 0 ? `Advanced to Cell #${currentCell}` : 'At the entrance (Cell #0)'}
        </span>
      </p>
      <p>
        <span className="text-gray-400">Wallet:</span> 
        <span className="font-mono p-1 bg-gray-700 rounded">{address}</span>
      </p>
    </div>
  );
}