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
  FileText,
  Phone,
  Mail,
  Send
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


      {/* CTA Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
          <h4 className="font-semibold mb-2">99.8% аптайм</h4>
          <p className="text-sm text-muted-foreground">
            Стабильная работа оборудования круглосуточно
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
          <CardDescription className="text-center">
            Другие способы связи с командой WHITE
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-primary mr-3" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">sales@white-platform.ru</div>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-primary mr-3" />
                <div>
                  <div className="font-medium">Телефон</div>
                  <div className="text-sm text-muted-foreground">+7 (495) 123-45-67</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 text-primary mr-3" />
                <div>
                  <div className="font-medium">Telegram</div>
                  <div className="text-sm text-muted-foreground">@white_sales</div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-primary mr-3" />
                <div>
                  <div className="font-medium">Режим работы</div>
                  <div className="text-sm text-muted-foreground">пн-пт 10:00-19:00 МСК</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};