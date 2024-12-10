'use client'

import { Button } from '@/components/button'
import type { DynamicTokenRowProps } from '@web3sheet/core/hooks/useWallet'
import { UserSheet } from '@web3sheet/wallet/components/UserSheet'
import { networksTab, settingsTab, walletTab } from '@web3sheet/wallet/tabs'
import { useMemo } from 'react'
import { arbitrumSepolia, mainnet } from 'viem/chains'

export function UserSheetWithLocales() {
  const tokenDetailsArbitrum: DynamicTokenRowProps = {
    tokenAddress: '0x70c1f36C9cEBCa51B9344121D284D85BE36CD6bB',
    name: 'Session Token',
    iconSrc: 'https://stake.getsession.org/images/token_logo.svg',
    network: {
      id: arbitrumSepolia.id,
      name: 'Arbitrum One',
      iconSrc: '/images/arbitrum.svg',
    },
    children: <Button>Stake</Button>,
  }

  const tokenDetailsArbitrumSepolia: DynamicTokenRowProps = {
    tokenAddress: '0x70c1f36C9cEBCa51B9344121D284D85BE36CD6bB',
    name: 'Session Token',
    iconSrc: 'https://stake.getsession.org/images/token_logo.svg',
    network: {
      id: arbitrumSepolia.id,
      name: 'Arbitrum Sepolia',
      iconSrc: '/images/arbitrum.svg',
    },
  }

  const tokenDetailsEthereum: DynamicTokenRowProps = {
    tokenAddress: '0x70c1f36C9cEBCa51B9344121D284D85BE36CD6bB',
    name: 'Session Token',
    iconSrc: 'https://stake.getsession.org/images/token_logo.svg',
    network: {
      id: mainnet.id,
      name: 'Ethereum',
      iconSrc: '/images/eth.svg',
      className: 'bg-session-white',
    },
    children: <Button>Bridge</Button>,
  }

  const tokenDetailsEthereumSepolia: DynamicTokenRowProps = {
    tokenAddress: '0x70c1f36C9cEBCa51B9344121D284D85BE36CD6bB',
    name: 'Session Token',
    iconSrc: 'https://stake.getsession.org/images/token_logo.svg',
    network: {
      id: mainnet.id,
      name: 'Ethereum Sepolia',
      iconSrc: '/images/eth.svg',
      className: 'bg-session-white',
    },
    children: <Button>Bridge</Button>,
  }

  const tokens = useMemo(
    () => [
      tokenDetailsArbitrum,
      tokenDetailsEthereum,
      tokenDetailsArbitrumSepolia,
      tokenDetailsEthereumSepolia,
    ],
    [
      tokenDetailsArbitrum,
      tokenDetailsEthereum,
      tokenDetailsArbitrumSepolia,
      tokenDetailsEthereumSepolia,
    ],
  )

  return (
    <UserSheet
      config={{
        tokens,
        tabs: [
          walletTab({ tokens }),
          settingsTab({}),
          networksTab({}),
          // experimentalFeaturesTab({
          //   clearAcceptExperimental: false,
          //   experimentalFeatureFlags: ['experimental_test'],
          //   experimentalFeatureFlagsInfo: {
          //     experimental_test: { name: 'Test', description: 'Test description' },
          //   },
          //   reportIssueLink: {
          //     label: 'GitHub',
          //     href: 'https://github.com',
          //   },
          //   termsLink: {
          //     label: 'Terms and Conditions',
          //     href: 'https://github.com',
          //   },
          //   useFeatureFlagsGeneric,
          //   useSetExperimentalFeatureFlagGeneric,
          //   isExperimentalFeatureFlag,
          // }),
        ],
      }}
      walletSheetDisabledViaFeatureFlag={false}
    />
  )
}
