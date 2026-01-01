# GlobeX Markets – Crypto & Forex Intelligence Hub

GlobeX Markets is a full-stack trading intelligence platform that unifies digital asset and FX
telemetry, strategy automation, and global coverage into a single web experience.

## 🚀 Quickstart

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser to explore the platform UI.

## 🧠 Feature Highlights

- **Live Market Dashboard** – Real-time crypto and FX pricing, volatility, and liquidity metrics
  with streaming refresh.
- **Interactive Analytics** – Hourly price action charts powered by CoinGecko market feeds.
- **Institutional Playbooks** – Ready-to-deploy strategy frameworks and automation blueprints.
- **Global Coverage Map** – Snapshot of regional capabilities, regulatory readiness, and partners.
- **Institutional Onboarding** – Contact workflow that collects mission briefs for bespoke launches.

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/) with the App Router
- [React 18](https://react.dev/) + Server/Client component composition
- [SWR](https://swr.vercel.app/) for data fetching and revalidation
- [Chart.js](https://www.chartjs.org/) via `react-chartjs-2` for visual analytics

## 🔌 External Data Sources

- **CoinGecko** – Digital asset pricing & chart data
- **ExchangeRate.host** – FX pairs with 24h change calculations

## 📦 Scripts

- `npm run dev` – Start the development server
- `npm run build` – Create a production build
- `npm run start` – Serve the production build locally
- `npm run lint` – Run Next.js lint checks

## 📁 Key Paths

- `app/page.tsx` – Page composition
- `app/components/` – UI modules
- `app/api/` – Serverless endpoints powering data and form submission
- `app/globals.css` – Global styling theme

## 🔒 Notes

The contact API currently logs submissions server-side. Integrate your preferred CRM, ticketing
system, or secure messaging channel to operationalize inbound requests.
