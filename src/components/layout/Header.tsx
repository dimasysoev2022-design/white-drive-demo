import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { Shield, MessageCircle } from "lucide-react";

interface HeaderProps {
  userEmail: string;
  onContact: () => void;
}

export const Header = ({ userEmail, onContact }: HeaderProps) => {
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
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
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