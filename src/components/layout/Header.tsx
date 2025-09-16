import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, MessageCircle, Clock } from "lucide-react";

interface HeaderProps {
  userEmail: string;
  onContact: () => void;
}

export const Header = ({ userEmail, onContact }: HeaderProps) => {
  const [timeLeft, setTimeLeft] = useState(76 * 3600); // 76 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft > 24 * 3600) return "text-success";
    if (timeLeft > 6 * 3600) return "text-warning";
    return "text-destructive";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">WHITE</h1>
            <p className="text-xs text-muted-foreground">Тест-драйв</p>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <div className="text-center">
            <div className={`font-mono text-lg font-bold ${getTimeColor()}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-xs text-muted-foreground">осталось</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="hidden sm:inline-flex">
            ДЕМО
          </Badge>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onContact}
            className="flex items-center"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Связаться</span>
          </Button>
        </div>
      </div>
    </header>
  );
};