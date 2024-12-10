import { useSettingsPreferences, useUiLibrary } from '@web3sheet/core/providers/wallet-provider'
import type { NonPrimaryTabProps } from '../UserSheet'

export type SettingDetails = {
  label: string
  key: string
  type: 'boolean' | 'string'
  defaultValue: string | boolean
  description?: string
}

export type SettingsTabConfig = {
  settings: SettingDetails[]
}

export type UniqueSettingsTabProps = NonPrimaryTabProps & {
  experimentalFeaturesButtonLabel?: string
  handleOpenExperimentalFeaturesTab: () => void
}

type SettingsTabProps = UniqueSettingsTabProps & SettingsTabConfig

function SettingItem({ setting }: { setting: SettingDetails }) {
  const { setItem, getItem } = useSettingsPreferences()
  const UI = useUiLibrary()

  return (
    <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 text-xs">
      <span className="inline-flex w-full flex-row items-center justify-between align-middle text-lg font-medium leading-none">
        {setting.label}
        {setting.type === 'boolean' ? (
          <UI.Switch
            checked={!!getItem(setting.key)}
            onCheckedChange={(value) => setItem(setting.key, value)}
          />
        ) : (
          <span>TODO</span>
        )}
      </span>
      <p className="font-normal">{setting.description}</p>
    </div>
  )
}

export function SettingsTab({
  title = 'Settings',
  handleBackButtonClick,
  experimentalFeaturesButtonLabel = 'Experimental Features',
  handleOpenExperimentalFeaturesTab,
  settings,
}: SettingsTabProps) {
  const UI = useUiLibrary()
  return (
    <>
      <UI.SheetHeader className="flex flex-row items-center gap-2 align-middle">
        <UI.BackButton onClick={handleBackButtonClick} />
        <UI.SheetTitle>{title}</UI.SheetTitle>
      </UI.SheetHeader>
      <UI.Button rounded="md" variant="outline" onClick={handleOpenExperimentalFeaturesTab}>
        {experimentalFeaturesButtonLabel}
      </UI.Button>
      {settings.map((setting) => (
        <SettingItem setting={setting} key={setting.key} />
      ))}
    </>
  )
}
