import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { ProductSelector } from "../ProductSelector";
import { ProductDetails } from "../ProductDetails";
import type { Product } from "../ProductSelector";

export const OverviewTab = () => {
  const [selectedProduct, setSelectedProduct] = useState<'M50' | 'T21' | 'S21'>('S21');

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
        product={productsData[selectedProduct]}
        productId={selectedProduct}
      />

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
                  Обзор платформы WHITE: как это работает
                </CardDescription>
              </div>
              <Badge variant="secondary">3:24</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
              <Button size="lg" className="rounded-full w-16 h-16">
                <Play className="w-6 h-6 ml-1" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Узнайте, как устроен пул WHITE, какие технологии мы используем 
              и как обеспечиваем стабильную доходность участникам.
            </p>
          </CardContent>
        </Card>

        {/* Today's Checklist */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-primary" />
              Сегодня рекомендуем
            </CardTitle>
            <CardDescription>
              Рекомендуемые задачи
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayTasks.map((task) => (
              <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-fast">
                <div className={`w-4 h-4 rounded border-2 mt-0.5 ${
                  task.completed 
                    ? 'bg-primary border-primary' 
                    : 'border-muted-foreground'
                }`}>
                  {task.completed && <CheckCircle className="w-3 h-3 text-primary-foreground" />}
                </div>
                <span className={`text-sm ${
                  task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                }`}>
                  {task.title}
                </span>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">
              <ArrowRight className="w-4 h-4 mr-2" />
              Перейти к дашбордам
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};