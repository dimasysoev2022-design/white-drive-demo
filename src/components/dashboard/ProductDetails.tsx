import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { Product } from "./ProductSelector";

// Функция для определения цвета прогресс-бара на основе значения
const getProgressColor = (value: number): string => {
  if (value <= 20) {
    // 0-20: от ярко-красного к менее красному
    const intensity = value / 20;
    const red = 255;
    const green = Math.floor(50 + (100 - 50) * intensity);
    const blue = Math.floor(50 + (100 - 50) * intensity);
    return `rgb(${red}, ${green}, ${blue})`;
  } else if (value <= 50) {
    // 21-50: желтый
    return '#fbbf24';
  } else {
    // 51-100+: зеленый
    return '#10b981';
  }
};

interface ProductDetailsProps {
  product: Product;
  productId: 'M50' | 'T21' | 'S21';
}

export const ProductDetails = ({ product, productId }: ProductDetailsProps) => {
  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="text-center">
          {product.name} - {product.description}
        </CardTitle>
        <CardDescription className="text-center">
          Детальная информация о продукте
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Основная информация для всех продуктов */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="text-sm text-muted-foreground mb-1">Цена карты на момент покупки</div>
              <div className="text-lg font-bold">{product.purchasePrice}</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="text-sm text-muted-foreground mb-1">Производительность карты</div>
              <div className="text-lg font-bold">{product.performance}</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="text-sm text-muted-foreground mb-1">Дата начала майнинга</div>
              <div className="text-lg font-bold">{product.miningStartDate || product.purchaseDate}</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="text-sm text-muted-foreground mb-1">Дней работает</div>
              <div className="text-lg font-bold">{product.workingDays}</div>
            </div>
          </div>

          {/* Доходность и добыча */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="p-4 rounded-lg bg-success/10">
              <div className="text-sm text-muted-foreground mb-1">Добыто биткоина всего</div>
              <div className="text-xl font-bold text-success">{product.minedBTC} BTC</div>
              <div className="text-sm text-muted-foreground">
                {(() => {
                  // 1) приоритет: готовое значение из таблицы minedBTC (RUB)
                  if (product.minedBTCRub && product.minedBTCRub.trim()) {
                    return `≈ ${product.minedBTCRub}`;
                  }
                  // 2) расчет через btcRubPrice
                  const btc = parseFloat(product.minedBTC || '0');
                  const price = parseFloat(product.btcRubPrice || '0');
                  if (!isNaN(btc) && !isNaN(price) && price > 0) {
                    return `≈ ₽${(btc * price).toLocaleString()}`;
                  }
                  // 3) старое поле
                  return `≈ ${product.btcPriceRub}`;
                })()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-emerald-500/10">
              <div className="text-sm text-muted-foreground mb-1">Аптайм</div>
              <div className="text-xl font-bold text-green-600">{(product.uptimePercent || '').toString().replace(/\s*%$/, ' %')}</div>
            </div>
            <div className="p-4 rounded-lg bg-accent/10">
              <div className="text-sm text-muted-foreground mb-1">Ежедневная добыча</div>
              <div className="text-xl font-bold text-accent">{product.dailyMiningCurrent} BTC</div>
              <div className="text-sm text-muted-foreground mt-1">
                {(() => {
                  // 1) приоритет: готовое значение из таблицы dailyMiningCurrent (RUB)
                  if (product.dailyMiningCurrentRub && product.dailyMiningCurrentRub.trim()) {
                    return `≈ ${product.dailyMiningCurrentRub}`;
                  }
                  // 2) расчет через btcRubPrice
                  const daily = parseFloat(product.dailyMiningCurrent || '0');
                  const price = parseFloat(product.btcRubPrice || '0');
                  if (!isNaN(daily) && !isNaN(price) && price > 0) {
                    return `≈ ₽${(daily * price).toLocaleString()}`;
                  }
                  // 3) иначе ноль
                  return `≈ ₽0`;
                })()}
              </div>
            </div>
          </div>

          {/* Окупаемость и Доходность */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-warning/10">
              <div className="text-sm text-muted-foreground mb-1 flex items-center justify-between">
                <span>Окупаемость на сегодняшний день</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button aria-label="Что это" className="w-5 h-5 rounded-full bg-muted/40 text-muted-foreground flex items-center justify-center hover:bg-muted/60 transition-colors">
                        <HelpCircle className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="end" className="max-w-xs leading-relaxed">
                      Здесь показана доля стоимости карты, уже возвращённая её заработком за весь период работы, в процентах.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {(() => {
                const value = parseFloat(product.paybackPercent || product.roiPercent || '0');
                const color = getProgressColor(value);
                return (
                  <div className="text-lg font-bold" style={{ color }}>{`${value} %`}</div>
                );
              })()}
              <Progress 
                value={Math.min(100, parseFloat(product.paybackPercent || product.roiPercent || '0'))} 
                className="w-full mt-2"
                style={{
                  '--progress-background': getProgressColor(parseFloat(product.paybackPercent || product.roiPercent || '0'))
                } as React.CSSProperties}
              />
            </div>
            <div className="p-4 rounded-lg bg-primary/10">
              <div className="text-sm text-muted-foreground mb-1 flex items-center justify-between">
                <span>Доходность на сегодня</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button aria-label="Что это" className="w-5 h-5 rounded-full bg-muted/40 text-muted-foreground flex items-center justify-center hover:bg-muted/60 transition-colors">
                        <HelpCircle className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="end" className="max-w-xs leading-relaxed">
                      Здесь отображается доходность карты за текущие сутки — актуальный процент на сегодня.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {(() => {
                const value = parseFloat(product.roiPercent || '0');
                const color = getProgressColor(value);
                return (
                  <div className="text-lg font-bold" style={{ color }}>{`${value} %`}</div>
                );
              })()}
              <Progress 
                value={Math.min(100, parseFloat(product.roiPercent || '0'))} 
                className="w-full mt-2"
                style={{
                  '--progress-background': getProgressColor(parseFloat(product.roiPercent || '0'))
                } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Статистика по месяцам удалена по требованиям дизайна */}
        </div>
      </CardContent>
    </Card>
  );
};