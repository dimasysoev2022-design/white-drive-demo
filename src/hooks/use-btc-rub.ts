import { useQuery } from "@tanstack/react-query";

type BtcPriceResponse = {
  // EXMO v1.1 ticker response subset
  [symbol: string]: {
    buy_price: string;
    sell_price: string;
    last_trade: string;
    low: string;
    high: string;
    avg: string;
    vol: string;
    vol_curr: string;
    updated: number;
  };
};

async function fetchBtcRubPrice(): Promise<number> {
  // Using EXMO public ticker: https://api.exmo.com/v1.1/ticker
  // Pair for BTC/RUB is BTC_RUB
  const response = await fetch("https://api.exmo.com/v1.1/ticker", {
    // Avoid sending cookies; use GET simple request
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch EXMO ticker: ${response.status}`);
  }

  const data = (await response.json()) as BtcPriceResponse;
  const ticker = data["BTC_RUB"];
  if (!ticker) {
    throw new Error("BTC_RUB pair not found in EXMO response");
  }

  // Use last trade as the current price, parse to number
  const price = Number(ticker.last_trade);
  if (!Number.isFinite(price)) {
    throw new Error("Invalid BTC_RUB price value");
  }
  return price;
}

export function useBtcRub(options?: { refetchIntervalMs?: number }) {
  const refetchIntervalMs = options?.refetchIntervalMs ?? 15000; // 15s

  return useQuery<number>({
    queryKey: ["btc-rub-price"],
    queryFn: fetchBtcRubPrice,
    refetchInterval: refetchIntervalMs,
    staleTime: 5000,
    refetchOnWindowFocus: true,
  });
}


