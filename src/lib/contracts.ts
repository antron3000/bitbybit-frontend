export const USDC_POLYGON = {
  address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' as const,
  decimals: 6,
  symbol: 'USDC',
} as const

export const USDC_MAINNET = {
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as const,
  decimals: 6,
  symbol: 'USDC',
} as const

export const USDC_ARBITRUM = {
  address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831' as const,
  decimals: 6,
  symbol: 'USDC',
} as const

export const USDC_OPTIMISM = {
  address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607' as const,
  decimals: 6,
  symbol: 'USDC',
} as const

export const getUSDCContract = (chainId: number) => {
  switch (chainId) {
    case 137: // Polygon
      return USDC_POLYGON
    case 1: // Mainnet
      return USDC_MAINNET
    case 42161: // Arbitrum
      return USDC_ARBITRUM
    case 10: // Optimism
      return USDC_OPTIMISM
    default:
      return USDC_POLYGON
  }
}
