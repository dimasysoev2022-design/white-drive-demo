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
  const kpiData = [
    {
      title: "Аптайм",
      value: "99.8%",
      description: "За период тест-драйва (3 дня)",
      icon: Activity,
      trend: { direction: 'up' as const, value: "+0.2%", label: "стабильно" }
    },
    {
      title: "Производительность",
      value: "470 TH/s",
      description: "Текущая мощность",
      icon: Zap,
      trend: { direction: 'neutral' as const, value: "стабильно", label: "работает" }
    }
  ];

  // Ежедневная статистика за период тест-драйва (3 дня)
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

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Общая доходность за период тест-драйва */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-primary" />
            За период тест-драйва (3 дня) — Общая доходность
          </CardTitle>
          <CardDescription>
            Суммарные начисления за демонстрационный период
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-primary">{totalAccrualBtc.toFixed(8)} BTC</div>
              <div className="text-sm text-muted-foreground">Общая доходность BTC</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-success">₽{totalAccrualRub.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Общая доходность ₽</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-center p-3 rounded-lg bg-primary/10">
              <div className="text-lg font-bold text-primary">Годовая доходность (APY): {apyPercent}</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Окупаемость</span>
                <span className="text-sm font-bold text-primary">18.4%</span>
              </div>
              <Progress value={18.4} className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* График начислений */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-primary" />
                Начисления ({currencyMode === 'rub' ? 'RUB' : 'BTC'})
              </CardTitle>
              <CardDescription>За период тест-драйва (3 дня)</CardDescription>
            </div>
            <div className="flex rounded-lg bg-muted p-1">
              <Button
                variant={currencyMode === 'rub' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrencyMode('rub')}
              >
                ₽
              </Button>
              <Button
                variant={currencyMode === 'btc' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrencyMode('btc')}
              >
                BTC
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accrualData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [formatCurrency(value), 'Начисления']}
              />
              <Bar 
                dataKey="value" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Ежедневная статистика */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Ежедневная статистика</CardTitle>
          <CardDescription>
            Начисления за каждый день периода тест-драйва
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dailyStats.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="font-medium">{day.date}</div>
                <div className="text-right space-y-1">
                  <div className="text-sm font-mono">{day.accrual_btc} BTC</div>
                  <div className="text-sm text-muted-foreground">₽{parseInt(day.accrual_rub).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
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