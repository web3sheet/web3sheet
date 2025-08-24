import type { metaMask, safe } from '@wagmi/connectors'
import type { Web3WalletComponentLibrary } from '@web3sheet/ui/lib/library'
import type { Config as WagmiConfig } from 'wagmi'
import type { DynamicTokenRowProps, TokenDetails } from '../hooks/useWallet'
import type { WalletConnectConfig } from './eth'
import { type CreateWeb3WalletWagmiConfigParams, createWeb3WalletWagmiConfig } from './wagmi'

export type MetaMaskConfig = Parameters<typeof metaMask>[0]

export type CreateWeb3WalletConfigParams = {
  wagmiConfig: CreateWeb3WalletWagmiConfigParams
  walletConnectConfig?: WalletConnectConfig
  metaMaskConfig?: MetaMaskConfig
}

export type Web3WalletConfig = {
  wagmiConfig: WagmiConfig
  componentLibrary?: Partial<Web3WalletComponentLibrary>
  walletConnectConfig?: WalletConnectConfig
  metaMaskConfig?: MetaMaskConfig
  tokens?: Array<TokenDetails | DynamicTokenRowProps>
}

export const createWeb3WalletConfig = ({
  wagmiConfig,
  walletConnectConfig,
  metaMaskConfig,
}: CreateWeb3WalletConfigParams): Web3WalletConfig => {
  return {
    wagmiConfig: createWeb3WalletWagmiConfig({
      wagmiConfig,
      walletConnectConfig,
      metaMaskConfig,
    }),
    walletConnectConfig,
    metaMaskConfig,
  }
}
