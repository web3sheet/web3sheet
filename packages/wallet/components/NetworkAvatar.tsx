import { useWallet } from '@web3sheet/core/hooks/useWallet'
import { cn } from '@web3sheet/ui/lib/utils'
import { Avatar, AvatarFallback } from '@web3sheet/ui/ui/avatar'
import { arbitrum, arbitrumSepolia, mainnet, sepolia } from 'viem/chains'
import { FlaskIcon } from '../icons/FlaskIcon'
import { ArbitrumLogo } from '../icons/logos/ArbitrumLogo'
import { EthereumLogo } from '../icons/logos/EthereumLogo'

type NetworkId =
  | typeof mainnet.id
  | typeof sepolia.id
  | typeof arbitrum.id
  | typeof arbitrumSepolia.id
  | number

export const NetworkIcon = ({ id, className }: { id: NetworkId; className?: string }) => {
  switch (id) {
    case mainnet.id:
    case sepolia.id:
      return <EthereumLogo className={className} />
    case arbitrum.id:
    case arbitrumSepolia.id:
      return <ArbitrumLogo className={className} />
    default:
      return null
  }
}

export function ConnectedNetworkAvatar({
  size,
  className,
}: {
  size: keyof typeof avatarSize
  className?: string
}) {
  const { chainId, chains } = useWallet()

  return (
    <NetworkAvatar
      id={chainId ?? 1}
      testnet={chains.find((chain) => chain.id === chainId)?.testnet}
      className={className}
      size={size}
    />
  )
}

const avatarSize = {
  lg: 'h-12 w-12',
  md: 'h-6 w-6',
  sm: 'h-3 w-3',
}

const testnetIconSize = {
  lg: 'h-6 w-6',
  md: 'h-3 w-3',
  sm: 'h-1 w-1',
}

export function NetworkAvatar({
  id,
  testnet,
  size,
  className,
}: {
  id: number
  testnet?: boolean
  size: keyof typeof avatarSize
  className?: string
}) {
  return (
    <div className={cn(avatarSize[size], 'relative', className)}>
      <Avatar className={cn(avatarSize[size], className)}>
        {<NetworkIcon id={id} className="aspect-square h-full w-full" /> ?? (
          <AvatarFallback className="aspect-square h-full w-full" />
        )}
      </Avatar>
      {testnet ? (
        <div className={cn('absolute bottom-0 right-0', testnetIconSize[size])}>
          <FlaskIcon className={cn(testnetIconSize[size])} />
        </div>
      ) : null}
    </div>
  )
}
