import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowRight, 
  MessageCircle, 
  Calendar,
  CheckCircle,
  Clock,
  Users,
  Shield,
  Zap,
  DollarSign,
  PiggyBank,
  FileText,
  Phone,
  Mail,
  Send,
  Copyright,
  IdCard,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Package {
  id: string;
  name: string;
  power: string;
  price: string;
  duration: string;
  apy: string;
  features: string[];
  popular: boolean;
}

export const NextStepsTab = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const packages: Package[] = [
    {
      id: "starter",
      name: "Стартер",
      power: "100 TH/s",
      price: "₽400,000",
      duration: "12 месяцев", 
      apy: "16-18%",
      features: [
        "Гарантированный аптайм 99%",
        "Еженедельные выплаты",
        "Персональный менеджер",
        "Доступ к дашбордам",
        "Техподдержка"
      ],
      popular: false
    },
    {
      id: "professional",
      name: "Профессиональный",
      power: "500 TH/s",
      price: "₽1,800,000",
      duration: "12 месяцев",
      apy: "18-20%",
      features: [
        "Все из пакета Стартер",
        "Приоритетная поддержка",
        "Индивидуальные настройки",
        "Ежемесячные отчеты",
        "Страхование оборудования",
        "Гибкие условия выплат"
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "Корпоративный",
      power: "1000+ TH/s",
      price: "от ₽3,500,000",
      duration: "от 12 месяцев",
      apy: "20-22%",
      features: [
        "Все из пакета Профессиональный",
        "Выделенный пул",
        "Индивидуальные условия",
        "API доступ",
        "SLA 99.9%",
        "Юридическое сопровождение",
        "Консультации по стратегии"
      ],
      popular: false
    }
  ];

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    // In real app: track analytics td_select_package_${packageId}
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Mock API call - in real app would send to CRM
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Заявка отправлена",
      description: "Менеджер свяжется с вами в течение 2 часов",
    });

    setContactForm({ name: '', email: '', phone: '', preferredTime: '', message: '' });
    setIsSubmitting(false);

    // In real app: track analytics td_cta_contact_manager
  };

  const handleRequestQuote = () => {
    // In real app: track analytics td_cta_request_co
    toast({
      title: "Перенаправление",
      description: "Переходим к оформлению коммерческого предложения",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gradient">Следующие шаги</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Выберите подходящий пакет или свяжитесь с менеджером для получения 
          индивидуального предложения
        </p>
      </div>


      {/* Pricing Section (3 packages) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Старт */}
        <Card className="card-elevated">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full">ПАКЕТ</Badge>
              <CardTitle>Старт</CardTitle>
            </div>
            <CardDescription>
              <div className="h-[1px] bg-border/80 mt-4" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl md:text-5xl font-bold tracking-tight mb-4">420 000 ₽</div>
            <div className="font-semibold mb-3">В стоимость входит:</div>
            <ul className="space-y-3 text-sm md:text-base">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-1 text-primary" /> 1 единица оборудования</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-1 text-primary" /> настройка и подключение</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-1 text-primary" /> включение в общую экономику<br/>(совместный майнинг)</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-1 text-primary" /> холодный кошелёк в виде карты</li>
            </ul>
            <div className="mt-6">
              <a href="https://t.me/IlyaWhiteMining" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full">Обсудить</Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Стандарт */}
        <Card className="card-elevated">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full">ПАКЕТ</Badge>
              <CardTitle>Стандарт</CardTitle>
            </div>
            <CardDescription>
              <div className="h-[1px] bg-border/80 mt-4" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl md:text-5xl font-bold tracking-tight mb-4">2 000 000 ₽</div>
            <div className="font-semibold mb-3">В стоимость входит:</div>
            <ul className="space-y-3 text-sm md:text-base">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-1 text-primary" /> 5 единиц оборудования</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-1 text-primary" /> настройка и подключение</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-1 text-primary" /> включение в общую экономику<br/>(совместный майнинг)</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-1 text-primary" /> холодный кошелёк в виде карты</li>
            </ul>
            <div className="mt-6">
              <a href="https://t.me/IlyaWhiteMining" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full">Обсудить</Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Свой */}
        <Card className="card-elevated bg-black text-white border-border/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge className="rounded-full bg-white/10 text-white border border-white/20">ПАКЕТ</Badge>
              <CardTitle className="text-white">Свой</CardTitle>
            </div>
            <CardDescription>
              <div className="h-[1px] bg-white/20 mt-4" />
            </CardDescription>
          </CardHeader>
          <CardContent className="h-full flex flex-col">
            <div>
              <div className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight mt-1">Индивидуальные условия</div>
            </div>
            <div className="min-h-[140px]" />
            <a href="https://t.me/IlyaWhiteMining" target="_blank" rel="noopener noreferrer" className="mt-6">
              <Button size="lg" className="w-full">Обсудить</Button>
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Old CTA Section - removing content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{display: 'none'}}>
        {/* Request Quote */}
        <Card className="card-elevated">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Запросить коммерческое предложение</CardTitle>
            <CardDescription>
              Получите детальное КП с расчетами и условиями для вашего случая
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-center">
                <Clock className="w-4 h-4 mr-2" />
                Подготовим в течение 2 часов
              </div>
              <div className="flex items-center justify-center">
                <Shield className="w-4 h-4 mr-2" />
                Индивидуальные условия и скидки
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full"
              onClick={handleRequestQuote}
            >
              <FileText className="w-4 h-4 mr-2" />
              Запросить КП
            </Button>

          </CardContent>
        </Card>

        {/* Contact Manager */}
        <Card className="card-elevated">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Связаться с менеджером</CardTitle>
            <CardDescription>
              Обсудите детали и получите персональную консультацию
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Имя *</Label>
                  <Input
                    id="contact-name"
                    placeholder="Ваше имя"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="mail@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Телефон</Label>
                  <Input
                    id="contact-phone"
                    placeholder="+7 (999) 123-45-67"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-time">Удобное время</Label>
                  <Input
                    id="contact-time"
                    placeholder="например: завтра 15:00"
                    value={contactForm.preferredTime}
                    onChange={(e) => setContactForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">Дополнительно</Label>
                <Textarea
                  id="contact-message"
                  placeholder="Опишите ваши задачи и вопросы..."
                  rows={3}
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                />
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Отправляем...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Связаться с менеджером
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center p-6">
          <Users className="w-8 h-8 text-primary mx-auto mb-3" />
          <h4 className="font-semibold mb-2">500+ участников</h4>
          <p className="text-sm text-muted-foreground">
            Более 500 инвесторов уже выбрали WHITE
          </p>
        </Card>
        
        <Card className="text-center p-6">
          <PiggyBank className="w-8 h-8 text-primary mx-auto mb-3" />
          <h4 className="font-semibold mb-2">Пассивный доход</h4>
          <p className="text-sm text-muted-foreground">
            Доход без ежедневного участия
          </p>
        </Card>
        
        <Card className="text-center p-6">
          <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
          <h4 className="font-semibold mb-2">Стабильные выплаты</h4>
          <p className="text-sm text-muted-foreground">
            Регулярные выплаты участникам пула
          </p>
        </Card>
      </div>

      {/* Contact Information */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-center">Контактная информация</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Блок с контактами (Email/Телефон/Telegram/Режим работы) удален по запросу */}

          {/* Legal info (симметричная сетка 2x3) */}
          <div className="mt-6 pt-6 border-t border-border/60 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Row 1 */}
            <div className="flex items-start">
              <Copyright className="w-4 h-4 text-primary mr-3 mt-0.5" />
              <div className="font-medium"> 2025 | Все права защищены </div>
            </div>
            <div className="flex items-start">
              <FileText className="w-4 h-4 text-primary mr-3 mt-0.5" />
              <div>
                <div className="font-medium">ОГРНИП</div>
                <div className="text-sm text-muted-foreground">325527500079221</div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-start">
              <IdCard className="w-4 h-4 text-primary mr-3 mt-0.5" />
              <div>
                <div className="font-medium">ИП</div>
                <div className="text-sm text-muted-foreground">Грачев Сергей Владимирович</div>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="w-4 h-4 text-primary mr-3 mt-0.5" />
              <div>
                <div className="font-medium">Юр. адрес</div>
                <div className="text-sm text-muted-foreground">603124, Нижний Новгород, Лесной городок 4а, кв. 75</div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex items-start">
              <FileText className="w-4 h-4 text-primary mr-3 mt-0.5" />
              <div>
                <div className="font-medium">ИНН</div>
                <div className="text-sm text-muted-foreground">525714685436</div>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="w-4 h-4 text-primary mr-3 mt-0.5" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-sm text-muted-foreground">svgrachev110@gmail.com</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};