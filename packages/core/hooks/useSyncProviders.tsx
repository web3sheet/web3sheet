import { useSyncExternalStore } from 'react'

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

// An array to store the detected wallet providers.
let providers: EIP6963ProviderDetail[] = []

export const store = {
  value: () => providers,
  subscribe: (callback: () => void) => {
    const onAnnouncement = (event: Event) => {
      const { detail } = event as Event & { detail: EIP6963ProviderDetail }
      if (providers.map((p) => p.info.uuid).includes(detail.info.uuid)) return
      providers = [...providers, detail]
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

export const useSyncProviders = () =>
  useSyncExternalStore(store.subscribe, store.value, store.value)
