import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Shield, Timer, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OTPLoginProps {
  onLogin: (email: string) => void;
}

export const OTPLogin = ({ onLogin }: OTPLoginProps) => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Mock API call - in real app would send OTP to email
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep('otp');
    toast({
      title: "Код отправлен",
      description: `Проверьте почту ${email}. Код действует 10 минут.`,
    });
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({
        title: "Ошибка",
        description: "Введите 6-значный код",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Mock verification - in real app would verify OTP
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo, any 6-digit code works
    if (otp === '123456' || otp.length === 6) {
      toast({
        title: "Добро пожаловать!",
        description: "Доступ активирован на 76 часов",
      });
      onLogin(email);
    } else {
      toast({
        title: "Неверный код",
        description: "Попробуйте ещё раз",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">WHITE</h1>
          <p className="text-muted-foreground">Тест-драйв платформы</p>
        </div>

        <Card className="card-elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {step === 'email' ? 'Получить доступ' : 'Введите код'}
            </CardTitle>
            <CardDescription>
              {step === 'email' 
                ? '76-часовой демо-доступ к WHITE' 
                : `Код отправлен на ${email}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'email' ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email адрес</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                  size="lg"
                >
                  {loading ? 'Отправляем...' : 'Получить код'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOTPSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">6-значный код</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-2xl font-mono"
                    maxLength={6}
                    required
                  />
                </div>
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Timer className="w-4 h-4 mr-1" />
                  Код действует 10 минут
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || otp.length !== 6}
                  size="lg"
                >
                  {loading ? 'Проверяем...' : 'Войти'}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => setStep('email')}
                >
                  Изменить email
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Demo hint */}
        <div className="text-center">
          <div className="inline-flex items-center text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
            <CheckCircle className="w-4 h-4 mr-2" />
            Демо-код: <span className="font-mono ml-1">123456</span>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
            <span>Реальные дашборды и метрики</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
            <span>Документы и видео-гайды</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
            <span>Персональная поддержка</span>
          </div>
        </div>
      </div>
    </div>
  );
};