import { useBalance, type UseBalanceParameters } from 'wagmi';
import { useWallet } from './useWallet'
import type { Address } from 'viem';

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
