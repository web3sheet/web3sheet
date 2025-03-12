import type { Address } from 'viem'
import { useBalance } from 'wagmi'
import { useWallet } from './useWallet'

export function useERC20Balance({
  tokenAddress,
  targetAddress,
  chainId,
}: {
  tokenAddress?: Address
  targetAddress?: Address
  chainId?: number
}) {
  const { config, address } = useWallet()
  return useBalance({
    config,
    chainId,
    address: targetAddress ?? address,
    token: tokenAddress,
    query: { enabled: !!tokenAddress && !!chainId },
  })
}
