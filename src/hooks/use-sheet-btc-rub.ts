import { useQuery } from "@tanstack/react-query";
import { fetchSheetCSV } from "@/lib/sheets";

function getProductsSheetUrl(): string {
  const envUrl = import.meta.env.VITE_PRODUCTS_SHEET_URL as string | undefined;
  // fallback: same as used in OverviewTab
  const fallback = "https://docs.google.com/spreadsheets/d/1YOMZZBSoS4-4H65c_dJP5O1nzhA2g1H_e-t_Okmmqlk/export?format=csv&gid=0";
  return envUrl || fallback;
}

export type SheetBtcRub = { raw: string; value: number };

async function fetchBtcRubFromSheet(): Promise<SheetBtcRub> {
  const url = getProductsSheetUrl();
  const rows = await fetchSheetCSV(url);
  if (!rows.length) throw new Error("Sheet is empty");

  // User requested cell J2 with header `btcPriceRub`.
  // Our CSV parser returns objects keyed by headers for row 1..n (J column header likely `btcPriceRub`).
  // So pick the first data row and read field by header.
  const first = rows[0] as Record<string, string>;
  const rawCell = (first["btcPriceRub"] ?? first["btcRubPrice"] ?? "").trim();

  // Preserve exact formatting from sheet for display (spaces/commas/dots/₽ if present)
  const raw = rawCell;

  // Numeric version: strip currency/spaces, unify decimal comma to dot
  const standardized = rawCell
    .replace(/\s+/g, "")
    .replace(/₽|RUB/gi, "")
    .replace(/,/g, ".");
  const value = Number(standardized.replace(/[^0-9.\-]/g, ""));
  if (!Number.isFinite(value)) throw new Error("Invalid btcPriceRub in sheet");
  return { raw, value };
}

export function useSheetBtcRub(options?: { refetchIntervalMs?: number }) {
  const refetchIntervalMs = options?.refetchIntervalMs ?? 30000; // 30s default for sheet
  return useQuery<SheetBtcRub>({
    queryKey: ["sheet-btc-rub-price"],
    queryFn: fetchBtcRubFromSheet,
    refetchInterval: refetchIntervalMs,
    staleTime: 15000,
    refetchOnWindowFocus: true,
  });
}


