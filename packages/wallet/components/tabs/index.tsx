import type { ReactNode } from 'react'
import {
  ExperimentalFeaturesTab,
  type ExperimentalFeaturesTabConfig,
  type UniqueExperimentalFeaturesTabProps,
} from './ExperimentalFeaturesTab'
import { NetworksTab, type NetworksTabConfig, type UniqueNetworksTabProps } from './NetworksTab'
import { SettingsTab, type SettingsTabConfig, type UniqueSettingsTabProps } from './SettingsTab'
import { type UniqueWalletTabProps, WalletTab, type WalletTabConfig } from './WalletTab'

export enum TAB {
  MAIN = 'main',
  SETTINGS = 'settings',
  NETWORKS = 'networks',
  WALLET = 'wallet',
  EXPERIMENTAL = 'experimental',
}

export type GenericTabDetails = {
  id: TAB
  tab: (props: any) => ReactNode
}

export function walletTab(config: WalletTabConfig) {
  return {
    id: TAB.WALLET,
    tab: (props: UniqueWalletTabProps) => <WalletTab {...props} {...config} />,
  } satisfies GenericTabDetails
}

export function networksTab(config: NetworksTabConfig) {
  return {
    id: TAB.NETWORKS,
    tab: (props: UniqueNetworksTabProps) => <NetworksTab {...props} {...config} />,
  } satisfies GenericTabDetails
}

export function settingsTab(config: SettingsTabConfig) {
  return {
    id: TAB.SETTINGS,
    tab: (props: UniqueSettingsTabProps) => <SettingsTab {...props} {...config} />,
  } satisfies GenericTabDetails
}

export function experimentalFeaturesTab<Flag extends string>(
  config: ExperimentalFeaturesTabConfig<Flag>,
) {
  return {
    id: TAB.EXPERIMENTAL,
    tab: (props: UniqueExperimentalFeaturesTabProps) => (
      <ExperimentalFeaturesTab {...props} {...config} />
    ),
  } satisfies GenericTabDetails
}

export type TabDetails = ReturnType<
  typeof walletTab | typeof networksTab | typeof settingsTab | typeof experimentalFeaturesTab
>
