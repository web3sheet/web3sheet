import { BackButton } from '../components/BackButton'
import { CopyToClipboardButton } from '../components/CopyToClipboardButton'
import { PubKey } from '../components/PubKey'
import {
  Button,
  ButtonWithIconReactNode,
  ButtonWithIconSrc,
  IconButton,
  TabFullWidthButton,
} from '../components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../components/ui/sheet'
import { Switch } from '../components/ui/switch'
import { CogIcon } from '../icons/CogIcon'
import { FuelIcon } from '../icons/FuelIcon'
import { LogOutIcon } from '../icons/LogOutIcon'
import { SwitchArrowsIcon } from '../icons/SwitchArrowsIcon'

export class Web3WalletComponentLibrary {
  // Utility components
  Button: typeof Button
  Switch: typeof Switch

  // Special Buttons
  TabFullWidthButton: typeof TabFullWidthButton
  ButtonWithIconSrc: typeof ButtonWithIconSrc
  ButtonWithIconReactNode: typeof ButtonWithIconReactNode
  IconButton: typeof IconButton

  // Special components
  CopyToClipboardButton: typeof CopyToClipboardButton
  PubKey: typeof PubKey

  // Core UserSheet components
  Sheet: typeof Sheet
  SheetContent: typeof SheetContent

  // Tab components
  BackButton: typeof BackButton
  SheetHeader: typeof SheetHeader
  SheetTitle: typeof SheetTitle
  SheetDescription: typeof SheetDescription

  // Icon components
  CogIcon: typeof CogIcon
  DisconnectIcon: typeof LogOutIcon
  SwitchNetworkIcon: typeof SwitchArrowsIcon
  GasIcon: typeof FuelIcon

  constructor(componentLibrary?: Partial<Web3WalletComponentLibrary>) {
    // Utility components
    this.Button = componentLibrary?.Button ?? Button
    this.Switch = componentLibrary?.Switch ?? Switch

    // Special Buttons
    this.TabFullWidthButton = componentLibrary?.TabFullWidthButton ?? TabFullWidthButton
    this.ButtonWithIconSrc = componentLibrary?.ButtonWithIconSrc ?? ButtonWithIconSrc
    this.ButtonWithIconReactNode =
      componentLibrary?.ButtonWithIconReactNode ?? ButtonWithIconReactNode
    this.IconButton = componentLibrary?.IconButton ?? IconButton

    // Special components
    this.CopyToClipboardButton = componentLibrary?.CopyToClipboardButton ?? CopyToClipboardButton
    this.PubKey = componentLibrary?.PubKey ?? PubKey

    // Core UserSheet components
    this.Sheet = componentLibrary?.Sheet ?? Sheet
    this.SheetContent = componentLibrary?.SheetContent ?? SheetContent
    this.SheetDescription = componentLibrary?.SheetDescription ?? SheetDescription

    // Tab components
    this.BackButton = componentLibrary?.BackButton ?? BackButton
    this.SheetHeader = componentLibrary?.SheetHeader ?? SheetHeader
    this.SheetTitle = componentLibrary?.SheetTitle ?? SheetTitle

    // Icon components
    this.CogIcon = componentLibrary?.CogIcon ?? CogIcon
    this.DisconnectIcon = componentLibrary?.DisconnectIcon ?? LogOutIcon
    this.SwitchNetworkIcon = componentLibrary?.SwitchNetworkIcon ?? SwitchArrowsIcon
    this.GasIcon = componentLibrary?.GasIcon ?? FuelIcon
  }
}
