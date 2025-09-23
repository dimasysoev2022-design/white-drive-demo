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
      name: 'M50 Antminer',
      performance: '120 TH/s',
      description: 'Первый продукт, который мы запустили',
      date: 'с 1 апреля 2023 по 1 июня 2024'
    },
    {
      id: 'T21' as const,
      name: 'T21 Whatsminer', 
      performance: '190 TH/s',
      description: 'Второй продукт в нашей линейке',
      date: 'с 1 июня 2024 по 1 сентября 2025'
    },
    {
      id: 'S21' as const,
      name: 'S21 Antminer',
      performance: '200 TH/s', 
      description: 'Актуальный продукт',
      date: 'дата запуска: 1 сентября 2025'
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <Button
              key={product.id}
              variant={selectedProduct === product.id ? 'default' : 'outline'}
              onClick={() => onProductSelect(product.id)}
              className={`p-6 h-auto flex flex-col items-center text-center space-y-3 transition-all duration-200 ${
                selectedProduct === product.id 
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                  : 'hover:bg-primary/5 hover:border-primary/50 hover:scale-102'
              }`}
            >
              <div className="text-2xl font-bold">{product.name}</div>
              <div className="text-lg font-semibold">{product.performance}</div>
              <div className="text-sm opacity-90 leading-tight">{product.description}</div>
              <div className="text-xs opacity-75 leading-tight">{product.date}</div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};