'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="w-full max-w-2xl text-center fade-in">
        <h1 className="text-5xl font-bold mb-4">Solidity Cell</h1>
        <p className="text-xl text-gray-400 mb-8">The On-Chain Escape Room for Developers</p>
        
        <div className="flex mb-12 text-center justify-center">
          <ConnectButton />
        </div>

        {isConnected && (
          <Link 
            href="/cell-1" 
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-xl"
          >
            Start Challenge
          </Link>
        )}
      </div>
    </main>
  );
}