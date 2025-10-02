import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Product } from "./ProductSelector";

type ProductId = "M50" | "T21" | "S21";

interface ProductsTableProps {
  rows: Record<ProductId, Product>;
}

export function ProductsTable({ rows }: ProductsTableProps) {
  const ordered = useMemo(() => (
    ["S21", "T21", "M50"].map((id) => ({ id: id as ProductId, ...(rows[id as ProductId]) }))
  ), [rows]);

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle>Данные продуктов (только чтение из Google Sheets)</CardTitle>
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
                  <TableCell>{row.purchasePrice}</TableCell>
                  <TableCell>{row.performance}</TableCell>
                  <TableCell>{row.miningStartDate || ""}</TableCell>
                  <TableCell>{row.workingDays || ""}</TableCell>
                  <TableCell>{row.minedBTC}</TableCell>
                  <TableCell>{row.dailyMiningCurrent || ""}</TableCell>
                  <TableCell>{row.uptimePercent || ""}</TableCell>
                  <TableCell>{row.roiPercent}</TableCell>
                  <TableCell>{row.paybackPercent || ""}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductsTable;


