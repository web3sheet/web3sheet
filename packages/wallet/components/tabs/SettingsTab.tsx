import { useSettingsPreferences, useUiLibrary } from '@web3sheet/core/providers/wallet-provider'
import type { NonPrimaryTabProps } from '../UserSheet'
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"

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
  handleImportSettings: () => void
  handleExportSettings: () => void
  importSettingsButtonLabel?: string
  exportSettingsButtonLabel?: string
}

type SettingsTabProps = UniqueSettingsTabProps & SettingsTabConfig


const FormSchema = z.object({
  itemValue: z.string().optional(),
})

function SettingItem({ setting }: { setting: SettingDetails }) {
  const { setItem, getItem } = useSettingsPreferences()
  const UI = useUiLibrary()
  const [itemValue, setItemValue] = useState(getItem<boolean| string>(setting.key))

  const updateSettingsItem = useCallback((key: string, value: boolean | string) => {
    setItem(key, value)
    setItemValue(value)
  }, [setItem])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      itemValue: itemValue ? itemValue.toString() : '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    updateSettingsItem(setting.key, data.itemValue ?? '');
  };


  return (
    <div className="flex flex-col items-start rounded-md py-2 text-xs">
      <span className="inline-flex w-full flex-row items-center justify-between align-middle text-base font-medium leading-none">
        {setting.label}
        {setting.type === 'boolean' ? (
          <UI.Switch
            checked={typeof itemValue === 'boolean' ? itemValue : false}
            onCheckedChange={(checked) => updateSettingsItem(setting.key, checked)}
          />
        ) : setting.type === 'string' ? (
            <UI.Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row align-middle gap-1 w-48">
                <UI.FormField
                  control={form.control}
                  name="itemValue"
                  render={({ field }) => (
                    <UI.FormItem>
                      <UI.FormControl>
                        <UI.Input placeholder="shadcn" {...field} />
                      </UI.FormControl>
                      <UI.FormMessage />
                    </UI.FormItem>
                  )}
                />
                <UI.IconButton type="submit" size="sm">
                  <UI.CheckIcon className="stroke-green-500 h-4 w-4" />
                </UI.IconButton>
                <UI.IconButton type="reset" size="sm" onClick={() => form.reset()}>
                  <UI.XIcon className="stroke-red-500 h-4 w-4" />
                </UI.IconButton>
              </form>
            </UI.Form>
         ):(
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
  importSettingsButtonLabel = 'Import Settings',
  exportSettingsButtonLabel = 'Export Settings',
  handleOpenExperimentalFeaturesTab,
  handleImportSettings,
  handleExportSettings,
  settings,
}: SettingsTabProps) {
  const UI = useUiLibrary();
  return (
    <>
      <UI.SheetHeader className="flex flex-row items-center gap-2 align-middle">
        <UI.BackButton onClick={handleBackButtonClick} />
        <UI.SheetTitle>{title}</UI.SheetTitle>
      </UI.SheetHeader>
      {settings.map((setting) => (
        <SettingItem setting={setting} key={setting.key} />
      ))}
      {handleImportSettings || handleExportSettings ? (
        <div className="flex flex-row items-center gap-2 align-middle">
          {handleImportSettings ? (
            <UI.Button rounded="md" variant="outline" onClick={handleImportSettings}>
              {importSettingsButtonLabel}
            </UI.Button>
          ) : null}
          {handleExportSettings ? (
            <UI.Button rounded="md" variant="outline" onClick={handleExportSettings}>
              {exportSettingsButtonLabel}
            </UI.Button>
          ) : null}
        </div>
      ) : null}
      {handleOpenExperimentalFeaturesTab ? (
        <UI.Button rounded="md" variant="outline" onClick={handleOpenExperimentalFeaturesTab}>
          {experimentalFeaturesButtonLabel}
        </UI.Button>
      ) : null}
    </>
  );
}
