import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { 
  Play,
  CheckCircle,
  ArrowRight,
  X
} from "lucide-react";
import { ProductSelector } from "../ProductSelector";
import { ProductDetails } from "../ProductDetails";
// import ProductsTable from "../ProductsTable";
import { fetchSheetCSV } from "@/lib/sheets";
import type { Product } from "../ProductSelector";

interface OverviewTabProps {
  onGoToDocuments?: () => void;
}

export const OverviewTab = ({ onGoToDocuments }: OverviewTabProps) => {
  const [selectedProduct, setSelectedProduct] = useState<'M50' | 'T21' | 'S21'>('S21');
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Данные продуктов с обновленной информацией
  const productsData: Record<'M50' | 'T21' | 'S21', Product> = {
    M50: {
      name: "Whatsminer M50",
      year: "2023",
      description: "Первый продукт, который мы запустили",
      purchasePrice: "₽2,450,000",
      performance: "120 TH/s",
      purchaseDate: "1 апреля 2023",
      miningStartDate: "1 апреля 2023",
      currentProfit: "₽1,230,450",
      minedBTC: "2.45672340",
      btcPriceRub: "₽6,789,230",
      btcRubPrice: "4200000",
      workingDays: "543",
      roiPercent: "50.2",
      paybackPercent: "45.8"
    },
    T21: {
      name: "Antminer T21", 
      year: "2024",
      description: "Второй продукт в нашей линейке",
      purchasePrice: "₽1,850,000",
      performance: "190 TH/s",
      purchaseDate: "1 июня 2024",
      miningStartDate: "1 июня 2024",
      currentProfit: "₽567,890",
      minedBTC: "1.23456789",
      btcPriceRub: "₽6,789,230", 
      btcRubPrice: "4200000",
      workingDays: "298",
      roiPercent: "30.7",
      paybackPercent: "25.3"
    },
    S21: {
      name: "Antminer S21",
      year: "2025",
      description: "Актуальный продукт",
      purchasePrice: "₽3,200,000",
      performance: "235 TH/s",
      miningStartDate: "1 сентября 2025",
      workingDays: "8",
      minedBTC: "0.09876543",
      btcPriceRub: "₽6,789,230",
      btcRubPrice: "4200000",
      currentProfit: "₽670,560",
      roiPercent: "20.9",
      paybackPercent: "15.4",
      monthlyStats: [
        { month: "Декабрь 2024", btc: "0.03245678", rub: "₽220,340" },
        { month: "Январь 2025", btc: "0.06630865", rub: "₽450,220" }
      ],
      dailyMiningCurrent: "0.01234567",
      uptimePercent: "99.8%"
    }
  };

  const [productsTable, setProductsTable] = useState<Record<'M50' | 'T21' | 'S21', Product>>(productsData);

  // Подгружаем данные из Google Sheets (если задан URL экспорта в CSV)
  useEffect(() => {
    const fallback = "https://docs.google.com/spreadsheets/d/1YOMZZBSoS4-4H65c_dJP5O1nzhA2g1H_e-t_Okmmqlk/export?format=csv&gid=0";
    const url = (import.meta.env.VITE_PRODUCTS_SHEET_URL as string | undefined) || fallback;
    if (!url) return;
    let isCancelled = false;
    (async () => {
      try {
        const rows = await fetchSheetCSV(url);
        // ожидается колонка id со значениями S21/T21/M50
        const next = { ...productsTable };
        rows.forEach((r) => {
          const id = (r.id as 'M50' | 'T21' | 'S21' | undefined);
          if (!id || !(id in next)) return;
          next[id] = {
            ...next[id],
            name: r.name || next[id].name,
            year: r.year || next[id].year,
            description: r.description || next[id].description,
            purchasePrice: r.purchasePrice || next[id].purchasePrice,
            performance: r.performance || next[id].performance,
            miningStartDate: r.miningStartDate || next[id].miningStartDate,
            workingDays: r.workingDays || next[id].workingDays,
            minedBTC: r.minedBTC || next[id].minedBTC,
            btcPriceRub: r.btcPriceRub || next[id].btcPriceRub,
            btcRubPrice: r.btcRubPrice || next[id].btcRubPrice,
            minedBTCRub: (r as any)["minedBTC (RUB)"] || (r as any)["minedBTCRub"] || next[id].minedBTCRub,
            dailyMiningCurrentRub: (r as any)["dailyMiningCurrent (RUB)"] || (r as any)["dailyMiningCurrentRub"] || next[id].dailyMiningCurrentRub,
            currentProfit: r.currentProfit || next[id].currentProfit,
            roiPercent: r.roiPercent || next[id].roiPercent,
            paybackPercent: r.paybackPercent || next[id].paybackPercent,
            dailyMiningCurrent: r.dailyMiningCurrent || next[id].dailyMiningCurrent,
            uptimePercent: r.uptimePercent || next[id].uptimePercent,
          };

          // Помесячная статистика только для S21, если в таблице заданы поля monthN_btc/monthN_rub
          if (id === 'S21') {
            const monthly: Array<{ month: string; btc: string; rub: string }> = [];
            for (let i = 1; i <= 12; i++) {
              const btc = (r as any)[`month${i}_btc`];
              const rub = (r as any)[`month${i}_rub`];
              const label = (r as any)[`month${i}_label`];
              if (btc || rub || label) {
                monthly.push({
                  month: label || `Месяц ${i}`,
                  btc: btc || "",
                  rub: rub || "",
                });
              }
            }
            if (monthly.length) {
              next[id].monthlyStats = monthly;
            }
          }
        });
        if (!isCancelled) setProductsTable(next);
      } catch (e) {
        console.warn("Sheets load failed", e);
      }
    })();
    return () => { isCancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todayTasks = [
    { id: 1, title: "Изучить дашборд производительности", completed: false },
    { id: 2, title: "Просмотреть документы", completed: false },
    { id: 3, title: "Посмотреть видео-инструкции", completed: false }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-gradient">
          Добро пожаловать в WHITE
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Это демонстрационная версия нашего продукта, в которой вы можете изучить всю информацию и принять решение о покупке.
        </p>
      </div>

      {/* Product Selector */}
      <ProductSelector 
        selectedProduct={selectedProduct}
        onProductSelect={setSelectedProduct}
      />

      {/* Product Details */}
      <ProductDetails 
        product={(productsTable)[selectedProduct]}
        productId={selectedProduct}
      />

      {/* Таблица скрыта по просьбе владельца */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video of the Day */}
        <Card className="card-elevated lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Play className="w-5 h-5 mr-2 text-primary" />
                  Видео дня
                </CardTitle>
                <CardDescription>
                  Ваш первый шаг в майнинг вместе с White
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div 
              className="relative aspect-video bg-cover bg-center rounded-lg cursor-pointer group overflow-hidden mb-4"
              style={{
                backgroundImage: "url('https://drive.google.com/thumbnail?id=1N6igDcl7E36bmdh_yWYWujHoOeRYe_Qh&sz=w1600')"
              }}
              onClick={() => setIsVideoOpen(true)}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="rounded-full w-16 h-16 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Play className="w-6 h-6 ml-1" />
                </Button>
              </div>
              <div className="absolute top-2 left-2">
                <Badge className="bg-primary text-primary-foreground">
                  Топ
                </Badge>
              </div>
              {/* Бейдж "Скоро" скрыт, т.к. видео уже доступно */}
              <div className="absolute bottom-2 right-2">
                <Badge className="bg-black/60 text-white border-none">
                  3:40
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Короткое знакомство: что такое демо-режим, зачем мы его сделали и как работает наше сообщество. Вы увидите, что в майнинг можно заходить безопасно и прозрачно — даже без опыта.
            </p>
          </CardContent>
        </Card>

        {/* Today's Checklist */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-primary" />
              Рекомендуем изучить
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-fast">
              <div className="shrink-0 w-5 h-5 rounded-md border mt-0.5 border-muted-foreground">
              </div>
              <span className="text-sm text-foreground">
                Изучить предыдущие наши продукты и их финансовый результат
              </span>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-fast">
              <div className="shrink-0 w-5 h-5 rounded-md border mt-0.5 border-muted-foreground">
              </div>
              <span className="text-sm text-foreground">
                Изучить документы, которые будут подписываться на момент покупки
              </span>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-fast">
              <div className="shrink-0 w-5 h-5 rounded-md border mt-0.5 border-muted-foreground">
              </div>
              <span className="text-sm text-foreground">
                Посмотреть видео, которые мы для вас подготовили, чтобы вам было проще понять продукт
              </span>
            </div>
            <Button className="w-full mt-4" variant="outline" onClick={onGoToDocuments}>
              <ArrowRight className="w-4 h-4 mr-2" />
              Перейти к документам
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl p-0">
          <div className="relative">
            <div className="aspect-video bg-black relative overflow-hidden rounded-t-lg">
              <iframe
                src="https://drive.google.com/file/d/1N6igDcl7E36bmdh_yWYWujHoOeRYe_Qh/preview"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              />
              {/* Оверлей "Скоро" не показываем, т.к. это реальное видео */}
              {/* Удалено дублирующее закрытие. Встроенная кнопка есть в DialogContent. */}
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Ваш первый шаг в майнинг вместе с White</h3>
                <p className="text-muted-foreground">Короткое знакомство: что такое демо-режим, зачем мы его сделали и как работает наше сообщество.</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};