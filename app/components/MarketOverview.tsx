'use client';

import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import type { TooltipItem } from "chart.js";
import { useMarketData } from "../hooks/useMarketData";
import { useChartData } from "../hooks/useChartData";
import type { CryptoAsset, ForexPair } from "@/lib/types";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const rateFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 4
});

const percentageFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 2
});

const MarketOverview = () => {
  const { data, error, isLoading, refresh } = useMarketData();
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const activeAssetId =
    selectedAsset ??
    (data?.crypto && data.crypto.length > 0 ? data.crypto[0]?.id ?? null : null);

  const { data: chartData, isLoading: isChartLoading } = useChartData(activeAssetId ?? "");

  const cryptoAssets = data?.crypto ?? [];
  const forexPairs = data?.forex ?? [];

  const lineChartData = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return undefined;
    }

    return {
      labels: chartData.map((point) =>
        new Date(point.time).toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          month: "short",
          day: "numeric"
        })
      ),
      datasets: [
        {
          label: activeAssetId?.toUpperCase() ?? "Asset",
          data: chartData.map((point) => point.price),
          fill: {
            target: "origin",
            above: "rgba(56, 189, 248, 0.25)"
          },
          borderColor: "#38bdf8",
          pointRadius: 0,
          tension: 0.35,
          borderWidth: 2.5
        }
      ]
    };
  }, [chartData, activeAssetId]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 6,
            color: "#94a3b8"
          },
          grid: {
            color: "rgba(148, 163, 184, 0.08)"
          }
        },
        y: {
          ticks: {
            callback: (value: number | string) =>
              typeof value === "number" ? `$${value.toFixed(0)}` : value,
            color: "#94a3b8"
          },
          grid: {
            color: "rgba(148, 163, 184, 0.08)"
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: "#f8fafc"
          }
        },
        tooltip: {
          callbacks: {
            label: (item: TooltipItem<"line">) => `$${item.parsed.y.toLocaleString()}`
          }
        }
      }
    }),
    []
  );

  const renderCryptoRow = (asset: CryptoAsset) => {
    const isPositive = asset.change24h >= 0;
    return (
      <button
        key={asset.id}
        onClick={() => setSelectedAsset(asset.id)}
        className="glass"
        style={{
          padding: "1.2rem",
          textAlign: "left",
          border:
            asset.id === activeAssetId
              ? "1px solid rgba(56, 189, 248, 0.65)"
              : "1px solid rgba(148, 163, 184, 0.15)",
          background:
            asset.id === activeAssetId
              ? "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(14,165,233,0.05))"
              : "rgba(13,16,27,0.6)",
          cursor: "pointer"
        }}
      >
        <div className="status" style={{ textTransform: "uppercase" }}>
          {asset.symbol}
        </div>
        <div className="card-title">{asset.name}</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.6rem" }}>
          <div className="card-value" style={{ fontSize: "1.3rem" }}>
            {formatter.format(asset.price)}
          </div>
          <div
            className="card-change"
            style={{ color: isPositive ? "var(--success)" : "var(--danger)" }}
          >
            {isPositive ? "+" : ""}
            {asset.change24h?.toFixed(2)}%
          </div>
        </div>
        <div className="status" style={{ marginTop: "0.6rem", fontSize: "0.85rem" }}>
          MCAP {formatter.format(asset.marketCap)} &middot; 24H Vol{" "}
          {formatter.format(asset.volume)}
        </div>
      </button>
    );
  };

  const renderForexRow = (pair: ForexPair) => {
    const isPositive = pair.change24h >= 0;
    return (
      <div key={pair.symbol} className="glass" style={{ padding: "1rem 1.2rem" }}>
        <div className="status" style={{ textTransform: "uppercase" }}>
          {pair.symbol}
        </div>
        <div className="card-value" style={{ fontSize: "1.1rem" }}>
          {rateFormatter.format(pair.rate)}
        </div>
        <div
          className="card-change"
          style={{ color: isPositive ? "var(--success)" : "var(--danger)", marginTop: "0.25rem" }}
        >
          {isPositive ? "+" : ""}
          {percentageFormatter.format(pair.change24h / 100)}
        </div>
      </div>
    );
  };

  return (
    <section className="section" id="intelligence">
      <div className="container">
        <div className="badge-pill">Live market intelligence</div>
        <h2 className="section-heading" style={{ marginTop: "0.5rem" }}>
          Multi-asset telemetry across crypto & forex venues
        </h2>
        <p className="section-description">
          Monitor price action, volatility, and liquidity in real time. Activate curated strategies
          with a single click, rest assured that our adaptive engine will rebalance as the market
          evolves.
        </p>
        <div className="split">
          <div className="glass" style={{ padding: "1.75rem", display: "grid", gap: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div className="status">Crypto order flow</div>
                <h3 style={{ margin: "0.35rem 0 0" }}>Top digital assets</h3>
              </div>
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => refresh()}
                disabled={isLoading}
                style={{ fontSize: "0.85rem", padding: "0.6rem 1.1rem" }}
              >
                Refresh
              </button>
            </div>
            {error && <div className="status error">Feed unavailable. Retry shortly.</div>}
            {isLoading && !data && <div className="status">Loading markets...</div>}
            <div className="grid" style={{ gap: "1rem" }}>
              {cryptoAssets.map((asset) => renderCryptoRow(asset))}
            </div>
          </div>
          <div className="glass" style={{ padding: "1.75rem", display: "grid", gap: "1.25rem" }}>
            <div>
              <div className="status">Selected asset</div>
              <h3 style={{ margin: "0.35rem 0 0" }}>{activeAssetId?.toUpperCase() ?? "—"}</h3>
            </div>
            <div style={{ minHeight: "280px", position: "relative" }}>
              {isChartLoading && (
                <div className="status" style={{ position: "absolute" }}>
                  Loading price action...
                </div>
              )}
              {lineChartData && (
                <Line data={lineChartData} options={chartOptions} height={280} width={520} />
              )}
              {!isChartLoading && !lineChartData && (
                <div className="status">No chart data available.</div>
              )}
            </div>
            <div className="glass" style={{ padding: "1.2rem", background: "rgba(8,11,19,0.55)" }}>
              <div className="status">Forex scanner</div>
              <div className="grid" style={{ marginTop: "0.9rem", gap: "0.9rem" }}>
                {forexPairs.map((pair) => renderForexRow(pair))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketOverview;
