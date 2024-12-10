'use client'

import { useConnectToConnector, useConnectToProvider } from '@web3sheet/core'
import type { EIP6963ProviderDetail } from '@web3sheet/core/hooks/useSyncProviders'
import { useUiLibrary } from '@web3sheet/core/providers/wallet-provider'
import type { Connector } from 'wagmi'
import { CoinbaseWalletLogo } from '../icons/logos/CoinbaseWalletLogo'
import { MetamaskLogo } from '../icons/logos/MetamaskLogo'
import { WalletConnectLogo } from '../icons/logos/WalletConnectLogo'

type GenericWalletProviderButtonProps = {
  connector?: Connector
  provider?: EIP6963ProviderDetail
}

type WalletId = 'metaMaskSDK' | 'coinbaseWalletSDK' | 'walletConnect' | string

const WalletProviderIcon = ({ id, className }: { id: WalletId; className?: string }) => {
  switch (id) {
    case 'metaMaskSDK':
      return <MetamaskLogo className={className} />
    case 'coinbaseWalletSDK':
      return <CoinbaseWalletLogo className={className} />
    case 'walletConnect':
      return <WalletConnectLogo className={className} />
    default:
      return null
  }
}

export function GenericWalletProviderButton({
  connector,
  provider,
}: GenericWalletProviderButtonProps) {
  const UI = useUiLibrary()
  const { connect: connectProvider } = useConnectToProvider()
  const { connect: connectConnector, status } = useConnectToConnector()

  if (!connector && !provider) {
    throw new Error('Connector or Provider required!')
  }

  const id = connector?.id ?? provider?.info.uuid
  const name = connector?.name ?? provider?.info.name
  const icon = connector?.icon ?? provider?.info.icon

  if (!id || !name) {
    throw new Error('Missing required props.')
  }

  const onClick = () => {
    if (connector) {
      connectConnector(connector)
    } else if (provider?.provider) {
      connectProvider(provider)
    } else {
      throw new Error('Missing connector or provider. One is required.')
    }
  }

  if (icon) {
    return (
      <UI.ButtonWithIconSrc
        className="relative"
        variant="outline"
        size="md"
        rounded="md"
        onClick={onClick}
        disabled={status === 'pending'}
        src={icon}
      >
        {name}
      </UI.ButtonWithIconSrc>
    )
  }

  return (
    <UI.ButtonWithIconReactNode
      className="relative"
      variant="outline"
      size="md"
      rounded="md"
      onClick={onClick}
      disabled={status === 'pending'}
      icon={<WalletProviderIcon id={id} className="aspect-square h-full w-full" />}
    >
      {name}
    </UI.ButtonWithIconReactNode>
  )
}
