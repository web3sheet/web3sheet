'use client'

import { UserProvider } from '@/lib/user'
import { createWeb3WalletConfig } from '@web3sheet/core/lib/config'
import { QueryProvider } from '@web3sheet/core/providers/query-provider'
import type { WagmiCookie } from '@web3sheet/core/providers/wagmi-provider'
import { WalletProvider } from '@web3sheet/core/providers/wallet-provider'
import type { ReactNode } from 'react'
import { arbitrum, arbitrumSepolia, mainnet, sepolia } from 'viem/chains'

type GlobalProviderParams = {
  wagmiCookie?: WagmiCookie
  children: ReactNode
}

const config = createWeb3WalletConfig({
  wagmiConfig: {
    chains: [mainnet, arbitrum, sepolia, arbitrumSepolia],
  },
  walletConnectConfig: {
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  },
  metaMaskConfig: {
    dappMetadata: {
      name: 'Web3Wallet Demo',
      url: 'http://localhost:3000',
    },
  },
})

export function GlobalProvider({ wagmiCookie, children }: GlobalProviderParams) {
  return (
    <UserProvider>
      <WalletProvider config={config} wagmiCookie={wagmiCookie} debug={true}>
        <QueryProvider>{children}</QueryProvider>
      </WalletProvider>
    </UserProvider>
  )
}
