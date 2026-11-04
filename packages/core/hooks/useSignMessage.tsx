import { type UseSignMessageParameters, useSignMessage as wagmiUseSignMessage } from 'wagmi'
import { useWallet } from './useWallet'

export function useSignMessage(params?: UseSignMessageParameters) {
  const { config } = useWallet()
  return wagmiUseSignMessage({ ...params, config })
}
