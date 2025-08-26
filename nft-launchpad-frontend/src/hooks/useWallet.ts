'use client'

import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi'
import { useCallback } from 'react'
import { SiweMessage } from 'siwe'
import { authAPI } from '@/utils/api'

// Get chain ID from environment, default to Sepolia
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111')

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const isCorrectNetwork = chainId === CHAIN_ID

  const connectWallet = useCallback(async (connectorId: number) => {
    try {
      console.log('Connecting with connector:', connectors[connectorId])
      
      // This should trigger the wallet connection modal
      const result = await connect({ connector: connectors[connectorId] })
      console.log('Connection result:', result)
      
      return result
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      throw error
    }
  }, [connect, connectors])

  const switchToCorrectNetwork = useCallback(async () => {
    if (switchChain) {
      try {
        await switchChain({ chainId: CHAIN_ID as any })
      } catch (error) {
        console.error('Failed to switch to correct network:', error)
        throw error
      }
    }
  }, [switchChain])

  const signInWithEthereum = useCallback(async () => {
    if (!address) {
      throw new Error('Wallet not connected')
    }

    if (!isCorrectNetwork) {
      throw new Error(`Please switch to the correct network (Chain ID: ${CHAIN_ID})`)
    }

    try {
      // Create SIWE message
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to access the NFT Launchpad.',
        uri: window.location.origin,
        version: '1',
        chainId: CHAIN_ID,
        nonce: Math.random().toString(36).substring(2, 15),
      })

      // Get the message to sign
      const messageToSign = message.prepareMessage()

      // Request signature from wallet
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [messageToSign, address],
      })

      // Send to backend for verification
      const response = await authAPI.siwe(messageToSign, signature)
      
      // Store the token
      localStorage.setItem('auth_token', response.token)
      
      return response
    } catch (error) {
      console.error('SIWE failed:', error)
      throw error
    }
  }, [address, isCorrectNetwork])

  const signOut = useCallback(() => {
    localStorage.removeItem('auth_token')
    disconnect()
  }, [disconnect])

  return {
    address,
    isConnected,
    isCorrectNetwork,
    chainId: CHAIN_ID,
    isPending,
    connectWallet,
    disconnect: signOut,
    switchToCorrectNetwork,
    signInWithEthereum,
    connectors,
  }
}
