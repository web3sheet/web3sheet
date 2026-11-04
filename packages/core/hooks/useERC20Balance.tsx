import type { Address } from 'viem'
import { type UseBalanceParameters, useBalance } from 'wagmi'
import { useWallet } from './useWallet'

export type UseERC20BalanceParams = UseBalanceParameters & {
  tokenAddress?: Address
  targetAddress?: Address
  chainId?: number
}

export function useERC20Balance({
  tokenAddress,
  targetAddress,
  chainId,
  query,
  ...params
}: UseERC20BalanceParams) {
  const { config, address } = useWallet()
  return useBalance({
    ...params,
    config,
    chainId,
    address: targetAddress ?? address,
    token: tokenAddress,
    query: { enabled: !!tokenAddress && !!chainId, ...query },
  })
}
