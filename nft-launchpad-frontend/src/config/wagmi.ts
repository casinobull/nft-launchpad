import { http, createConfig } from 'wagmi'
import { sepolia, mainnet } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// Get chain ID from environment, default to Sepolia
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111')

// Select chain based on environment variable
const getChain = () => {
  switch (CHAIN_ID) {
    case 11155111: // Sepolia
      return sepolia
    case 1: // Mainnet
      return mainnet
    default:
      return sepolia // Default to Sepolia
  }
}

const selectedChain = getChain()

export const config = createConfig({
  chains: [selectedChain],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your-project-id',
    }),
  ],
  transports: {
    [selectedChain.id]: http(),
  } as any,
  ssr: false, // Disable SSR for better client-side handling
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
