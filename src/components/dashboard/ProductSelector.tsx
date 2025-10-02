import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server } from "lucide-react";

export interface Product {
  name: string;
  year: string;
  description: string;
  purchasePrice: string;
  performance: string;
  purchaseDate?: string;
  miningStartDate?: string;
  currentProfit: string;
  minedBTC: string;
  btcPriceRub: string;
  btcRubPrice?: string;
  minedBTCRub?: string;
  dailyMiningCurrentRub?: string;
  workingDays: string;
  roiPercent: string;
  monthlyStats?: Array<{ month: string; btc: string; rub: string }>;
  dailyMiningCurrent?: string;
  uptimePercent?: string;
  paybackPercent?: string;
}

interface ProductSelectorProps {
  selectedProduct: 'M50' | 'T21' | 'S21';
  onProductSelect: (product: 'M50' | 'T21' | 'S21') => void;
}

export const ProductSelector = ({ selectedProduct, onProductSelect }: ProductSelectorProps) => {
  const products = [
    {
      id: 'M50' as const,
      name: 'Whatsminer M50',
      performance: '120 TH/s',
      description: 'Первый продукт, который мы запустили',
      date: 'с 1 апреля 2023 по 1 июня 2024',
      soldOut: true
    },
    {
      id: 'T21' as const,
      name: 'Antminer T21', 
      performance: '190 TH/s',
      description: 'Второй продукт в нашей линейке',
      date: 'с 1 июня 2024 по 1 сентября 2025',
      soldOut: true
    },
    {
      id: 'S21' as const,
      name: 'Antminer S21',
      performance: '235 TH/s', 
      description: 'Актуальный продукт',
      date: 'дата запуска: 1 сентября 2025',
      soldOut: false
    }
  ];

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Server className="w-5 h-5 mr-2 text-primary" />
          Продукты WHITE
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Для вашего удобства мы подготовили три варианта наших продуктов — каждый
          рассчитан на бюджет 1 000 000 ₽. Это позволяет сразу увидеть финансовый
          результат как по актуальному продукту, доступному к покупке сейчас,
          так и сопоставить его с результатами, которых уже достигли клиенты в
          прошлых релизах вместе с нами.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="relative">
              {/* Ribbons */}
              {product.soldOut ? (
                <div
                  className="pointer-events-none absolute top-2 right-2 rotate-[30deg] z-10"
                  aria-hidden
                >
                  <div className="w-24 py-0.5 text-[10px] text-center font-bold tracking-widest uppercase bg-destructive text-destructive-foreground shadow-md rounded-none">
                    SOLD OUT!
                  </div>
                </div>
              ) : (
                <div
                  className="pointer-events-none absolute top-2 right-2 rotate-[30deg] z-10"
                  aria-hidden
                >
                  <div className="w-24 py-0.5 text-[10px] text-center font-bold tracking-widest uppercase bg-emerald-500 text-emerald-950 shadow-md rounded-none">
                    AVAILABLE
                  </div>
                </div>
              )}
              <Button
                variant={selectedProduct === product.id ? 'default' : 'outline'}
                onClick={() => onProductSelect(product.id)}
                className={`w-full p-6 h-auto flex flex-col items-center text-center space-y-3 transition-colors duration-200 ${
                  selectedProduct === product.id 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'hover:bg-primary/5 hover:border-primary/50'
                } ${product.soldOut ? 'relative opacity-90' : ''}`}
              >
                <div className="text-2xl font-bold flex items-center gap-2">
                  {product.name}
                </div>
                <div className="text-lg font-semibold">{product.performance}</div>
                <div className={`text-sm leading-tight ${product.soldOut ? 'opacity-80' : 'opacity-90'}`}>{product.description}</div>
                <div className="text-xs opacity-75 leading-tight">{product.date}</div>
                {product.soldOut && (
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-destructive font-semibold">
                    Недоступно для покупки
                  </div>
                )}
                {!product.soldOut && (
                  <div className="mt-1 text-[12px] tracking-wider text-emerald-400 font-semibold">
                    доступно для покупки
                  </div>
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};