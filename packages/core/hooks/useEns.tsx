import { useMemo } from 'react'
import type { Address } from 'viem'
import { mainnet } from 'viem/chains'
import { normalize } from 'viem/ens'
import { useConfig, useEnsAvatar, useEnsName } from 'wagmi'

type UseEnsType = {
  /** The ENS name of the wallet. */
  ensName?: string | null
  /** The ENS avatar of the wallet. */
  ensAvatar?: string | null
}

export function useEns({
  address,
  enabled,
  config,
}: {
  address?: Address
  enabled: boolean
  config?: ReturnType<typeof useConfig>
}): UseEnsType {
  const wagmiConfig = useConfig({config})

  const ensConfig = useMemo(() => {
    return {
      config: {
        ...wagmiConfig,
        chains: [mainnet] as const,
      },
      chainId: mainnet.id,
      universalResolverAddress: mainnet.contracts.ensUniversalResolver.address,
    }
  }, [wagmiConfig])

  const { data: ensName } = useEnsName({
    query: { enabled },
    address,
    ...ensConfig,
  })

  const normalizedEnsName = useMemo(() => (ensName ? normalize(ensName) : undefined), [ensName])

  const { data: ensAvatar } = useEnsAvatar({
    query: { enabled: !!normalizedEnsName },
    name: normalizedEnsName,
    ...ensConfig,
  })

  return { ensName, ensAvatar }
}
