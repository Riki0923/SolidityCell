'use client';

import { useRouter } from 'next/navigation'; // 1. Import the hook

export default function Cell3() {
  const router = useRouter(); // 2. Initialize the router

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="w-full max-w-3xl text-center fade-in">
        <h2 className="text-3xl font-bold mb-2">Cell #3: The Hardware Lock</h2>
        <p className="text-gray-400 mb-6">The final lock cannot be opened with a simple transaction. It requires a specific EIP-712 signature generated from a hardware wallet.</p>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
          <p className="text-lg mb-4">You must use the `solveWithLedger.html` tool to generate the signature.</p>
          <a href="/solveWithLedger.html" target="_blank" className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
            Open Ledger Solver
          </a>
          <hr className="my-6 border-gray-600" />
          {/* 3. Add the onClick event to a new button */}
          <button 
            onClick={() => router.push('/congratulations')}
            className="w-full px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            I Have Solved It, Proceed to Final Step
          </button>
        </div>
      </div>
    </div>
  );
}