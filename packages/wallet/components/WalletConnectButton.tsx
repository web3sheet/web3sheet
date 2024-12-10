import { useEthereumProvider } from '@web3sheet/core/providers/wallet-provider'

export function WalletConnectButton() {
  const ethereumProvider = useEthereumProvider()

  const handleClick = async () => {
    if (!ethereumProvider) {
      console.error('Ethereum provider was not initialized')
      return
    }
    await ethereumProvider.connect()
  }

  return <button onClick={handleClick}>Connect with Wallet Connect</button>
}
