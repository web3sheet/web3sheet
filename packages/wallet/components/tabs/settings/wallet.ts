import type { SettingDetails } from '@/componets/tabs/SettingsTab'

export const autoRefreshWalletBalanceKey = 'autoRefreshBalance'

export const autoRefreshWalletBalance: SettingDetails = {
  label: 'Auto Refresh Balance',
  key: autoRefreshWalletBalanceKey,
  type: 'boolean',
  defaultValue: false,
  description: 'Automatically refresh wallet balances',
}

export const autoRefreshWalletBalanceIntervalSecondsKey = 'autoRefreshBalanceIntervalSeconds'
export const autoRefreshWalletBalanceIntervalSecondsDefaultValue = '120'

export const autoRefreshWalletBalanceInterval: SettingDetails = {
  label: 'Auto Refresh Balance Interval',
  key: autoRefreshWalletBalanceIntervalSecondsKey,
  type: 'string',
  defaultValue: 'autoRefreshWalletBalanceIntervalSecondsDefaultValue',
  description: 'Interval in seconds to refresh wallet balances',
}
