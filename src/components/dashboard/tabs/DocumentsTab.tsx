import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Eye, 
  Search, 
  Filter,
  Shield,
  FileCheck,
  Building,
  Receipt,
  BookOpen,
  AlertCircle,
  X
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Document {
  id: string;
  title: string;
  description: string;
  category: 'contract' | 'act' | 'guide' | 'legal' | 'financial';
  type: string;
  size: string;
  watermark: boolean;
}

export const DocumentsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const documents: Document[] = [
    {
      id: "contract-001",
      title: "Договор купли продажи оборудования",
      description: "Типовой договор на покупку майнинг оборудования",
      category: "contract",
      type: "PDF",
      size: "247 KB",
      watermark: false
    },
    {
      id: "act-001",
      title: "Акт выполненных работ за месяц",
      description: "Детализация выполненных работ за отчетный период",
      category: "act",
      type: "PDF", 
      size: "156 KB",
      watermark: false
    },
    {
      id: "guide-001",
      title: "Договор аренды",
      description: "Договор аренды помещения для майнинг оборудования",
      category: "guide",
      type: "PDF",
      size: "1.2 MB",
      watermark: false
    },
    {
      id: "legal-001",
      title: "Политика конфиденциальности",
      description: "Правила обработки персональных данных участников",
      category: "legal",
      type: "PDF",
      size: "89 KB",
      watermark: false
    },
    {
      id: "financial-001", 
      title: "Договор товарищества для ИП и ООО",
      description: "Договор о совместной деятельности для ИП и ООО",
      category: "financial",
      type: "PDF",
      size: "342 KB",
      watermark: false
    },
    {
      id: "contract-002",
      title: "Приложение к договору купли продажи",
      description: "Дополнительные условия к договору купли продажи оборудования",
      category: "contract",
      type: "PDF",
      size: "123 KB", 
      watermark: false
    },
    {
      id: "legal-002",
      title: "Пользовательское соглашение",
      description: "Условия использования сервисов WHITE",
      category: "legal", 
      type: "PDF",
      size: "234 KB",
      watermark: false
    }
  ];

  const categories = [
    { id: 'contract', name: 'Договоры', icon: FileCheck, count: 2 },
    { id: 'act', name: 'Акты', icon: Receipt, count: 1 },
    { id: 'guide', name: 'Руководства', icon: BookOpen, count: 1 },
    { id: 'legal', name: 'Правовые', icon: Shield, count: 2 },
    { id: 'financial', name: 'Финансовые', icon: Building, count: 1 }
  ];

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.id === category);
    return categoryData?.icon || FileText;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'contract': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'act': return 'bg-green-500/10 text-green-500 border-green-500/20'; 
      case 'guide': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'legal': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'financial': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openDocument = (doc: Document) => {
    setSelectedDocument(doc);
    // In real app, would track analytics event: td_doc_open_${doc.id}
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Документы</h2>
          <p className="text-muted-foreground">Договоры, акты и документация пула</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск документов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Фильтры
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            Все документы ({documents.length})
          </Button>
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center"
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.name} ({category.count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map(doc => {
          const CategoryIcon = getCategoryIcon(doc.category);
          
          return (
            <Card key={doc.id} className="card-elevated transition-smooth hover:glow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mr-3">
                      <CategoryIcon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="outline" className={getCategoryColor(doc.category)}>
                      {doc.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <CardTitle className="text-sm font-medium leading-tight mb-2">
                    {doc.title}
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2">
                    {doc.description}
                  </CardDescription>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">{doc.size}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDocument(doc)}
                    className="opacity-0 group-hover:opacity-100 transition-fast"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Открыть
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No results */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Документы не найдены</h3>
          <p className="text-muted-foreground">
            Попробуйте изменить поисковый запрос или фильтры
          </p>
        </div>
      )}

      {/* Navigation Button */}
      <div className="flex justify-center pt-6">
        <Button className="px-8">
          Перейти к видео
        </Button>
      </div>

      {/* Document Viewer Modal */}
      <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
        <DialogContent className="max-w-4xl h-[80vh] p-0">
          <DialogHeader className="px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary" />
                  {selectedDocument?.title}
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedDocument?.description}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedDocument(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="flex-1 flex items-center justify-center bg-muted/30 relative overflow-hidden">
            {/* Demo watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-6xl font-bold text-muted-foreground/20 rotate-45 select-none">
                ДЕМО ВЕРСИЯ
              </div>
            </div>
            
            {/* Mock PDF content */}
            <div className="w-full h-full p-8 bg-white text-black overflow-auto">
              <div className="max-w-2xl mx-auto space-y-4">
                <h1 className="text-2xl font-bold text-center mb-8">
                  {selectedDocument?.title}
                </h1>
                
                <div className="space-y-4 text-sm">
                  <p>
                    <strong>1. Предмет договора</strong>
                  </p>
                  <p>
                    1.1. Исполнитель обязуется оказать Заказчику услуги по предоставлению 
                    вычислительных мощностей для майнинга криптовалют в рамках пула WHITE, 
                    а Заказчик обязуется принять и оплатить эти услуги.
                  </p>
                  
                  <p>
                    <strong>2. Права и обязанности сторон</strong>
                  </p>
                  <p>
                    2.1. Исполнитель обеспечивает стабильную работу майнинг-оборудования 
                    с аптаймом не менее 99%.
                  </p>
                  <p>
                    2.2. Заказчик получает ежедневные начисления пропорционально 
                    приобретенной мощности.
                  </p>
                  
                  <div className="bg-gray-100 p-4 rounded text-center mt-8">
                    <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-600">
                      Это демонстрационная версия документа.
                      <br />
                      Полный текст доступен после заключения договора.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};