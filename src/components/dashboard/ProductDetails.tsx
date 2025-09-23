import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Product } from "./ProductSelector";

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
              <div className="text-sm text-muted-foreground">≈ {product.btcPriceRub}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/20 border-2 border-green-500/30">
              <div className="text-sm text-muted-foreground mb-1">Аптайм</div>
              <div className="text-xl font-bold text-green-600">{product.uptimePercent}</div>
            </div>
            <div className="p-4 rounded-lg bg-accent/10">
              <div className="text-sm text-muted-foreground mb-1">Ежедневная добыча</div>
              <div className="text-xl font-bold text-accent">{product.dailyMiningCurrent} BTC</div>
              <div className="text-sm text-muted-foreground mt-1">≈ ₽{(parseFloat(product.dailyMiningCurrent || '0') * 4200000).toLocaleString()}</div>
            </div>
          </div>

          {/* Окупаемость и Доходность */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-warning/10">
              <div className="text-sm text-muted-foreground mb-1">Окупаемость на сегодняшний день</div>
              <div className="text-lg font-bold text-warning">{product.paybackPercent || product.roiPercent}%</div>
              <Progress value={parseFloat(product.paybackPercent || product.roiPercent)} className="w-full mt-2" />
            </div>
            <div className="p-4 rounded-lg bg-primary/10">
              <div className="text-sm text-muted-foreground mb-1">Доходность на сегодня</div>
              <div className="text-lg font-bold text-primary">{product.roiPercent}%</div>
              <Progress value={parseFloat(product.roiPercent)} className="w-full mt-2" />
            </div>
          </div>

          {/* Расширенная информация только для S21 */}
          {productId === 'S21' && product.monthlyStats && (
            <>
              <div className="space-y-4">
                <h4 className="font-semibold">Статистика по месяцам</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.monthlyStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="font-medium">{stat.month}</div>
                      <div className="text-right">
                        <div className="text-sm font-mono">{stat.btc} BTC</div>
                        <div className="text-xs text-muted-foreground">{stat.rub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};