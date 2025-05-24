import { collapseString } from '@web3sheet/util/string'
import { type Dispatch, type ReactNode, type SetStateAction, useMemo } from 'react'
import type { Address, Chain } from 'viem'
import { arbitrum, arbitrumSepolia } from 'viem/chains'
import {
  type Connector,
  useAccount,
  useBalance,
  useChains,
  useConfig,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from 'wagmi'
import { useWalletProvider } from '../providers/wallet-provider'
import { useArbName } from './useArbName'
import { useEns } from './useEns'

export type TokenNetwork = {
  id: number
  name: string
  iconSrc: string
  className?: string
}

export type ChainDetails = {
  id: number
  name: string
  nameFull: string
  testnet: boolean
  nativeCurrency: Chain['nativeCurrency']
  blockExplorerName?: string | undefined
  blockExplorerUrl?: string | undefined
}

export type TokenDetails = {
  name: string
  address?: string;
  iconSrc: string
  network: TokenNetwork
  balance: bigint
  symbol: string
  symbolPrefix?: string
  decimals: number
  children?: ReactNode
  roundingDecimals?: number
  hideIfZero?: boolean
  showAddTokenButton?: boolean
}

export type DynamicTokenRowProps = Pick<
  TokenDetails,
  'name' | 'iconSrc' | 'network' | 'children' | 'roundingDecimals' | 'hideIfZero' | 'showAddTokenButton' | 'symbolPrefix'
> & {
  symbolOverride?: string
  tokenAddress: Address
}

type UseWalletType = {
  /** The address of the wallet. */
  address?: Address
  /** The resolved identifier of the wallet
   * Resolves in descending order of priority:
   * - .arb name (if on an Arbitrum chain)
   * - ENS name
   * - Wallet address
   * */
  resolvedIdentifier: string | null
  /** The resolved identifier of the wallet collapsed to the first 6 and last 4 characters
   * Resolves in descending order of priority:
   * - .arb name (if on an Arbitrum chain)
   * - ENS name
   * - Wallet address
   * */
  resolvedIdentifierShort: string | null
  /** Whether the wallet has a name (.arb name or ENS name) */
  hasName: boolean
  /** The ENS name of the wallet. */
  ensName?: string | null
  /** The ENS avatar of the wallet. */
  ensAvatar?: string | null
  /** The .arb name of the wallet. */
  arbName?: string | null
  /** The chain id the wallet is connected to. */
  chainId?: number
  /** The native balance of the wallet. */
  nativeBalance: {
    /** The atomic native balance of the wallet */
    balance: bigint | null
    /** The number of decimals the native balance has */
    decimals: number | null
    /** The symbol of the native currency */
    symbol: string | null
  }
  /** Whether the wallet is connected. */
  isConnected: boolean
  /** The error of the connection state */
  error: ReturnType<typeof useConnect>['error']
  /** If there is an error in the connection state */
  isError: ReturnType<typeof useConnect>['isError']
  /**
   * The status of the mutation.
   * Will be:
   * - `idle` initial status prior to the mutation function executing.
   * - `pending` if the mutation is currently executing.
   * - `error` if the last mutation attempt resulted in an error.
   * - `success` if the last mutation attempt was successful.
   */
  status: ReturnType<typeof useConnect>['status']
  /** Disconnect the wallet. */
  disconnect: () => void
  /** The chain the wallet is connected to. */
  chain?: Chain
  /** The chains wagmi is set up to support */
  chains: ReturnType<typeof useChains>
  /** Switch the chain the wallet is connected to. */
  switchChain: ReturnType<typeof useSwitchChain>['switchChain']
  /** Switch the chain the wallet is connected to. */
  switchChainAsync: ReturnType<typeof useSwitchChain>['switchChainAsync']
  /** The status of the switch chain mutation */
  switchChainStatus: ReturnType<typeof useSwitchChain>['status']
  /** If there is an error in the switch chain state */
  switchChainIsError: ReturnType<typeof useSwitchChain>['isError']
  /** The error of the switch chain state */
  switchChainError: ReturnType<typeof useSwitchChain>['error']
  /** Connect to a wallet. */
  connect: ReturnType<typeof useConnect>['connect']
  /** The connectors wagmi is set up to support */
  connectors: ReturnType<typeof useConnect>['connectors']
  /** The wagmi config */
  config: ReturnType<typeof useConfig>
  /** The tokens being tracked by the wallet */
  tokens: Array<TokenDetails | DynamicTokenRowProps>
  /** Whether the user sheet is open */
  userSheetOpen: boolean
  /** Set the user sheet open state */
  setUserSheetOpen: Dispatch<SetStateAction<boolean>>
  /** The chain details of the chain the wallet is connected to */
  chainDetails: ChainDetails | null
  /** The connector the wallet is connected with */
  connector?: Connector | null
}

export function useWallet(): UseWalletType {
  const config = useConfig()
  const { address, isConnected, chainId, chain, connector } = useAccount({ config })
  const { disconnect } = useDisconnect({ config })
  const { connect, connectors, status, error, isError } = useConnect({ config })
  const { tokens, userSheetOpen, setUserSheetOpen } = useWalletProvider()

  if (isError) {
    console.error('Error connecting to wallet', error)
  }

  const chains = useChains({ config })
  const {
    switchChain,
    switchChainAsync,
    status: switchChainStatus,
    isError: switchChainIsError,
    error: switchChainError,
  } = useSwitchChain({ config })

  if (switchChainIsError) {
    console.error('Error switching chain', switchChainError)
  }

  // const { disconnect: disconnectMetamaskSdk, connected: connectedMetamaskSdk } =
  //   useDisconnectMetamaskSdk();

  const { data: balanceData } = useBalance({
    config,
    address,
    query: { enabled: isConnected },
  })

  const { ensName, ensAvatar } = useEns({
    config,
    address,
    enabled: isConnected,
  })

  const { arbName } = useArbName({ address })

  const nativeBalance = useMemo(() => {
    return {
      balance: balanceData ? balanceData?.value : null,
      decimals: balanceData ? balanceData?.decimals : null,
      symbol: balanceData ? balanceData?.symbol : null,
    }
  }, [balanceData])

  const { resolvedIdentifier, hasName } = useMemo(() => {
    if (arbName && (chain?.id === arbitrum.id || chain?.id === arbitrumSepolia.id)) {
      return { resolvedIdentifier: arbName, hasName: true }
    }

    if (ensName) {
      return { resolvedIdentifier: ensName, hasName: true }
    }

    if (address) {
      return { resolvedIdentifier: address, hasName: false }
    }

    return { resolvedIdentifier: null, hasName: false }
  }, [arbName, ensName, address, chain])

  const resolvedIdentifierShort = resolvedIdentifier
    ? collapseString(resolvedIdentifier, 6, 4)
    : null

  const chainDetails = useMemo(() => {
    if (!chain) return null
    return {
      id: chain.id,
      name: chain.name,
      nameFull: `${chain?.name ?? 'Unsupported Network'}${chain?.testnet ? ' (Testnet)' : ''}`,
      testnet: chain.testnet ?? false,
      nativeCurrency: chain.nativeCurrency,
      blockExplorerName: chain.blockExplorers?.default?.name,
      blockExplorerUrl: chain.blockExplorers?.default?.url,
    }
  }, [chain])

  return {
    config,
    address,
    resolvedIdentifier,
    resolvedIdentifierShort,
    hasName,
    ensName,
    ensAvatar,
    arbName,
    isConnected,
    connector,
    error,
    isError,
    status,
    disconnect,
    connect,
    connectors,
    chainId,
    chain,
    chainDetails,
    chains,
    switchChain,
    switchChainAsync,
    switchChainStatus,
    switchChainIsError,
    switchChainError,
    tokens,
    userSheetOpen,
    setUserSheetOpen,
    nativeBalance,
  }
}
