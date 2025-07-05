'use client';

import { useRouter } from 'next/navigation'; // 1. Import the hook

export default function Cell1() {
  const router = useRouter(); // 2. Initialize the router

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="w-full max-w-3xl text-left fade-in">
        <h2 className="text-3xl font-bold mb-2">Cell #1: The Mismatched Hash</h2>
        <p className="text-gray-400 mb-6">The contract expects a `keccak256` hash, but the most direct approach seems to fail. The key lies in how the data is packed before hashing.</p>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <label htmlFor="hash-input" className="block text-lg font-semibold mb-2">Question:</label>
          <p className="mb-4">The contract calculates `keccak256(abi.encode("Correctly", 123, msg.sender))`. What is the resulting `bytes32` hash?</p>
          
          <input 
            id="hash-input"
            type="text" 
            placeholder="0x..." 
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* 3. Add the onClick event */}
          <button 
            onClick={() => router.push('/cell-2')}
            className="mt-4 w-full px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            Submit and Proceed to Cell #2
          </button>
        </div>
      </div>
    </div>
  );
}