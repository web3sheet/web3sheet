'use client'

import type { ReactNode } from 'react'
import { type State, WagmiProvider, cookieToInitialState } from 'wagmi'
import type { Web3WalletWagmiConfig } from '../lib/wagmi'

export type WagmiCookie = string | null | undefined

export type WagmiClientProviderProps = {
  config: Web3WalletWagmiConfig
  cookie?: WagmiCookie
  /** Defaults to state from cookie and config */
  initialState?: State
}

export function WagmiClientProvider({
  config,
  cookie,
  children,
  initialState,
}: WagmiClientProviderProps & {
  children: ReactNode
}) {
  const _initialState = initialState ?? cookieToInitialState(config, cookie)
  return (
    <WagmiProvider config={config} initialState={_initialState}>
      {children}
    </WagmiProvider>
  )
}
