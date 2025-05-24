'use client'

import type EthereumProvider from '@walletconnect/ethereum-provider'
import type { Web3WalletComponentLibrary } from '@web3sheet/ui'
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { PreferenceStorage } from 'usepref'
import { mainnet } from 'viem/chains'
import type { State } from 'wagmi'
import type { DynamicTokenRowProps, TokenDetails } from '../hooks/useWallet'
import type { Web3WalletConfig } from '../lib/config'
import { type ArrayOneOrMore, createEthereumProvider } from '../lib/eth'
import { WagmiClientProvider, type WagmiCookie } from './wagmi-provider'

type WalletContext = {
  ethereumProvider: EthereumProvider | null
  userSheetOpen: boolean
  setUserSheetOpen: Dispatch<SetStateAction<boolean>>
  componentLibraryConfig?: Partial<Web3WalletComponentLibrary>
  uiLibrary: Web3WalletComponentLibrary | null
  setUiLibrary: Dispatch<SetStateAction<Web3WalletComponentLibrary | null>>
  tokens: Array<TokenDetails | DynamicTokenRowProps>
  settingsPreferences: PreferenceStorage
}

const Context = createContext<WalletContext | undefined>(undefined)

export type WalletProviderProps = {
  config: Web3WalletConfig
  wagmiCookie?: WagmiCookie
  wagmiInitialState?: State
  settingsPreferenceStorage?: PreferenceStorage
}

export function WalletProvider({
  config,
  wagmiCookie,
  wagmiInitialState,
  settingsPreferenceStorage,
  children,
}: WalletProviderProps & { children: ReactNode }) {
  const [ethereumProvider, setEthereumProvider] = useState<EthereumProvider | null>(null)
  const [userSheetOpen, setUserSheetOpen] = useState<boolean>(false)
  const [uiLibrary, setUiLibrary] = useState<Web3WalletComponentLibrary | null>(null)
  const settingsPreferences = useMemo(() => settingsPreferenceStorage ?? new PreferenceStorage({
    key: 'w3s_settings',
  }), [settingsPreferenceStorage])

  const {
    walletConnectConfig,
    wagmiConfig,
    componentLibrary: componentLibraryConfig,
    tokens,
  } = config

  const chains = useMemo(() => {
    const chainsIdsFromWagmi = wagmiConfig.chains

    if (!chainsIdsFromWagmi.length) {
      console.warn('No chains provided to wallet provider, defaulting to mainnet ethereum')
      return [mainnet]
    }

    return chainsIdsFromWagmi
  }, [wagmiConfig.chains])

  const chainIds = useMemo(
    () => chains.map((chain) => chain.id) as ArrayOneOrMore<number>,
    [chains],
  )

  useEffect(() => {
    if (!ethereumProvider) {
      if (!walletConnectConfig) {
        console.warn(
          'No wallet connect config provided to wallet provider, not initializing ethereum provider',
        )
        return
      }

      void createEthereumProvider({
        walletConnectConfig,
        chains: chainIds,
      }).then((provider) => {
        if (!provider) {
          throw new Error('Failed to create Ethereum provider')
        }
        setEthereumProvider(provider)
      })

    }
  }, [ethereumProvider, chainIds, walletConnectConfig])

  return (
    <Context.Provider
      value={{
        componentLibraryConfig,
        ethereumProvider,
        userSheetOpen,
        setUserSheetOpen,
        uiLibrary,
        setUiLibrary,
        settingsPreferences,
        tokens: tokens ?? [],
      }}
    >
      <WagmiClientProvider
        config={wagmiConfig}
        cookie={wagmiCookie}
        initialState={wagmiInitialState}
      >
        {children}
      </WagmiClientProvider>
    </Context.Provider>
  )
}

export const useWalletProvider = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useWallet must be used inside WalletProvider')
  }

  return context
}

export const useEthereumProvider = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useEthereumProvider must be used inside WalletProvider')
  }

  return context.ethereumProvider
}

export const useWalletSheet = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useEthereumProvider must be used inside WalletProvider')
  }

  return { open: context.userSheetOpen, setOpen: context.setUserSheetOpen }
}

export const useUiLibrary = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useUiLibrary must be used inside WalletProvider')
  }

  if (!context.uiLibrary) {
    throw new Error('useUiLibrary must be called after useSetUiLibrary')
  }

  return context.uiLibrary!
}

export const useSetUiLibrary = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useSetUiLibrary must be used inside WalletProvider')
  }

  return context.setUiLibrary
}

export const useComponentLibraryConfig = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useComponentLibraryConfig must be used inside WalletProvider')
  }

  return context.componentLibraryConfig
}

export const useSettingsPreferences = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useSettingsPreferences must be used inside WalletProvider')
  }

  const instance = context.settingsPreferences

  return {
    getItem: instance.getItem.bind(instance),
    setItem: instance.setItem.bind(instance),
  }
}
