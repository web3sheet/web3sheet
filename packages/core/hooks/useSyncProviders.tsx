import { useSyncExternalStore } from 'react'

declare global {
  interface WindowEventMap {
    // @ts-expect-error -- TODO: Fix this type
    'eip6963:announceProvider': CustomEvent
  }
}

// An array to store the detected wallet providers.
let providers: EIP6963ProviderDetail[] = []

export const store = {
  value: () => providers,
  subscribe: (callback: () => void) => {
    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      if (providers.map((p) => p.info.uuid).includes(event.detail.info.uuid)) return
      providers = [...providers, event.detail]
      callback()
    }

    // Listen for eip6963:announceProvider and call onAnnouncement when the event is triggered.
    window.addEventListener('eip6963:announceProvider', onAnnouncement)

    // Dispatch the event, which triggers the event listener in the MetaMask wallet.
    window.dispatchEvent(new Event('eip6963:requestProvider'))

    // Return a function that removes the event listern.
    return () => window.removeEventListener('eip6963:announceProvider', onAnnouncement)
  },
}

interface EIP6963ProviderInfo {
  rdns: string
  uuid: string
  name: string
  icon: string
}

export interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo
  provider: EIP1193Provider
}

type EIP6963AnnounceProviderEvent = {
  detail: {
    info: EIP6963ProviderInfo
    provider: Readonly<EIP1193Provider>
  }
}

export interface EIP1193Provider {
  isStatus?: boolean
  host?: string
  path?: string
  sendAsync?: (
    request: { method: string; params?: unknown[] },
    callback: (error: Error | null, response: unknown) => void,
  ) => void
  send?: (
    request: { method: string; params?: unknown[] },
    callback: (error: Error | null, response: unknown) => void,
  ) => void
  request: (request: { method: string; params?: unknown[] }) => Promise<unknown>
}

export const useSyncProviders = () =>
  useSyncExternalStore(store.subscribe, store.value, store.value)
