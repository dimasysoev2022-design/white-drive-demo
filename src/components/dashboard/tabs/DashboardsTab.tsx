import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Zap, 
  DollarSign, 
  AlertTriangle, 
  PieChart,
  TrendingUp,
  Calendar
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Pie
} from 'recharts';

export const DashboardsTab = () => {
  const [currencyMode, setCurrencyMode] = useState<'rub' | 'btc'>('rub');
  const [periodMode, setPeriodMode] = useState<'7d' | '30d'>('7d');

  // Mock data
  const uptimeData = [
    { date: '2024-01-01', uptime: 99.8 },
    { date: '2024-01-02', uptime: 99.9 },
    { date: '2024-01-03', uptime: 99.7 },
    { date: '2024-01-04', uptime: 99.9 },
    { date: '2024-01-05', uptime: 100 },
    { date: '2024-01-06', uptime: 99.8 },
    { date: '2024-01-07', uptime: 99.9 }
  ];

  const performanceData = [
    { date: '2024-01-01', actual: 847, planned: 850, median30: 832 },
    { date: '2024-01-02', actual: 851, planned: 850, median30: 835 },
    { date: '2024-01-03', actual: 843, planned: 850, median30: 831 },
    { date: '2024-01-04', actual: 856, planned: 850, median30: 838 },
    { date: '2024-01-05', actual: 849, planned: 850, median30: 834 },
    { date: '2024-01-06', actual: 852, planned: 850, median30: 836 },
    { date: '2024-01-07', actual: 847, planned: 850, median30: 833 }
  ];

  const accrualData = currencyMode === 'rub' 
    ? [
        { date: '2024-01-01', value: 13420 },
        { date: '2024-01-02', value: 13680 },
        { date: '2024-01-03', value: 13290 },
        { date: '2024-01-04', value: 14100 },
        { date: '2024-01-05', value: 13850 },
        { date: '2024-01-06', value: 14200 },
        { date: '2024-01-07', value: 13980 }
      ]
    : [
        { date: '2024-01-01', value: 0.00032 },
        { date: '2024-01-02', value: 0.00034 },
        { date: '2024-01-03', value: 0.00031 },
        { date: '2024-01-04', value: 0.00035 },
        { date: '2024-01-05', value: 0.00033 },
        { date: '2024-01-06', value: 0.00036 },
        { date: '2024-01-07', value: 0.00034 }
      ];

  const costsData = [
    { name: 'Pool Fee', value: 2.5, color: '#FCD34D' },
    { name: 'Energy', value: 65, color: '#F87171' },
    { name: 'Service Fee', value: 12.5, color: '#60A5FA' },
    { name: 'Other', value: 20, color: '#A78BFA' }
  ];

  const eventsData = [
    { date: '2024-01-07 14:32', type: 'maintenance', duration: 15, summary: 'Плановое обслуживание майнера #24' },
    { date: '2024-01-07 09:15', type: 'optimization', duration: 5, summary: 'Оптимизация алгоритма распределения' },
    { date: '2024-01-06 22:48', type: 'alert', duration: 2, summary: 'Кратковременное снижение хешрейта' },
    { date: '2024-01-06 16:20', type: 'update', duration: 8, summary: 'Обновление прошивки майнеров' }
  ];

  const formatCurrency = (value: number) => {
    if (currencyMode === 'rub') {
      return `₽${value.toLocaleString()}`;
    } else {
      return `${value.toFixed(8)} BTC`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Дашборды</h2>
          <p className="text-muted-foreground">Аналитика и метрики пула</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg bg-muted p-1">
            <Button
              variant={periodMode === '7d' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPeriodMode('7d')}
            >
              7 дней
            </Button>
            <Button
              variant={periodMode === '30d' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPeriodMode('30d')}
            >
              30 дней
            </Button>
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
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="uptime" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="uptime">Аптайм</TabsTrigger>
          <TabsTrigger value="performance">Производительность</TabsTrigger>
          <TabsTrigger value="accruals">Начисления</TabsTrigger>
          <TabsTrigger value="costs">Издержки</TabsTrigger>
          <TabsTrigger value="events">События</TabsTrigger>
        </TabsList>

        <TabsContent value="uptime" className="space-y-4">
          <Card className="card-elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-primary" />
                    Аптайм пула
                  </CardTitle>
                  <CardDescription>Доступность майнеров за период</CardDescription>
                </div>
                <Badge className="bg-success/10 text-success border-success/20">
                  99.8%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={uptimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" domain={[99, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="uptime" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--success))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                Производительность (TH/s)
              </CardTitle>
              <CardDescription>Факт vs План vs Медиана 30 дней</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2} name="Факт" />
                  <Line type="monotone" dataKey="planned" stroke="hsl(var(--success))" strokeWidth={2} strokeDasharray="5 5" name="План" />
                  <Line type="monotone" dataKey="median30" stroke="hsl(var(--muted-foreground))" strokeWidth={1} name="Медиана 30д" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accruals" className="space-y-4">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-primary" />
                Начисления ({currencyMode === 'rub' ? 'RUB' : 'BTC'})
              </CardTitle>
              <CardDescription>Ежедневные поступления</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={accrualData}>
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
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-primary" />
                Структура издержек
              </CardTitle>
              <CardDescription>Распределение расходов пула</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Pie data={costsData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                      {costsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {costsData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-3" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
                События пула
              </CardTitle>
              <CardDescription>История операций и инцидентов</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {eventsData.map((event, index) => (
                  <div key={index} className="flex items-start p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-fast">
                    <div className={`w-2 h-2 rounded-full mt-2 mr-4 ${
                      event.type === 'maintenance' ? 'bg-warning' :
                      event.type === 'optimization' ? 'bg-success' :
                      event.type === 'alert' ? 'bg-destructive' :
                      'bg-primary'
                    }`} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{event.summary}</p>
                        <Badge variant="outline" className="text-xs">
                          {event.duration}мин
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {event.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};