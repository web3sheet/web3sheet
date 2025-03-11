'use client'

import {
  useComponentLibraryConfig,
  useSetUiLibrary,
  useUiLibrary,
  useWalletSheet,
} from '@web3sheet/core/providers/wallet-provider'
import { Web3WalletComponentLibrary } from '@web3sheet/ui/lib/library'
import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { type GenericTabDetails, TAB, type TabDetails } from './tabs';
import { type MainTabConfig, MainTab } from './tabs/MainTab';

export type InteractionConfig = {
  disableKeyboardShortcuts?: boolean
  toggleSheetHotkey?: string
}

export type UserSheetConfig = {
  tabs: TabDetails[]
  customTabs: GenericTabDetails[]
  interaction?: InteractionConfig
  mainTabConfig?: MainTabConfig
}

export type NonPrimaryTabProps = {
  title?: string
  handleBackButtonClick: () => void
}

export type UserSheetProps = {
  walletSheetDisabledViaFeatureFlag?: boolean
  config: UserSheetConfig
  className?: string
}
export function UserSheet(props: UserSheetProps) {
  const [initialized, setInitialized] = useState(false)
  const componentLibrary = useComponentLibraryConfig()
  const setUiLibrary = useSetUiLibrary()

  useEffect(() => {
    setUiLibrary(new Web3WalletComponentLibrary(componentLibrary))
    if (!initialized) {
      setInitialized(true)
    }
  }, [componentLibrary])

  return initialized ? <UserSheetComponent {...props} /> : null
}

export function UserSheetComponent({
  config,
  walletSheetDisabledViaFeatureFlag,
  className,
}: UserSheetProps) {
  const UI = useUiLibrary()

  const [tab, setTab] = useState<TAB>(TAB.MAIN)
  const { open, setOpen } = useWalletSheet()

  const mainTab = <MainTab setTab={setTab} {...config.mainTabConfig} />

  const tabs: Record<TAB, ReactNode> = useMemo(() => {
    const enabledTabs = config.tabs.reduce(
      (acc, { id, tab }) => {
        acc[id] = tab
        return acc
      },
      {} as Record<TAB, (props: any) => ReactNode>,
    )

    const nonPrimaryTabProps = {
      handleBackButtonClick: () => setTab(TAB.MAIN),
    }

    const custom = config.customTabs.reduce(
      (acc, { id, tab }) => {
        acc[id] = tab(nonPrimaryTabProps)
        return acc
      },
      {} as Record<string, ReactNode>,
    )

    return {
      [TAB.MAIN]: mainTab,
      [TAB.WALLET]: enabledTabs[TAB.WALLET]?.(nonPrimaryTabProps),
      [TAB.NETWORKS]: enabledTabs[TAB.NETWORKS]?.(nonPrimaryTabProps),
      [TAB.SETTINGS]: enabledTabs[TAB.SETTINGS]?.({
        ...nonPrimaryTabProps,
        handleOpenExperimentalFeaturesTab: () => setTab(TAB.EXPERIMENTAL),
      }),
      [TAB.EXPERIMENTAL]: enabledTabs[TAB.EXPERIMENTAL]?.({
        handleBackButtonClick: () =>
          walletSheetDisabledViaFeatureFlag ? setOpen(false) : setTab(TAB.SETTINGS),
      }),
      ...custom,
    }
  }, [config.tabs])

  const currentTab = useMemo(
    () => tabs[walletSheetDisabledViaFeatureFlag ? TAB.EXPERIMENTAL : tab] ?? mainTab,
    [tab, walletSheetDisabledViaFeatureFlag],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Checks for the ctrl + k key combination
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === config.interaction?.toggleSheetHotkey ?? 'u')
      ) {
        event.preventDefault()
        setOpen((prev) => !prev)
      } else if (event.code === 'Escape') {
        setOpen(false)
      }
    }

    // Add event listener
    if (!config.interaction?.disableKeyboardShortcuts) {
      document.addEventListener('keydown', handleKeyDown)
    }

    // Cleanup
    return () => {
      if (!config.interaction?.disableKeyboardShortcuts) {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [])

  return (
    <UI.Sheet open={open}>
      <UI.SheetContent closeSheet={() => setOpen(false)} className={className}>
        {currentTab}
      </UI.SheetContent>
    </UI.Sheet>
  )
}
