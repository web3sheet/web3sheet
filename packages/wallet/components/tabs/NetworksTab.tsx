import { useWallet } from '@web3sheet/core/hooks/useWallet'
import { useUiLibrary } from '@web3sheet/core/providers/wallet-provider'
import { formatBigIntTokenValue } from '@web3sheet/util/maths'
import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { useBalance } from 'wagmi'
import { GenericNetworkButton } from '../GenericNetworkButton'
import { NetworkAvatar } from '../NetworkAvatar'
import type { NonPrimaryTabProps } from '../UserSheet'

export type NetworksTabConfig = {}

export type UniqueNetworksTabProps = NonPrimaryTabProps

type NetworksTabProps = UniqueNetworksTabProps & NetworksTabConfig

export function NetworksTab({ title = 'Networks', handleBackButtonClick }: NetworksTabProps) {
  const UI = useUiLibrary()
  const {
    chains,
    chain,
    config,
    address,
    isConnected,
    switchChainError,
    switchChainIsError,
    switchChainStatus,
  } = useWallet()
  const { data: balanceData } = useBalance({
    config,
    address,
    query: { enabled: isConnected },
  })

  return (
    <>
      <UI.SheetHeader className="flex flex-row items-center gap-2 align-middle">
        <UI.BackButton onClick={handleBackButtonClick} />
        <UI.SheetTitle>{title}</UI.SheetTitle>
      </UI.SheetHeader>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-4">
          <NetworkAvatar id={chain?.id ?? 1} testnet={chain?.testnet ?? false} size="lg" />
          <span className="text-lg font-medium">
            {chain?.name ?? 'Unsupported Network'}
            {chain?.testnet ? ' (Testnet)' : ''}
          </span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <span>
            {'Native Currency Balance: '}
            {balanceData
              ? formatBigIntTokenValue(balanceData?.value ?? 0, balanceData?.decimals ?? 1)
              : 0}{' '}
            {chain?.nativeCurrency?.symbol}
          </span>
        </div>
        {chain?.blockExplorers?.default ? (
          <Link href={chain?.blockExplorers?.default.url} target="_blank" className="underline">
            <UI.TabFullWidthButton className="gap-1">
              {chain?.blockExplorers?.default.name}
              {' Block Explorer'}
              <ExternalLinkIcon className="stroke-web3sheet-text h-4 w-4" />
            </UI.TabFullWidthButton>
          </Link>
        ) : null}
      </div>
      <UI.SheetTitle>Select a network</UI.SheetTitle>
      {chains.map((chain) => (
        <GenericNetworkButton key={chain.id} chain={chain} />
      ))}
      {switchChainIsError ? (
        <span className="text-destructive text-base">
          {switchChainError?.message ?? 'Failed to switch network'}
        </span>
      ) : null}
    </>
  )
}
