import type { SettingDetails } from '@/componets/tabs/SettingsTab'

export const showTestNetworks: SettingDetails = {
  label: 'Show Test Networks',
  key: 'showTestnets',
  type: 'boolean',
  defaultValue: false,
  description: 'Show test networks in the wallet',
}
