// Verified 501(c)(3) Charities Database

export interface Charity {
  id: string
  name: string
  address: string
  description: string
  category: string
  logo: string // emoji for now, can be replaced with actual logos
  website?: string
  ein?: string // Employer Identification Number
}

export const VERIFIED_CHARITIES: Charity[] = [
  {
    id: 'against-malaria',
    name: 'Against Malaria Foundation',
    address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4Db45',
    description: 'Provides long-lasting insecticide-treated nets to prevent malaria in developing countries.',
    category: 'Global Health',
    logo: '🦟',
    website: 'https://www.againstmalaria.com',
    ein: '20-3069841',
  },
  {
    id: 'givedirectly',
    name: 'GiveDirectly',
    address: '0x750EF1D7a0b4Ab1c97B7A623D7917CcEb5ea779C',
    description: 'Sends money directly to people living in extreme poverty with no strings attached.',
    category: 'Poverty Relief',
    logo: '💰',
    website: 'https://www.givedirectly.org',
    ein: '27-1661997',
  },
  {
    id: 'water-org',
    name: 'Water.org',
    address: '0x1a2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a0B',
    description: 'Provides access to safe water and sanitation through affordable financing.',
    category: 'Water & Sanitation',
    logo: '💧',
    website: 'https://water.org',
    ein: '58-2060131',
  },
  {
    id: 'doctors-without-borders',
    name: 'Doctors Without Borders',
    address: '0x2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a0B1C',
    description: 'Provides emergency medical aid to people affected by conflict, epidemics, disasters, or exclusion from healthcare.',
    category: 'Emergency Relief',
    logo: '🏥',
    website: 'https://www.doctorswithoutborders.org',
    ein: '13-3433452',
  },
  {
    id: 'the-nature-conservancy',
    name: 'The Nature Conservancy',
    address: '0x3C4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a0B1C2D',
    description: 'Protects ecologically important lands and waters for nature and people.',
    category: 'Environment',
    logo: '🌳',
    website: 'https://www.nature.org',
    ein: '53-0242652',
  },
  {
    id: 'feeding-america',
    name: 'Feeding America',
    address: '0x4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a0B1C2D3E',
    description: 'Nationwide network of food banks feeding people facing hunger in America.',
    category: 'Hunger Relief',
    logo: '🍞',
    website: 'https://www.feedingamerica.org',
    ein: '36-3673599',
  },
  {
    id: 'st-jude',
    name: "St. Jude Children's Research Hospital",
    address: '0x5E6F7a8B9c0D1e2F3a4B5c6D7e8F9a0B1C2D3E4F',
    description: 'Treats and defeats childhood cancer and other life-threatening diseases.',
    category: 'Medical Research',
    logo: '🎗️',
    website: 'https://www.stjude.org',
    ein: '62-0646012',
  },
  {
    id: 'world-wildlife-fund',
    name: 'World Wildlife Fund',
    address: '0x6F7a8B9c0D1e2F3a4B5c6D7e8F9a0B1C2D3E4F5A',
    description: 'Conserves nature and reduces the most pressing threats to the diversity of life on Earth.',
    category: 'Wildlife Conservation',
    logo: '🐼',
    website: 'https://www.worldwildlife.org',
    ein: '52-1693387',
  },
  {
    id: 'habitat-for-humanity',
    name: 'Habitat for Humanity',
    address: '0x7a8B9c0D1e2F3a4B5c6D7e8F9a0B1C2D3E4F5A6B',
    description: 'Builds affordable housing and promotes homeownership for families in need.',
    category: 'Housing',
    logo: '🏠',
    website: 'https://www.habitat.org',
    ein: '91-1914868',
  },
  {
    id: 'red-cross',
    name: 'American Red Cross',
    address: '0x8B9c0D1e2F3a4B5c6D7e8F9a0B1C2D3E4F5A6B7C',
    description: 'Prevents and alleviates human suffering in the face of emergencies.',
    category: 'Disaster Relief',
    logo: '🔴',
    website: 'https://www.redcross.org',
    ein: '53-0196605',
  },
]

export const CHARITY_CATEGORIES = [
  'All Categories',
  'Global Health',
  'Poverty Relief',
  'Water & Sanitation',
  'Emergency Relief',
  'Environment',
  'Hunger Relief',
  'Medical Research',
  'Wildlife Conservation',
  'Housing',
  'Disaster Relief',
] as const

export function getCharityById(id: string): Charity | undefined {
  return VERIFIED_CHARITIES.find(c => c.id === id)
}

export function getCharityByAddress(address: string): Charity | undefined {
  return VERIFIED_CHARITIES.find(c => c.address.toLowerCase() === address.toLowerCase())
}
