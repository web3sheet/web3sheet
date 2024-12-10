import { UserSheetWithLocales } from '@/components/UserSheetWithLocales'
import { GlobalProvider } from '@/providers/global-provider'
import { headers } from 'next/headers'
import type { ReactNode } from 'react'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const wagmiCookie = (await headers()).get('cookie')

  return (
    <GlobalProvider wagmiCookie={wagmiCookie}>
      <html>
        <body className="bg-web3sheet-black text-web3sheet-text overflow-x-hidden">
          <main>{children}</main>
          <UserSheetWithLocales />
        </body>
      </html>
    </GlobalProvider>
  )
}
