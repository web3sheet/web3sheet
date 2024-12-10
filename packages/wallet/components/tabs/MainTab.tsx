import { useERC20Balance } from '@web3sheet/core'
import { useSyncProviders } from '@web3sheet/core/hooks/useSyncProviders'
import { type TokenDetails, useWallet } from '@web3sheet/core/hooks/useWallet'
import { useUiLibrary } from '@web3sheet/core/providers/wallet-provider'
import { formatBigIntTokenValue } from '@web3sheet/util/maths'
import { collapseString } from '@web3sheet/util/string'
import { type Dispatch, type SetStateAction, useMemo, useState } from 'react'
import type { Address } from 'viem'
import { GenericWalletProviderButton } from '../GenericWalletProviderButton'
import { ConnectedNetworkAvatar } from '../NetworkAvatar'
import { ConnectedWalletAvatar } from '../WalletAvatar'
import { isDynamicTokenRowProps, isTokenRowProps } from './WalletTab'
import { TAB } from './index'
import type { useBalance } from 'wagmi';

export type BasicMainTabProps = {}

type MainTabProps = BasicMainTabProps & {
  setTab: Dispatch<SetStateAction<TAB>>
}

function DynamicTokenAmount({
  tokenAddress,
  chainId,
  symbolOverride,
}: {
  tokenAddress: Address
  chainId: number
  symbolOverride?: string
}) {
  const { data } = useERC20Balance({
    chainId,
    tokenAddress,
  })

  return (
    <span>
      {formatBigIntTokenValue(data?.value ?? 0n, data?.decimals ?? 1)}{' '}
      {symbolOverride ?? data?.symbol}
    </span>
  )
}

function StaticTokenAmount({ token }: { token: TokenDetails }) {
  return (
    <>
      {token?.balance ? formatBigIntTokenValue(token.balance, token.decimals) : 0} {token?.symbol}
    </>
  )
}

export function MainTab({ setTab }: MainTabProps) {
  const UI = useUiLibrary()
  const {
    hasName,
    resolvedIdentifier,
    address,
    disconnect,
    isConnected,
    chainId,
    nativeBalance,
    chain,
    connectors,
    tokens,
  } = useWallet()
  const providers = useSyncProviders()

  const filteredProviders = useMemo(() => {
    const connectorNames = connectors.flatMap((connector) => connector.name.toLowerCase())
    return providers.filter(
      (provider) => !connectorNames.includes(provider.info.name.toLowerCase()),
    )
  }, [providers, connectors])

  const [disconnectButtonFocused, setDisconnectButtonFocused] = useState<boolean>(false)
  const handleDisconnectButtonClick = () => {
    if (disconnectButtonFocused) {
      disconnect()
      setDisconnectButtonFocused(false)
    } else {
      setDisconnectButtonFocused(true)
    }
  }

  const token = useMemo(
    () => tokens?.find((token) => token.network.id === chainId),
    [chainId, tokens],
  )

  return (
    <>
      <UI.SheetHeader className="flex-row items-center justify-between gap-4 space-y-0 align-middle">
        <div className="flex flex-row items-center gap-4 align-middle">
          <ConnectedWalletAvatar size="lg" />
          {address ? (
            <div className="flex flex-col">
              <UI.SheetTitle>
                {hasName && resolvedIdentifier ? (
                  collapseString(resolvedIdentifier, 6, 6)
                ) : (
                  <UI.PubKey pubKey={address} force="collapse" />
                )}
              </UI.SheetTitle>
              {hasName ? <UI.PubKey pubKey={address} force="collapse" className="text-xs" /> : null}
            </div>
          ) : null}
        </div>
        <div className="flex flex-row items-center gap-2 align-middle">
          {!disconnectButtonFocused ? (
            <UI.IconButton variant="ghost" size="icon" onClick={() => setTab(TAB.SETTINGS)}>
              <UI.CogIcon className="stroke-web3sheet-text h-5 w-5" />
            </UI.IconButton>
          ) : null}
          {isConnected ? (
            <UI.IconButton
              size={disconnectButtonFocused ? 'sm' : 'icon'}
              onClick={handleDisconnectButtonClick}
              onBlur={() => setDisconnectButtonFocused(false)}
              className="inline-flex gap-1 align-middle"
            >
              <UI.DisconnectIcon className="stroke-web3sheet-text h-5 w-5" />
              {disconnectButtonFocused ? <span className="mt-0.5">Disconnect</span> : null}
            </UI.IconButton>
          ) : null}
        </div>
      </UI.SheetHeader>
      {isConnected ? (
        <>
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1 align-middle text-sm">
              <ConnectedNetworkAvatar size="md" />
              <span className="leading-none">{chain?.name ?? 'Unsupported Network'}</span>
              <UI.IconButton
                rounded="md"
                size="xs"
                className="h-auto px-1 py-0.5"
                onClick={() => setTab(TAB.NETWORKS)}
              >
                <UI.SwitchNetworkIcon className="stroke-web3sheet-text h-3 w-3" />
              </UI.IconButton>
            </span>
            <span className="text-3xl font-medium">
              {token ? (
                isDynamicTokenRowProps(token) ? (
                  <DynamicTokenAmount
                    tokenAddress={token.tokenAddress}
                    chainId={token.network.id}
                    symbolOverride={token.symbolOverride}
                  />
                ) : isTokenRowProps(token) ? (
                  <StaticTokenAmount token={token} />
                ) : null
              ) : null}
            </span>
            <span className="inline-flex gap-1 text-sm">
              <UI.GasIcon className="stroke-web3sheet-text h-4 w-4" />{' '}
              {nativeBalance?.balance
                ? nativeBalance.decimals
                  ? formatBigIntTokenValue(nativeBalance.balance, nativeBalance.decimals)
                  : 0
                : nativeBalance.balance}{' '}
              {nativeBalance.symbol}
            </span>
          </div>
          <UI.TabFullWidthButton onClick={() => setTab(TAB.WALLET)}>
            View Wallet
          </UI.TabFullWidthButton>
          <UI.TabFullWidthButton onClick={() => setTab(TAB.NETWORKS)}>
            View Networks
          </UI.TabFullWidthButton>
        </>
      ) : (
        <>
          <UI.SheetTitle>Connect Wallet</UI.SheetTitle>
          {connectors.map((connector) => (
            <GenericWalletProviderButton key={connector.uid} connector={connector} />
          ))}
          {filteredProviders.map((provider) => (
            <GenericWalletProviderButton key={provider.info.uuid} provider={provider} />
          ))}
        </>
      )}
    </>
  )
}
