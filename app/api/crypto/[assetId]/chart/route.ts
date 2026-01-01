import { NextResponse } from "next/server";
import type { ChartSeriesPoint } from "@/lib/types";

const buildEndpoint = (assetId: string, days: string) =>
  `https://api.coingecko.com/api/v3/coins/${assetId}/market_chart?vs_currency=usd&days=${days}&interval=hourly`;

interface RouteContext {
  params: Promise<{ assetId: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { assetId } = await context.params;

  if (!assetId) {
    return NextResponse.json({ error: "Missing asset identifier" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const days = searchParams.get("days") ?? "7";

  try {
    const res = await fetch(buildEndpoint(assetId, days), {
      next: { revalidate: 180 }
    });

    if (!res.ok) {
      throw new Error(`Chart feed error: ${res.status}`);
    }

    const json = (await res.json()) as {
      prices: [number, number][];
    };

    const payload: ChartSeriesPoint[] =
      json.prices?.map(([timestamp, price]) => ({
        time: new Date(timestamp).toISOString(),
        price
      })) ?? [];

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "s-maxage=180, stale-while-revalidate=300"
      }
    });
  } catch (error) {
    console.error("[chart-route]", error);
    return NextResponse.json({ error: "Unable to load chart data" }, { status: 500 });
  }
}
