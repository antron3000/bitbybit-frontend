# Bitbybit

Decentralized philanthropic yield infrastructure. Lock your USDC principal, stream high-yield returns to charities. Your capital returns at maturity—charities receive more than you donated.

## Features

- 🔗 **Web3 Wallet Integration** - Connect with MetaMask, WalletConnect, and more
- 💰 **USDC Charity Locks** - Lock your principal for 3, 6, 12, or 24 months
- 🎯 **10 Verified Charities** - Support causes from global health to environmental conservation
- 📊 **Real-time Dashboard** - Track your active locks, yield generated, and impact
- 🔍 **Charity Discovery** - Browse and filter charities by category with APY rates
- ✨ **Beautiful UI** - Modern design with purple/pink gradients and smooth animations

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Wagmi + RainbowKit** - Web3 integration
- **Framer Motion** - Animations
- **Viem** - Ethereum interactions

## Project Structure

```
src/
├── app/
│   ├── discover/      # Charity discovery page
│   ├── donate/        # Donation flow
│   └── dashboard/     # User dashboard
├── components/        # Reusable components
└── lib/              # Utilities and data
```

## License

MIT
