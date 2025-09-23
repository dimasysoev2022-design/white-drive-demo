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
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

export const DashboardsTab = () => {
  const [currencyMode, setCurrencyMode] = useState<'rub' | 'btc'>('rub');

  // Mock data за период демонстрации (3 дня)
  const uptimeData = [
    { date: '15.01', uptime: 99.8 },
    { date: '16.01', uptime: 99.9 },
    { date: '17.01', uptime: 99.7 }
  ];

  const performanceData = [
    { date: '15.01', actual: 470, planned: 470, median30: 465 },
    { date: '16.01', actual: 470, planned: 470, median30: 468 },
    { date: '17.01', actual: 470, planned: 470, median30: 467 }
  ];

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

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Дашборды</h2>
          <p className="text-muted-foreground">За период демонстрации (3 дня)</p>
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

      {/* Dashboard Tabs */}
      <Tabs defaultValue="uptime" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="uptime">Аптайм</TabsTrigger>
          <TabsTrigger value="performance">Производительность</TabsTrigger>
          <TabsTrigger value="accruals">Начисления</TabsTrigger>
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
                  <CardDescription>За период демонстрации (3 дня)</CardDescription>
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
              <CardDescription>За период демонстрации (3 дня)</CardDescription>
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
              <CardDescription>За период демонстрации (3 дня)</CardDescription>
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
        </TabsContent>

      </Tabs>
    </div>
  );
};