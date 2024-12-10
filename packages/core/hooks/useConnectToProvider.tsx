import { injected } from '@wagmi/connectors'
import type { EIP6963ProviderDetail } from './useSyncProviders'
import { useWallet } from './useWallet'

export type UseConnectToProviderType = {
  status: ReturnType<typeof useWallet>['status']
  error: ReturnType<typeof useWallet>['error']
  isError: ReturnType<typeof useWallet>['isError']
  connect: (provider: EIP6963ProviderDetail) => void
}

export function useConnectToProvider(): UseConnectToProviderType {
  const { connect: connectWagmi, status, error, isError } = useWallet()

  const connect = (provider: EIP6963ProviderDetail) => {
    const id = provider?.info.uuid
    const name = provider?.info.name
    const icon = provider?.info.icon

    if (!provider?.provider) {
      throw new Error('Missing connector or provider. One is required.')
    }

    if (!id || !name) {
      throw new Error('Missing required props.')
    }

    return connectWagmi({
      connector: injected({
        target: {
          icon,
          name,
          id,
          // @ts-expect-error -- TODO: Fix this type
          provider: provider.provider,
        },
      }),
    })
  }

  return {
    status,
    error,
    isError,
    connect,
  }
}
