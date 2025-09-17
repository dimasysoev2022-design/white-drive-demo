import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  Send, 
  CheckCircle,
  Search,
  MessageCircle,
  Clock,
  Shield,
  Zap,
  DollarSign,
  Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'financial' | 'legal';
  popular: boolean;
}

export const QuestionsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    topic: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const faqs: FAQ[] = [
    {
      id: "faq-001",
      question: "Как работает система начислений в пуле WHITE?",
      answer: "Начисления происходят ежедневно на основе вашей доли в общей мощности пула. Мы используем PPLNS (Pay Per Last N Shares) систему, которая обеспечивает справедливое распределение вознаграждений. Комиссия пула составляет 2.5%, что включает техническое обслуживание и развитие инфраструктуры.",
      category: "financial",
      popular: true
    },
    {
      id: "faq-002", 
      question: "Какой минимальный аптайм гарантирует WHITE?",
      answer: "Мы гарантируем аптайм не менее 99% согласно SLA. В случае простоя по нашей вине более 1%, мы компенсируем упущенную выгоду. Наша инфраструктура включает резервные каналы связи, источники питания и систему мониторинга 24/7.",
      category: "technical",
      popular: true
    },
    {
      id: "faq-003",
      question: "Можно ли досрочно расторгнуть договор?",
      answer: "Договор может быть расторгнут досрочно с уведомлением за 30 дней. При расторжении в течение первых 6 месяцев взимается штраф в размере 10% от внесенной суммы. Все накопленные, но не выплаченные средства переводятся в течение 14 рабочих дней.",
      category: "legal", 
      popular: false
    },
    {
      id: "faq-004",
      question: "Как часто происходят выплаты и в какой валюте?",
      answer: "Выплаты происходят еженедельно по пятницам в рублях на банковскую карту или расчетный счет. По желанию можно настроить выплаты в BTC с минимальной суммой 0.001 BTC. Конвертация производится по курсу на момент выплаты.",
      category: "financial",
      popular: true
    },
    {
      id: "faq-005",
      question: "Что происходит при поломке оборудования?",
      answer: "У нас есть страховка оборудования и резервный фонд. В случае поломки майнера, мы заменяем его в течение 24 часов из резерва. Простой компенсируется начислением средней доходности за период ремонта. Участник не несет расходов на ремонт или замену.",
      category: "technical",
      popular: false
    },
    {
      id: "faq-006",
      question: "Как обеспечивается безопасность моих инвестиций?",
      answer: "Мы работаем как ООО с полной отчетностью перед ФНС. Все операции проводятся через корпоративные счета в российских банках. Заключается официальный договор оказания услуг, средства не смешиваются с операционными. Ведется ежемесячная отчетность для участников.",
      category: "legal",
      popular: true
    }
  ];

  const categories = [
    { id: 'general', name: 'Общие', icon: HelpCircle, count: 0 },
    { id: 'financial', name: 'Финансовые', icon: DollarSign, count: 2 },  
    { id: 'technical', name: 'Технические', icon: Zap, count: 2 },
    { id: 'legal', name: 'Правовые', icon: Shield, count: 2 }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFaqs = faqs.filter(faq => faq.popular);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Mock API call - in real app would send to webhook/CRM
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Вопрос отправлен",
      description: "Мы ответим в течение 24 часов на указанный email",
    });

    // Reset form
    setFormData({ name: '', email: '', topic: '', message: '' });
    setIsSubmitting(false);

    // In real app: track analytics td_submit_question
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.id === category);
    return categoryData?.icon || HelpCircle;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'financial': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'technical': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'legal': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gradient">Вопросы и ответы</h2>
        <p className="text-muted-foreground">
          Ответы на частые вопросы и форма для связи
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Popular FAQ */}
          {popularFaqs.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                Популярные вопросы
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {popularFaqs.slice(0, 3).map(faq => {
                  const CategoryIcon = getCategoryIcon(faq.category);
                  return (
                    <Card key={faq.id} className="card-elevated">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base pr-4">{faq.question}</CardTitle>
                          <Badge variant="outline" className={getCategoryColor(faq.category)}>
                            <CategoryIcon className="w-3 h-3 mr-1" />
                            {categories.find(c => c.id === faq.category)?.name}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Search */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по вопросам..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                Все вопросы ({faqs.length})
              </Button>
              {categories.filter(cat => cat.count > 0).map(category => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name} ({faqs.filter(f => f.category === category.id).length})
                  </Button>
                );
              })}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Все вопросы</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {filteredFaqs.map(faq => {
                const CategoryIcon = getCategoryIcon(faq.category);
                return (
                  <AccordionItem key={faq.id} value={faq.id} className="border border-border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span className="text-left font-medium">{faq.question}</span>
                        <div className="flex items-center space-x-2">
                          {faq.popular && (
                            <Badge variant="secondary" className="text-xs">
                              Популярный
                            </Badge>
                          )}
                          <Badge variant="outline" className={getCategoryColor(faq.category)}>
                            <CategoryIcon className="w-3 h-3" />
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-2">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Вопросы не найдены</h3>
                <p className="text-muted-foreground">
                  Попробуйте изменить поисковый запрос или категорию
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Call-to-Action */}
        <div className="space-y-4">
          <Card className="card-elevated">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <Send className="w-5 h-5 mr-2 text-primary" />
                Задать вопросы, если что-то непонятно
              </CardTitle>
              <CardDescription>
                Мы готовы ответить на любые вопросы о работе пула
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Напишите нам в Telegram или позвоните:
              </p>
              <div className="space-y-3 mb-4">
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  @fred_parkin
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  8-916-235-44-00
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Время работы:</p>
                <p>ПН-ПТ: 10:00-19:00 (МСК)</p>
                <p>СБ-ВС: выходной</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-base">Другие способы связи</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                <span>Telegram: @fred_parkin</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                <span>Телефон: 8-916-235-44-00</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                <span>Время работы: пн-пт 10:00-19:00 МСК</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};