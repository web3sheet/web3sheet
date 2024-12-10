'use client'

import { useWallet } from '@web3sheet/core/hooks/useWallet'
import { useUiLibrary } from '@web3sheet/core/providers/wallet-provider'
import type { Chain } from 'viem'
import { NetworkAvatar } from './NetworkAvatar'

type GenericNetworkButtonProps = {
  chain: Chain
}

export function GenericNetworkButton({ chain }: GenericNetworkButtonProps) {
  const UI = useUiLibrary()
  const { chainId, switchChain, switchChainStatus } = useWallet()

  const { id, name, testnet } = chain

  const handleClick = () => {
    switchChain({ chainId: id })
  }

  return (
    <UI.ButtonWithIconReactNode
      className="relative"
      variant={id === chainId ? 'default' : 'outline'}
      disabled={id === chainId || switchChainStatus === 'pending'}
      size="md"
      rounded="md"
      key={`${id}-${name}`}
      onClick={handleClick}
      icon={<NetworkAvatar size="md" id={id} testnet={testnet} />}
    >
      {name}
    </UI.ButtonWithIconReactNode>
  )
}
