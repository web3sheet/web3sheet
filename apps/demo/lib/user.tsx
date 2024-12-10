'use client'

import UserProviderGeneric from '@web3sheet/preferences/providers/user-provider'

type UserPreferences = {
  hiddenStakedNodes?: string[]
  hiddenPreparedRegistrations?: string[]
  forceShowPendingNodesModule?: boolean
}

export const UserProvider = UserProviderGeneric<UserPreferences>
