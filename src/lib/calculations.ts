// Bitbybit Protocol Calculations

export const PROTOCOL_FEE_BPS = 200 // 2.00% = 200 basis points
export const BASE_APY = 0.12 // 12% annual yield

export interface LockCalculation {
  depositAmount: number
  techFee: number
  netPrincipal: number
  projectedYield: number
  totalToCharity: number
  maturityDate: Date
  effectiveReturn: number // % increase over deposit
}

export function calculateLockProjection(
  depositAmount: number,
  durationMonths: number
): LockCalculation {
  // Calculate 2% technology fee
  const techFee = depositAmount * (PROTOCOL_FEE_BPS / 10000)
  
  // Net principal after fee
  const netPrincipal = depositAmount - techFee
  
  // Calculate projected yield based on duration
  const yearsLocked = durationMonths / 12
  const projectedYield = netPrincipal * BASE_APY * yearsLocked
  
  // Total charity receives
  const totalToCharity = netPrincipal + projectedYield
  
  // Calculate maturity date
  const maturityDate = new Date()
  maturityDate.setMonth(maturityDate.getMonth() + durationMonths)
  
  // Effective return (how much more charity gets vs. deposit)
  const effectiveReturn = ((totalToCharity - depositAmount) / depositAmount) * 100
  
  return {
    depositAmount,
    techFee,
    netPrincipal,
    projectedYield,
    totalToCharity,
    maturityDate,
    effectiveReturn,
  }
}

export const LOCK_DURATIONS = [
  { months: 6, label: '6 Months' },
  { months: 12, label: '12 Months' },
  { months: 18, label: '18 Months' },
  { months: 24, label: '24 Months' },
] as const

export const WHALETRAP_TIERS = [
  { name: 'Plankton', bbbRequired: 0, feeRate: 2.0 },
  { name: 'Dolphin', bbbRequired: 50000, feeRate: 1.5 },
  { name: 'Shark', bbbRequired: 250000, feeRate: 1.0 },
  { name: 'Whale', bbbRequired: 1000000, feeRate: 0.5 },
] as const
