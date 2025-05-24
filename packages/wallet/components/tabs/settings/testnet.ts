import type { SettingDetails } from '@/componets/tabs/SettingsTab'

export const showTestNetworksKey = 'showTestnets'

export const showTestNetworks: SettingDetails = {
  label: 'Show Test Networks',
  key: showTestNetworksKey,
  type: 'boolean',
  defaultValue: false,
  description: 'Show test networks in the wallet',
}
