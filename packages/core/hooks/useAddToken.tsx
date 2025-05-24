import { useState } from 'react';
import { useWallet } from './useWallet';
import { watchAsset } from 'wagmi/actions';

export type AddTokenParams = {
  symbol: string;
  decimals: number;
  address: string;
  chainId?: number;
  icon?: string;
}

export function useAddToken({ address, icon, symbol, decimals, chainId }: AddTokenParams) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { config, chainId: connectedChainId, switchChainAsync } = useWallet()

  const addToken = async () => {
    setIsPending(true);
    setIsSuccess(false);
    try {
      if (!chainId) throw new Error('Invalid chain');
      if (connectedChainId !== chainId) {
        await switchChainAsync({ chainId })
        if (chainId !== connectedChainId) throw new Error('Failed to switch chain');
      }

      const wasAdded = await watchAsset(config, {
        type: 'ERC20',
        options: {
          address,
          symbol,
          decimals,
          image: icon,
        },
      })

      if (!wasAdded) {
        throw new Error('Failed to add token');
      }

      setIsSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to add token');
      }
    } finally {
      setIsPending(false);
    }
  };
  return { addToken, error, isPending, isSuccess };
}
