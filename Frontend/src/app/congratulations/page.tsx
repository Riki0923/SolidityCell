'use client';

export default function Congratulations() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-5xl font-bold text-green-400 mb-4">You Have Escaped!</h1>
        <p className="text-xl text-gray-300 mb-8">You have successfully navigated every cell and proven your mastery. Your Proof of Escape awaits.</p>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
          <p className="text-lg mb-4">Click the button below to mint your unique NFT trophy.</p>
          <button className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors text-xl">
            Mint "Proof of Escape" NFT
          </button>
        </div>
      </div>
    </div>
  );
}