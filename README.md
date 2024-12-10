# Web3Sheet

A simple and powerful way to connect web3 wallets to react apps.

## Getting Started

Web3Sheet is a collection of packages that can be used to build a web3 wallet experience for your users. It includes a UI library, a core library, and a wallet library.

The recommended way to use Web3Sheet is to install all the packages and use our wallet sheet. The entire sheet is fully modular and customizable, you can even use your own UI components.

### Installation (Everything)

```sh
npm install @web3sheet/ui @web3sheet/core @web3sheet/wallet
```

### Usage

```tsx
// WalletUserSheet.tsx
'use client';

import '@web3sheet/ui/styles';

import { networksTab, UserSheet, walletTab } from '@web3sheet/wallet';

export default function WalletUserSheet() {
  return (
    <UserSheet
      config={{
        tabs: [
          walletTab({ roundingDecimals: 2 }),
          networksTab({}),
        ],
      }}
    />
  );
}
```

```tsx
// app.tsx
import { createWeb3WalletConfig, QueryProvider, WalletProvider } from '@web3sheet/core';
import { mainnet } from 'viem/chains';

import { WalletUserSheet } from './WalletUserSheet';

const config = createWeb3WalletConfig({
  wagmiConfig: {
    chains: [mainnet],
  },
});

function App() {
  return (
    <WalletProvider config={config}>
      <WalletUserSheet />
    </WalletProvider>
  )
}
```

## Packages

| Package | Description |
| --- | --- |
| [@web3sheet/core](https://github.com/web3sheet/web3sheet/tree/main/packages/core) | The core library for Web3Sheet. It provides the core functionality for connecting wallets and managing the user's wallet.
| [@web3sheet/ui](https://github.com/web3sheet/web3sheet/tree/main/packages/ui) | The UI library for Web3Sheet.
| [@web3sheet/wallet](https://github.com/web3sheet/web3sheet/tree/main/packages/wallet) | The wallet library for Web3Sheet.