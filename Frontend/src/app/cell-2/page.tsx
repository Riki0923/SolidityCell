'use client';

import { useRouter } from 'next/navigation'; // 1. Import the hook

export default function Cell2() {
  const router = useRouter(); // 2. Initialize the router

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="w-full max-w-3xl text-left fade-in">
        <h2 className="text-3xl font-bold mb-2">Cell #2: The Data Oracle</h2>
        <p className="text-gray-400 mb-6">To proceed, you need to query on-chain data using The Graph's ecosystem. Find the correct answers to unlock the path forward.</p>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
          {/* ... all your input fields ... */}
          
          {/* 3. Add the onClick event */}
          <button 
            onClick={() => router.push('/cell-3')}
            className="mt-4 w-full px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            Submit and Proceed to Cell #3
          </button>
        </div>
      </div>
    </div>
  );
}