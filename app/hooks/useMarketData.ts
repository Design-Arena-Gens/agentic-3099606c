import useSWR from "swr";
import type { MarketPayload } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useMarketData = () => {
  const { data, error, isLoading, mutate } = useSWR<MarketPayload>("/api/market", fetcher, {
    refreshInterval: 60_000
  });

  return {
    data,
    error,
    isLoading,
    refresh: mutate
  };
};
