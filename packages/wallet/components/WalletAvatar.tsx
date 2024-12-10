import { useWallet } from '@web3sheet/core/hooks/useWallet'
import { cn } from '@web3sheet/ui/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@web3sheet/ui/ui/avatar'
import type { ReactNode } from 'react'
import { ConnectedNetworkAvatar } from './NetworkAvatar'

export function ConnectedWalletAvatar({
  size,
  className,
  avatarSrc,
}: {
  className?: string
  avatarSrc?: string | null
  size: keyof typeof avatarSize
}) {
  const { ensName, ensAvatar } = useWallet()

  return (
    <WalletAvatar
      className={className}
      avatarSrc={avatarSrc}
      ensAvatar={ensAvatar}
      ensName={ensName}
      size={size}
    />
  )
}

const avatarSize = {
  lg: 'h-12 w-12',
  md: 'h-6 w-6',
  sm: 'h-3 w-3',
}

export function WalletAvatar({
  className,
  size,
  avatarSrc,
  ensAvatar,
  ensName,
  fallbackIcon,
  fallbackAlt,
}: {
  className?: string
  size: keyof typeof avatarSize
  avatarSrc?: string | null
  ensAvatar?: string | null
  ensName?: string | null
  fallbackIcon?: ReactNode | string
  fallbackAlt?: string
}) {
  return (
    <Avatar className={cn(avatarSize[size], className)}>
      {avatarSrc ? (
        <AvatarImage src={avatarSrc} alt={ensName ?? 'Avatar'} className={cn(avatarSize[size])} />
      ) : null}
      <AvatarFallback>
        <Avatar className={cn(avatarSize[size], className)}>
          {ensAvatar ? <AvatarImage src={ensAvatar} alt={ensName ?? 'Ens Avatar'} /> : null}
          <AvatarFallback>
            <Avatar className={cn(avatarSize[size], className)}>
              {fallbackIcon ? (
                typeof fallbackIcon === 'string' ? (
                  <AvatarImage src={fallbackIcon} alt={fallbackAlt} />
                ) : (
                  fallbackIcon
                )
              ) : null}
              <AvatarFallback>
                <ConnectedNetworkAvatar size={size} />
              </AvatarFallback>
            </Avatar>
          </AvatarFallback>
        </Avatar>
      </AvatarFallback>
    </Avatar>
  )
}
