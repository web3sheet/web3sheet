import { EthereumProvider, type EthereumProviderOptions } from '@walletconnect/ethereum-provider'

export type ArrayOneOrMore<T> = {
  0: T
} & T[]

type Chain = number
export type WalletConnectMetadata = EthereumProviderOptions['metadata']

export type WalletConnectConfig = {
  /** Your project ID obtained from WalletConnect Cloud: https://cloud.walletconnect.com/ */
  projectId: string
  /** Your application's metadata. It is important to set the correct URL as this will later be used by the Verify API to check if your domain has been verified. */
  walletConnectMetadata?: WalletConnectMetadata
  /** Defaults to true */
  showQrModal?: boolean
}

export type CreateEthereumProviderParams = {
  walletConnectConfig: WalletConnectConfig
  /** An array of the chain IDs you want to support. It is highly recommended to use "optionalChains" over "chains" for multi-chain dapps, this will ensure compatibility with Smart Contract Wallets. */
  chains: ArrayOneOrMore<Chain>
}

export async function createEthereumProvider({
  walletConnectConfig,
  chains,
}: CreateEthereumProviderParams) {
  const { projectId, walletConnectMetadata, showQrModal = true } = walletConnectConfig

  return EthereumProvider.init({
    projectId,
    metadata: walletConnectMetadata,
    showQrModal,
    optionalChains: chains,
  })
}
