import { useERC20Balance, useWallet } from '@web3sheet/core'
import type { DynamicTokenRowProps, TokenDetails } from '@web3sheet/core/hooks/useWallet'
import { useUiLibrary } from '@web3sheet/core/providers/wallet-provider'
import { formatBigIntTokenValue } from '@web3sheet/util/maths'
import { cn } from '@web3sheet/ui/lib/utils'
import { Avatar, AvatarImage } from '@web3sheet/ui/ui/avatar'
import type { NonPrimaryTabProps } from '../UserSheet'

function TokenRow({
  name,
  iconSrc,
  network,
  balance,
  decimals,
  symbol,
  children,
  roundingDecimals,
  hideIfZero,
}: TokenDetails) {
  return hideIfZero && balance === 0n ? null : (
    <div className="flex flex-row items-center justify-between gap-2 align-middle">
      <div className="flex flex-row items-center gap-2 align-middle">
        <Avatar>
          <AvatarImage src={iconSrc} />
        </Avatar>
        <div className="flex flex-col align-middle">
          <span className="inline-flex items-center gap-2 align-middle">
            {name}
            {children}
          </span>
          <span className="inline-flex gap-1 text-xs">
            <Avatar className={cn('h-4 w-4', network.className)}>
              <AvatarImage src={network.iconSrc} />
            </Avatar>
            {network.name}
          </span>
        </div>
      </div>
      <span className="text-lg">
        {balance ? formatBigIntTokenValue(balance, decimals, roundingDecimals) : 0} {symbol}
      </span>
    </div>
  )
}

function DynamicTokenRow({
  name,
  tokenAddress,
  iconSrc,
  network,
  symbolOverride,
  symbolPrefix,
  children,
  roundingDecimals,
  hideIfZero
}: DynamicTokenRowProps) {
  const { data } = useERC20Balance({
    chainId: network.id,
    tokenAddress,
  })

  return (
    <TokenRow
      name={name}
      iconSrc={iconSrc}
      network={network}
      balance={data?.value ?? 0n}
      decimals={data?.decimals ?? 0}
      symbol={`${symbolPrefix ?? ''}${symbolOverride ?? data?.symbol ?? ''}`}
      roundingDecimals={roundingDecimals}
      hideIfZero={hideIfZero}
    >
      {children}
    </TokenRow>
  )
}

export type WalletTabConfig = {
  roundingDecimals?: number
}

export type UniqueWalletTabProps = NonPrimaryTabProps

type WalletTabProps = UniqueWalletTabProps & WalletTabConfig

export const isTokenRowProps = (
  token: TokenDetails | DynamicTokenRowProps,
): token is TokenDetails => 'balance' in token && 'decimals' in token && 'symbol' in token

export const isDynamicTokenRowProps = (
  token: TokenDetails | DynamicTokenRowProps,
): token is DynamicTokenRowProps =>
  !!('tokenAddress' in token && 'network' in token && token.tokenAddress && token.network)

export function WalletTab({
  title = 'Wallet',
  handleBackButtonClick,
  roundingDecimals,
}: WalletTabProps) {
  const UI = useUiLibrary()
  const { tokens } = useWallet()
  return (
    <>
      <UI.SheetHeader className="flex flex-row items-center gap-2 align-middle">
        <UI.BackButton onClick={handleBackButtonClick} />
        <UI.SheetTitle>{title}</UI.SheetTitle>
      </UI.SheetHeader>
      {tokens.map((token) => {
        if (isDynamicTokenRowProps(token)) {
          return (
            <DynamicTokenRow
              key={token.tokenAddress + token.network.id}
              {...token}
              roundingDecimals={token.roundingDecimals ?? roundingDecimals}
            />
          )
        }

        if (isTokenRowProps(token)) {
          return (
            <TokenRow
              key={token.name + token.network.id}
              {...token}
              roundingDecimals={token.roundingDecimals ?? roundingDecimals}
            />
          )
        }

        throw new Error('Invalid token row props')
      })}
    </>
  )
}
