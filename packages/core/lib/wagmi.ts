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
  createStorage, type CreateConfigParameters,
} from 'wagmi';
import type { MetaMaskConfig } from './config';
import type { WalletConnectConfig } from './eth'

export type SupportedWagmiConfig = Pick<CreateConfigParameters, 'chains' | 'transports' | 'ssr'>

export type CreateWeb3WalletWagmiConfigParams = SupportedWagmiConfig & {
  overrideConnectors?: CreateConnectorFn[]
  additionalConnectors?: CreateConnectorFn[]
  overrideStorage?: Storage
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
    transports,
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
    ...(transports
      ? { transports }
      : {
          client({ chain }) {
            return createClient({ chain, transport: http() });
          },
        }),
    storage:
      overrideStorage ??
      createStorage({
        storage: cookieStorage,
      }),
  });
}
