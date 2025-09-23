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
        {productId === 'S21' ? (
          // Расширенная карточка для S21
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-sm text-muted-foreground mb-1">Цена карты на момент покупки</div>
                <div className="text-lg font-bold">{product.purchasePrice}</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-sm text-muted-foreground mb-1">Производительность</div>
                <div className="text-lg font-bold">{product.performance}</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-sm text-muted-foreground mb-1">Дата начала майнинга</div>
                <div className="text-lg font-bold">{product.miningStartDate}</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-sm text-muted-foreground mb-1">Дней работает</div>
                <div className="text-lg font-bold">{product.workingDays}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-success/10">
                <div className="text-sm text-muted-foreground mb-1">Добыто биткоина</div>
                <div className="text-xl font-bold text-success">{product.minedBTC} BTC</div>
                <div className="text-sm text-muted-foreground">≈ {product.btcPriceRub}</div>
              </div>
              <div className="p-4 rounded-lg bg-primary/10">
                <div className="text-sm text-muted-foreground mb-1">Доходность на сегодня</div>
                <div className="text-xl font-bold text-primary">{product.currentProfit}</div>
                <Progress value={42.5} className="w-full mt-2" />
              </div>
            </div>

            {product.monthlyStats && (
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
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <div className="text-sm text-muted-foreground mb-1">Ежедневная добыча</div>
                <div className="text-lg font-bold">{product.dailyMiningCurrent} BTC</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-success/10">
                <div className="text-sm text-muted-foreground mb-1">Аптайм</div>
                <div className="text-lg font-bold text-success">{product.uptimePercent}</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-warning/10">
                <div className="text-sm text-muted-foreground mb-1">Окупаемость</div>
                <div className="text-lg font-bold text-warning">{product.paybackPercent}</div>
                <Progress value={20.9} className="w-full mt-2" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-info/10">
                <div className="text-sm text-muted-foreground mb-1">ROI прогресс</div>
                <div className="text-lg font-bold text-info">20.9%</div>
                <Progress value={20.9} className="w-full mt-2" />
              </div>
              <div className="p-4 rounded-lg bg-accent/10">
                <div className="text-sm text-muted-foreground mb-1">Доходность прогресс</div>
                <div className="text-lg font-bold text-accent">35.2%</div>
                <Progress value={35.2} className="w-full mt-2" />
              </div>
            </div>
          </div>
        ) : (
          // Стандартные карточки для M50 и T21
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="text-xs text-muted-foreground mb-1">Цена при покупке</div>
                <div className="text-sm font-bold">{product.purchasePrice}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="text-xs text-muted-foreground mb-1">Производительность</div>
                <div className="text-sm font-bold">{product.performance}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="text-xs text-muted-foreground mb-1">Дата покупки</div>
                <div className="text-sm font-bold">{product.purchaseDate}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="text-xs text-muted-foreground mb-1">Дней работает</div>
                <div className="text-sm font-bold">{product.workingDays}</div>
              </div>
              <div className="p-3 rounded-lg bg-success/10">
                <div className="text-xs text-muted-foreground mb-1">ROI</div>
                <div className="text-sm font-bold text-success">{product.roiPercent}</div>
                <Progress value={parseFloat(product.roiPercent)} className="w-full mt-2" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/10">
                <div className="text-sm text-muted-foreground mb-1">Добыто биткоина</div>
                <div className="text-lg font-bold text-primary">{product.minedBTC} BTC</div>
                <div className="text-xs text-muted-foreground">≈ {product.btcPriceRub}</div>
              </div>
              <div className="p-4 rounded-lg bg-success/10">
                <div className="text-sm text-muted-foreground mb-1">Доходность на сегодня</div>
                <div className="text-lg font-bold text-success">{product.currentProfit}</div>
                <Progress value={parseFloat(product.roiPercent) * 1.2} className="w-full mt-2" />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};