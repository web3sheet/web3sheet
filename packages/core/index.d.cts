import type { metaMask } from '@wagmi/connectors'
import type { EthereumProviderOptions } from '@walletconnect/ethereum-provider'
import type { Address, Chain } from 'viem'
import type {
  Config,
  CreateConnectorFn,
  Storage,
  useChains,
  useConfig,
  useConnect,
  useSwitchChain,
} from 'wagmi'

type UseWalletType = {
  /** The address of the wallet. */
  address?: Address
  /** The resolved name of the wallet */
  resolvedName?: string
  /** The ENS name of the wallet. */
  ensName?: string | null
  /** The ENS avatar of the wallet. */
  ensAvatar?: string | null
  /** The .arb name of the wallet. */
  arbName?: string | null
  /** The chain id of the wallet. */
  chainId?: number
  nativeBalance: bigint | null
  nativeBalanceDecimals: number | null
  nativeBalanceSymbol: string | null
  /** Whether the wallet is connected. */
  isConnected: boolean
  /** Disconnect the wallet. */
  disconnect: () => void
  chain?: Chain
  chains: ReturnType<typeof useChains>
  switchChain: ReturnType<typeof useSwitchChain>['switchChain']
  connect: ReturnType<typeof useConnect>['connect']
  connectors: ReturnType<typeof useConnect>['connectors']
  config: ReturnType<typeof useConfig>
}
declare function useWallet(): UseWalletType

type WalletConnectMetadata = EthereumProviderOptions['metadata']
type WalletConnectConfig = {
  /** Your project ID obtained from WalletConnect Cloud: https://cloud.walletconnect.com/ */
  projectId: string
  /** Your applications metadata. It is important to set the correct URL as this will later be used by the Verify API to check if your domain has been verified. */
  walletConnectMetadata?: WalletConnectMetadata
  /** Defaults to true */
  showQrModal?: boolean
}

type CreateWeb3WalletWagmiConfigParams = {
  chains: Config['chains']
  overrideConnectors?: CreateConnectorFn[]
  additionalConnectors?: CreateConnectorFn[]
  overrideStorage?: Storage
  ssr?: boolean
}

type MetaMaskConfig = Parameters<typeof metaMask>[0]
type CreateWeb3WalletConfigParams = {
  wagmiConfig: CreateWeb3WalletWagmiConfigParams
  walletConnectConfig?: WalletConnectConfig
  metaMaskConfig?: MetaMaskConfig
}
type Web3WalletConfig = {
  wagmiConfig: Config
  walletConnectConfig?: WalletConnectConfig
  metaMaskConfig?: MetaMaskConfig
}
declare const createWeb3WalletConfig: ({
  wagmiConfig,
  walletConnectConfig,
  metaMaskConfig,
}: CreateWeb3WalletConfigParams) => Web3WalletConfig

export { createWeb3WalletConfig, useWallet }
