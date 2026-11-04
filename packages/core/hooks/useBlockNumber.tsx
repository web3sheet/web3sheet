import { type UseBlockNumberParameters, useBlockNumber as wagmiUseBlockNumber } from 'wagmi'
import { useWallet } from './useWallet'

export function useBlockNumber(params?: UseBlockNumberParameters) {
  const { config } = useWallet()
  return wagmiUseBlockNumber({ ...params, config })
}
