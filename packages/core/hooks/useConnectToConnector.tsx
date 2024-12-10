import type { Connector } from 'wagmi'
import { useWallet } from './useWallet'

export type UseConnectToConnectorType = {
  status: ReturnType<typeof useWallet>['status']
  error: ReturnType<typeof useWallet>['error']
  isError: ReturnType<typeof useWallet>['isError']
  connect: (connector: Connector) => void
}

export function useConnectToConnector(): UseConnectToConnectorType {
  const { connect: connectWagmi, status, error, isError } = useWallet()

  const connect = (connector: Connector) => {
    return connectWagmi({ connector })
  }

  return {
    status,
    error,
    isError,
    connect,
  }
}

