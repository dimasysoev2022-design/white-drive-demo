import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Product } from "./ProductSelector";

type ProductId = "M50" | "T21" | "S21";

export type ProductTableRow = Product & { id: ProductId };

interface EditableProductTableProps {
  initialRows: Record<ProductId, Product>;
  onChange?: (rows: Record<ProductId, Product>) => void;
}

const STORAGE_KEY = "white.products.table.v1";

export function EditableProductTable({ initialRows, onChange }: EditableProductTableProps) {
  const initialState = useMemo(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved) {
      try {
        return JSON.parse(saved) as Record<ProductId, Product>;
      } catch {}
    }
    return initialRows;
  }, [initialRows]);

  const [rows, setRows] = useState<Record<ProductId, Product>>(initialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    onChange?.(rows);
  }, [rows, onChange]);

  const ordered: ProductTableRow[] = useMemo(() => (
    ["S21", "T21", "M50"].map((id) => ({ id: id as ProductId, ...(rows[id as ProductId]) }))
  ), [rows]);

  const update = (id: ProductId, field: keyof Product, value: string) => {
    setRows((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const reset = () => setRows(initialRows);

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle>Данные продуктов (редактируемая таблица)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[160px]">Продукт</TableHead>
                <TableHead>Цена покупки</TableHead>
                <TableHead>Производительность</TableHead>
                <TableHead>Старт майнинга</TableHead>
                <TableHead>Дней работает</TableHead>
                <TableHead>BTC всего</TableHead>
                <TableHead>Ежедневная добыча</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Доходность %</TableHead>
                <TableHead>Окупаемость %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordered.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium whitespace-nowrap">{row.name}</TableCell>
                  <TableCell>
                    <Input value={row.purchasePrice} onChange={(e) => update(row.id, "purchasePrice", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input value={row.performance} onChange={(e) => update(row.id, "performance", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input value={row.miningStartDate || ""} onChange={(e) => update(row.id, "miningStartDate", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input value={row.workingDays || ""} onChange={(e) => update(row.id, "workingDays", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input value={row.minedBTC} onChange={(e) => update(row.id, "minedBTC", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input value={row.dailyMiningCurrent || ""} onChange={(e) => update(row.id, "dailyMiningCurrent", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input value={row.uptimePercent || ""} onChange={(e) => update(row.id, "uptimePercent", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input value={row.roiPercent} onChange={(e) => update(row.id, "roiPercent", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input value={row.paybackPercent || ""} onChange={(e) => update(row.id, "paybackPercent", e.target.value)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" onClick={reset}>Сбросить к дефолту</Button>
        </div>
      </CardContent>
    </Card>
  );
}


