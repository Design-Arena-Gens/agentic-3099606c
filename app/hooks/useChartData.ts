import useSWR from "swr";
import type { ChartSeriesPoint } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useChartData = (assetId: string) => {
  const { data, error, isLoading } = useSWR<ChartSeriesPoint[]>(
    assetId ? `/api/crypto/${assetId}/chart?days=7` : null,
    fetcher,
    {
      refreshInterval: 120_000
    }
  );

  return { data, error, isLoading };
};
