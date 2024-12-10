export const siteMetadata = (props: { title?: string; description?: string; image?: string }) => {
  const { title, description, image } = props
  return {
    metadataBase: 'localhost:3000',
    title: 'Web3 Wallet Demo',
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
  }
}

export const wagmiMetadata = {
  name: 'Web3 Wallet Demo',
  description: 'Web3 Wallet Demo',
  url: 'localhost:3000',
}
