'use client'

import { coinbaseWallet, metaMask, walletConnect } from '@wagmi/connectors'
import { createClient } from 'viem'
import {
  http,
  type CreateConnectorFn,
  type Storage,
  type Config as WagmiConfig,
  cookieStorage,
  createConfig,
  createStorage,
} from 'wagmi'
import type { MetaMaskConfig } from './config'
import type { WalletConnectConfig } from './eth'

export type CreateWeb3WalletWagmiConfigParams = {
  chains: WagmiConfig['chains']
  overrideConnectors?: CreateConnectorFn[]
  additionalConnectors?: CreateConnectorFn[]
  overrideStorage?: Storage
  ssr?: boolean
}

export type Web3WalletWagmiConfig = WagmiConfig

export const createWeb3WalletWagmiConfig = ({
  walletConnectConfig,
  metaMaskConfig,
  wagmiConfig: {
    chains,
    overrideConnectors,
    overrideStorage,
    additionalConnectors = [],
    ssr = true,
  },
}: {
  walletConnectConfig?: WalletConnectConfig
  metaMaskConfig?: MetaMaskConfig
  wagmiConfig: CreateWeb3WalletWagmiConfigParams
}): Web3WalletWagmiConfig => {
  const connectors: CreateConnectorFn[] = [coinbaseWallet()]

  if (metaMaskConfig) connectors.push(metaMask(metaMaskConfig))
  if (walletConnectConfig) connectors.push(walletConnect(walletConnectConfig))
  connectors.concat(additionalConnectors)

  return createConfig({
    chains,
    ssr,
    connectors: overrideConnectors ?? connectors,
    client({ chain }) {
      return createClient({ chain, transport: http() })
    },
    storage:
      overrideStorage ??
      createStorage({
        storage: cookieStorage,
      }),
  })
}
