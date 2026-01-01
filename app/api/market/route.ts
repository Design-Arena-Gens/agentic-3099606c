import { NextResponse } from "next/server";
import type { CryptoAsset, ForexPair, MarketPayload } from "@/lib/types";

interface CoinGeckoMarket {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

const CRYPTO_ENDPOINT =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false&price_change_percentage=24h";
const FOREX_SYMBOLS = ["EUR", "GBP", "JPY", "AUD", "CAD", "CNY"] as const;

const formatDate = (date: Date) => date.toISOString().split("T")[0] ?? "";

const getForexEndpoint = (start: Date, end: Date) => {
  const params = new URLSearchParams({
    base: "USD",
    symbols: FOREX_SYMBOLS.join(","),
    start_date: formatDate(start),
    end_date: formatDate(end)
  });

  return `https://api.exchangerate.host/timeseries?${params.toString()}`;
};

const mapCrypto = (payload: CoinGeckoMarket[]): CryptoAsset[] =>
  payload.map((item) => ({
    id: item.id,
    symbol: item.symbol?.toUpperCase() ?? "",
    name: item.name ?? "",
    price: item.current_price ?? 0,
    change24h: item.price_change_percentage_24h ?? 0,
    marketCap: item.market_cap ?? 0,
    volume: item.total_volume ?? 0
  }));

const mapForex = (payload: Record<string, Record<string, number>>): ForexPair[] => {
  const sortedDates = Object.keys(payload).sort();
  if (sortedDates.length === 0) {
    return [];
  }

  const endDateKey = sortedDates[sortedDates.length - 1]!;
  const previousDateKey =
    sortedDates.length > 1 ? sortedDates[sortedDates.length - 2]! : sortedDates[0]!;

  return FOREX_SYMBOLS.map((symbol) => {
    const latest = payload[endDateKey]?.[symbol] ?? 0;
    const previous = payload[previousDateKey]?.[symbol] ?? latest;
    const changePercentage = previous !== 0 ? ((latest - previous) / previous) * 100 : 0;

    return {
      symbol: `${symbol}/USD`,
      rate: latest,
      change24h: changePercentage
    };
  });
};

export async function GET() {
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 1);

  try {
    const [cryptoRes, forexRes] = await Promise.all([
      fetch(CRYPTO_ENDPOINT, {
        next: { revalidate: 60 }
      }),
      fetch(getForexEndpoint(startDate, endDate), {
        next: { revalidate: 300 }
      })
    ]);

    if (!cryptoRes.ok) {
      throw new Error(`Crypto feed error: ${cryptoRes.status}`);
    }

    if (!forexRes.ok) {
      throw new Error(`Forex feed error: ${forexRes.status}`);
    }

    const cryptoJson = (await cryptoRes.json()) as CoinGeckoMarket[];
    const forexJson = (await forexRes.json()) as {
      rates: Record<string, Record<string, number>>;
    };

    const response: MarketPayload = {
      timestamp: Date.now(),
      crypto: mapCrypto(cryptoJson),
      forex: mapForex(forexJson.rates)
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=120"
      }
    });
  } catch (error) {
    console.error("[market-route]", error);
    return NextResponse.json(
      {
        error: "Unable to load market intelligence feed"
      },
      { status: 500 }
    );
  }
}
