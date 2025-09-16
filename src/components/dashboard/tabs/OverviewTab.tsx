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

export const OverviewTab = () => {
  const kpiData = [
    {
      title: "Аптайм",
      value: "99.8%",
      description: "Среднее за месяц",
      icon: Activity,
      trend: { direction: 'up' as const, value: "+0.2%", label: "за 7 дней" }
    },
    {
      title: "Производительность",
      value: "847.3 TH/s",
      description: "Текущая мощность",
      icon: Zap,
      trend: { direction: 'up' as const, value: "+12.4%", label: "к плану" }
    },
    {
      title: "Начисления",
      value: "₽94,847",
      description: "За текущий месяц",
      icon: DollarSign,
      trend: { direction: 'up' as const, value: "+8.7%", label: "к прошлому" }
    },
    {
      title: "Доходность",
      value: "18.4%",
      description: "Годовая (APY)",
      icon: TrendingUp,
      trend: { direction: 'up' as const, value: "+2.1%", label: "к медиане" }
    },
    {
      title: "Активные майнеры",
      value: "24/24",
      description: "Онлайн устройств",
      icon: Server,
      trend: { direction: 'neutral' as const, value: "100%", label: "доступности" }
    }
  ];

  const todayTasks = [
    { id: 1, title: "Изучить дашборды производительности", completed: false },
    { id: 2, title: "Просмотреть документы пула", completed: false },
    { id: 3, title: "Посмотреть видео-гайды", completed: false }
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
          Изучите реальные данные и процессы за 76 часов.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

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
              Сегодня
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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center space-y-2 p-4 rounded-lg bg-muted/30">
          <div className="text-2xl font-bold text-success">76ч</div>
          <div className="text-sm text-muted-foreground">Демо-доступ</div>
        </div>
        <div className="text-center space-y-2 p-4 rounded-lg bg-muted/30">
          <div className="text-2xl font-bold text-primary">5</div>
          <div className="text-sm text-muted-foreground">Дашбордов</div>
        </div>
        <div className="text-center space-y-2 p-4 rounded-lg bg-muted/30">
          <div className="text-2xl font-bold text-warning">12</div>
          <div className="text-sm text-muted-foreground">Документов</div>
        </div>
        <div className="text-center space-y-2 p-4 rounded-lg bg-muted/30">
          <div className="text-2xl font-bold text-accent">4</div>
          <div className="text-sm text-muted-foreground">Видео-гайда</div>
        </div>
      </div>
    </div>
  );
};