'use client'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

// Launchpad contract ABI (minimal for frontend)
const LAUNCHPAD_ABI = [
  {
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { name: 'maxSupply', type: 'uint256' },
      { name: 'mintPrice', type: 'uint256' },
      { name: 'baseURI', type: 'string' }
    ],
    name: 'createNFTProject',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'nftContract', type: 'address' },
      { name: 'tokenURI', type: 'string' }
    ],
    name: 'mintNFT',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ name: 'nftContract', type: 'address' }],
    name: 'getProjectInfo',
    outputs: [
      { name: 'nftContract', type: 'address' },
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { name: 'maxSupply', type: 'uint256' },
      { name: 'mintPrice', type: 'uint256' },
      { name: 'isActive', type: 'bool' },
      { name: 'baseURI', type: 'string' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAllDeployedNFTs',
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const

export function useLaunchpadContract(contractAddress?: string) {
  // Deploy collection
  const {
    data: deployData,
    writeContract: deployCollection,
    isPending: isDeploying,
    error: deployError
  } = useWriteContract()

  // Mint NFT
  const {
    data: mintData,
    writeContract: mintNFT,
    isPending: isMinting,
    error: mintError
  } = useWriteContract()

  // Get all collections
  const {
    data: allCollections,
    isLoading: isLoadingCollections,
    error: collectionsError
  } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: LAUNCHPAD_ABI,
    functionName: 'getAllDeployedNFTs',
  })

  // Get collection info
  const getCollectionInfo = (collectionAddress: string) => {
    return useReadContract({
      address: contractAddress as `0x${string}`,
      abi: LAUNCHPAD_ABI,
      functionName: 'getProjectInfo',
      args: [collectionAddress as `0x${string}`],
    })
  }

  // Wait for deploy transaction
  const {
    isLoading: isDeployConfirming,
    isSuccess: isDeploySuccess,
    error: deployConfirmError
  } = useWaitForTransactionReceipt({
    hash: deployData,
  })

  // Wait for mint transaction
  const {
    isLoading: isMintConfirming,
    isSuccess: isMintSuccess,
    error: mintConfirmError
  } = useWaitForTransactionReceipt({
    hash: mintData,
  })

  return {
    // Deploy functions
    deployCollection: (params: {
      name: string
      symbol: string
      maxSupply: bigint
      mintPrice: string
      baseURI: string
    }) => {
      const priceWei = parseEther(params.mintPrice)
      return deployCollection({
        address: contractAddress as `0x${string}`,
        abi: LAUNCHPAD_ABI,
        functionName: 'createNFTProject',
        args: [params.name, params.symbol, params.maxSupply, priceWei, params.baseURI]
      })
    },
    isDeploying,
    isDeployConfirming,
    isDeploySuccess,
    deployError: deployError || deployConfirmError,

    // Mint functions
    mintNFT: (params: {
      collectionAddress: string
      tokenURI: string
      mintPrice: string
    }) => {
      const priceWei = parseEther(params.mintPrice)
      return mintNFT({
        address: contractAddress as `0x${string}`,
        abi: LAUNCHPAD_ABI,
        functionName: 'mintNFT',
        args: [params.collectionAddress as `0x${string}`, params.tokenURI],
        value: priceWei
      })
    },
    isMinting,
    isMintConfirming,
    isMintSuccess,
    mintError: mintError || mintConfirmError,

    // Read functions
    allCollections,
    isLoadingCollections,
    collectionsError,
    getCollectionInfo,
  }
}
