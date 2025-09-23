import { useState } from "react";
import { KPICard } from "../KPICard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Zap, 
  DollarSign, 
  TrendingUp, 
  Server,
  Play,
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";
import { 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

export const OverviewTab = () => {
  const [currencyMode, setCurrencyMode] = useState<'rub' | 'btc'>('rub');
  const [selectedProduct, setSelectedProduct] = useState<'M50' | 'T21' | 'S21'>('S21');

  // Ежедневная статистика за период демонстрации (3 дня)
  const dailyStats = [
    { date: "15.01.2024", accrual_btc: "0.00032450", accrual_rub: "13420" },
    { date: "16.01.2024", accrual_btc: "0.00034120", accrual_rub: "14680" },
    { date: "17.01.2024", accrual_btc: "0.00031890", accrual_rub: "13290" }
  ];

  // Общая доходность за период
  const totalAccrualBtc = dailyStats.reduce((sum, day) => sum + parseFloat(day.accrual_btc), 0);
  const totalAccrualRub = dailyStats.reduce((sum, day) => sum + parseInt(day.accrual_rub), 0);
  const apyPercent = "18.4%"; // Расчет из данных как было раньше

  // Данные для графика начислений
  const accrualData = currencyMode === 'rub' 
    ? [
        { date: '15.01', value: 13420 },
        { date: '16.01', value: 14680 },
        { date: '17.01', value: 13290 }
      ]
    : [
        { date: '15.01', value: 0.00032450 },
        { date: '16.01', value: 0.00034120 },
        { date: '17.01', value: 0.00031890 }
      ];

  const formatCurrency = (value: number) => {
    if (currencyMode === 'rub') {
      return `₽${value.toLocaleString()}`;
    } else {
      return `${value.toFixed(8)} BTC`;
    }
  };

  // Данные продуктов
  const productsData = {
    M50: {
      name: "M50",
      year: "2023",
      description: "Первый продукт с 2023 года",
      purchasePrice: "₽2,450,000",
      performance: "116 TH/s",
      purchaseDate: "15.03.2023",
      currentProfit: "₽1,230,450",
      minedBTC: "2.45672340",
      btcPriceRub: "₽6,789,230",
      workingDays: "543",
      roiPercent: "50.2%"
    },
    T21: {
      name: "T21", 
      year: "2024",
      description: "Второй продукт с 2024 года",
      purchasePrice: "₽1,850,000",
      performance: "190 TH/s",
      purchaseDate: "22.01.2024",
      currentProfit: "₽567,890",
      minedBTC: "1.23456789",
      btcPriceRub: "₽6,789,230", 
      workingDays: "298",
      roiPercent: "30.7%"
    },
    S21: {
      name: "S21",
      year: "2025",
      description: "Текущий продукт 2025 года",
      purchasePrice: "₽3,200,000",
      performance: "200 TH/s",
      miningStartDate: "10.01.2025",
      workingDays: "8",
      minedBTC: "0.09876543",
      btcPriceRub: "₽6,789,230",
      currentProfit: "₽670,560",
      monthlyStats: [
        { month: "Декабрь 2024", btc: "0.03245678", rub: "₽220,340" },
        { month: "Январь 2025", btc: "0.06630865", rub: "₽450,220" }
      ],
      dailyMiningCurrent: "0.01234567",
      uptimePercent: "99.8%",
      paybackPercent: "20.9%"
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
          Это демонстрационная версия панели управления майнинг-пулом. 
          Изучите реальные данные и процессы за 72 часа.
        </p>
      </div>


      {/* Продукты WHITE */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Server className="w-5 h-5 mr-2 text-primary" />
                Продукты WHITE
              </CardTitle>
              <CardDescription>
                Обзор майнинг-продуктов по годам
              </CardDescription>
            </div>
            <div className="flex rounded-lg bg-card border-2 border-primary/20 p-2 shadow-lg">
              {(['M50', 'T21', 'S21'] as const).map((product) => (
                <Button
                  key={product}
                  variant={selectedProduct === product ? 'default' : 'ghost'}
                  size="default"
                  onClick={() => setSelectedProduct(product)}
                  className={`text-sm font-semibold mx-1 px-4 py-2 transition-all duration-200 ${
                    selectedProduct === product 
                      ? 'bg-primary text-primary-foreground shadow-md scale-105' 
                      : 'hover:bg-primary/10 hover:text-primary hover:scale-102'
                  }`}
                >
                  {product} ({productsData[product].year})
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {selectedProduct === 'S21' ? (
            // Расширенная карточка для S21
            <div className="space-y-6">
              <div className="text-center p-4 rounded-lg bg-primary/10">
                <h3 className="text-xl font-bold text-primary mb-2">{productsData.S21.name} - {productsData.S21.description}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground mb-1">Цена карты на момент покупки</div>
                  <div className="text-lg font-bold">{productsData.S21.purchasePrice}</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground mb-1">Производительность</div>
                  <div className="text-lg font-bold">{productsData.S21.performance}</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground mb-1">Дата начала майнинга</div>
                  <div className="text-lg font-bold">{productsData.S21.miningStartDate}</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground mb-1">Дней работает</div>
                  <div className="text-lg font-bold">{productsData.S21.workingDays}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-success/10">
                  <div className="text-sm text-muted-foreground mb-1">Добыто биткоина</div>
                  <div className="text-xl font-bold text-success">{productsData.S21.minedBTC} BTC</div>
                  <div className="text-sm text-muted-foreground">≈ {productsData.S21.btcPriceRub}</div>
                </div>
                <div className="p-4 rounded-lg bg-primary/10">
                  <div className="text-sm text-muted-foreground mb-1">Доходность на сегодня</div>
                  <div className="text-xl font-bold text-primary">{productsData.S21.currentProfit}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Статистика по месяцам</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {productsData.S21.monthlyStats.map((stat, index) => (
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground mb-1">Ежедневная добыча</div>
                  <div className="text-lg font-bold">{productsData.S21.dailyMiningCurrent} BTC</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-success/10">
                  <div className="text-sm text-muted-foreground mb-1">Аптайм</div>
                  <div className="text-lg font-bold text-success">{productsData.S21.uptimePercent}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-warning/10">
                  <div className="text-sm text-muted-foreground mb-1">Окупаемость</div>
                  <div className="text-lg font-bold text-warning">{productsData.S21.paybackPercent}</div>
                  <Progress value={20.9} className="w-full mt-2" />
                </div>
              </div>
            </div>
          ) : (
            // Стандартные карточки для M50 и T21
            <div className="space-y-4">
              <div className="text-center p-4 rounded-lg bg-primary/10">
                <h3 className="text-lg font-bold text-primary mb-1">{productsData[selectedProduct].name} - {productsData[selectedProduct].description}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-xs text-muted-foreground mb-1">Цена при покупке</div>
                  <div className="text-sm font-bold">{productsData[selectedProduct].purchasePrice}</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-xs text-muted-foreground mb-1">Производительность</div>
                  <div className="text-sm font-bold">{productsData[selectedProduct].performance}</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-xs text-muted-foreground mb-1">Дата покупки</div>
                  <div className="text-sm font-bold">{productsData[selectedProduct].purchaseDate}</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-xs text-muted-foreground mb-1">Дней работает</div>
                  <div className="text-sm font-bold">{productsData[selectedProduct].workingDays}</div>
                </div>
                <div className="p-3 rounded-lg bg-success/10">
                  <div className="text-xs text-muted-foreground mb-1">ROI</div>
                  <div className="text-sm font-bold text-success">{productsData[selectedProduct].roiPercent}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-primary/10">
                  <div className="text-sm text-muted-foreground mb-1">Добыто биткоина</div>
                  <div className="text-lg font-bold text-primary">{productsData[selectedProduct].minedBTC} BTC</div>
                  <div className="text-xs text-muted-foreground">≈ {productsData[selectedProduct].btcPriceRub}</div>
                </div>
                <div className="p-4 rounded-lg bg-success/10">
                  <div className="text-sm text-muted-foreground mb-1">Доходность на сегодня</div>
                  <div className="text-lg font-bold text-success">{productsData[selectedProduct].currentProfit}</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>


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