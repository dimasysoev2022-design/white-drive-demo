import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { Shield, MessageCircle } from "lucide-react";
import { useSheetBtcRub } from "@/hooks/use-sheet-btc-rub";

interface HeaderProps {
  userEmail: string;
  onContact: () => void;
}

export const Header = ({ userEmail, onContact }: HeaderProps) => {
  const { data: btcRub, isLoading, isError } = useSheetBtcRub({ refetchIntervalMs: 30000 });

  const display = (() => {
    if (!btcRub) return "948 432 8  ₽"; // temporary placeholder will be replaced by loader below
    const raw = (btcRub.raw || "").trim();
    // Ensure trailing currency symbol if missing
    const hasCurrency = /₽|RUB/i.test(raw);
    return hasCurrency ? raw : `${raw} ₽`;
  })();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto grid grid-cols-3 h-16 items-center px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 select-none">
          <h1 className="font-logo text-2xl sm:text-3xl tracking-tight leading-none">
            <span className="text-[hsl(47_96%_53%)]">Wh</span>
            <span className="relative inline-block align-top">
              <span className="text-[hsl(47_96%_53%)]">i</span>
              {/* removed decorative triangle */}
            </span>
            <span className="text-[hsl(47_96%_53%)]">te</span>
          </h1>
        </div>

        {/* BTC/RUB live price centered and moved away from logo */}
        <div className="hidden sm:flex items-center justify-center">
          <div className="inline-flex items-center px-3 py-1 rounded-md bg-secondary/40 border border-border/40 shadow-sm">
            <span className="text-sm text-muted-foreground mr-2">1 BTC =</span>
            <span className="text-base font-extrabold tracking-tight text-[hsl(47_96%_53%)]">
              {isError ? "—" : isLoading && !btcRub ? "…" : display}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3">
          <ThemeToggle />
          <Button 
            asChild
            variant="outline" 
            size="sm" 
            className="flex items-center"
          >
            <a
              href="https://t.me/IlyaWhiteMining"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Связаться</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};