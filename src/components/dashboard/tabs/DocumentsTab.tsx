import { useEffect, useState } from "react";
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

const PARTNERSHIP_DOC_URL =
  "https://docs.google.com/document/d/1IylpgVm5SmWM1shxKLkhejMXZxlsLsl_EdWUXHyijXU/edit?tab=t.0";
const PARTNERSHIP_DOC_EXPORT_TXT_URL =
  "https://docs.google.com/document/d/1IylpgVm5SmWM1shxKLkhejMXZxlsLsl_EdWUXHyijXU/export?format=txt";
const PARTNERSHIP_DOC_EXPORT_HTML_URL =
  "https://docs.google.com/document/d/1IylpgVm5SmWM1shxKLkhejMXZxlsLsl_EdWUXHyijXU/export?format=html";

// Агентский договор — единый шаблон
const AGENT_DOC_ID = "1jXxBQsa7y0q8lNO2zitdpJhBMxutP8I1cVCN-L4BLe0";
const AGENT_DOC_EXPORT_TXT_URL = `https://docs.google.com/document/d/${AGENT_DOC_ID}/export?format=txt`;
const AGENT_DOC_EXPORT_HTML_URL = `https://docs.google.com/document/d/${AGENT_DOC_ID}/export?format=html`;

// Договоры аренды из папки Google Drive (укажи реальные ID документов)
// Источник: https://drive.google.com/drive/folders/1fMPsK8XnMho5OglGzfT9TCOvNj5_Xy80
const LEASE_DOC_IDS: Record<'individual'|'legal'|'selfEmployed'|'ip', string> = {
  // Физ лицо_Договор аренды майнинг оборудования
  individual: "12SWghmsRANoqRIArs_2jyLXKfKTDw0agZTBlRJCuMs4",
  // Юр лицо Договор аренды майнингового оборудования с юл
  legal: "1ttGd289XeGTjl3Ll7Ar5c1CbBKU1BLWCF_86_Pe2OCo",
  // Самозанятый_Договор аренды майнингового оборудования
  selfEmployed: "1WYob22s5wyDZLZf6t3eDmKCOGlysrtAskox7hgY10gk",
  // ИП_Договор аренды майнингового оборудования
  ip: "1V8TARWz72ie19A5xXy5lyEhs24CRI2nTfg1PNBNHGrg",
};

const getLeaseDocExportUrls = (entity: 'individual'|'legal'|'selfEmployed'|'ip') => {
  const id = LEASE_DOC_IDS[entity];
  if (!id) return { html: null as string | null, txt: null as string | null };
  return {
    html: `https://docs.google.com/document/d/${id}/export?format=html`,
    txt: `https://docs.google.com/document/d/${id}/export?format=txt`,
  };
};

interface Document {
  id: string;
  title: string;
  description: string;
  category: 'contract' | 'act' | 'guide' | 'legal' | 'financial';
  type: string;
  size: string;
  watermark: boolean;
  entityType?: 'individual' | 'legal' | 'selfEmployed' | 'ip' | 'both';
}

export const DocumentsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedEntityType, setSelectedEntityType] = useState<'all' | 'individual' | 'legal' | 'selfEmployed' | 'ip'>('all');
  const [googleDocText, setGoogleDocText] = useState<string | null>(null);
  const [googleDocHtml, setGoogleDocHtml] = useState<string | null>(null);

  useEffect(() => {
    const loadGoogleDoc = async () => {
      if (!selectedDocument) return;

      // по умолчанию очищаем
      setGoogleDocText(null);
      setGoogleDocHtml(null);

      // Финансовый (пример из исходника)
      if (selectedDocument.id === "financial-001") {
        try {
          const htmlResp = await fetch(PARTNERSHIP_DOC_EXPORT_HTML_URL, { credentials: "omit" });
          if (htmlResp.ok) {
            const html = await htmlResp.text();
            setGoogleDocHtml(html);
            setGoogleDocText(null);
            return;
          }
        } catch {}
        try {
          const txtResp = await fetch(PARTNERSHIP_DOC_EXPORT_TXT_URL, { credentials: "omit" });
          if (!txtResp.ok) throw new Error(`HTTP ${txtResp.status}`);
          const txt = await txtResp.text();
          setGoogleDocText(txt);
          setGoogleDocHtml(null);
        } catch {
          setGoogleDocText(null);
          setGoogleDocHtml(null);
        }
        return;
      }

      // Агентские договоры — единый шаблон
      const isAgent = selectedDocument.id.endsWith("-agent");
      if (isAgent) {
        try {
          const htmlResp = await fetch(AGENT_DOC_EXPORT_HTML_URL, { credentials: "omit" });
          if (htmlResp.ok) {
            const html = await htmlResp.text();
            setGoogleDocHtml(html);
            setGoogleDocText(null);
            return;
          }
        } catch {}
        try {
          const txtResp = await fetch(AGENT_DOC_EXPORT_TXT_URL, { credentials: "omit" });
          if (!txtResp.ok) throw new Error(`HTTP ${txtResp.status}`);
          const txt = await txtResp.text();
          setGoogleDocText(txt);
          setGoogleDocHtml(null);
        } catch {
          setGoogleDocText(null);
          setGoogleDocHtml(null);
        }
        return;
      }

      // Договоры аренды — отдельный документ на каждую сущность
      const isLease = selectedDocument.id.endsWith("-lease");
      if (isLease) {
        const entity = (selectedDocument.entityType ?? 'individual') as 'individual'|'legal'|'selfEmployed'|'ip';
        const urls = getLeaseDocExportUrls(entity);
        if (!urls.html && !urls.txt) {
          // нет ID — оставим фолбэк контент
          return;
        }
        try {
          if (urls.html) {
            const htmlResp = await fetch(urls.html, { credentials: "omit" });
            if (htmlResp.ok) {
              const html = await htmlResp.text();
              setGoogleDocHtml(html);
              setGoogleDocText(null);
              return;
            }
          }
        } catch {}
        try {
          if (urls.txt) {
            const txtResp = await fetch(urls.txt, { credentials: "omit" });
            if (!txtResp.ok) throw new Error(`HTTP ${txtResp.status}`);
            const txt = await txtResp.text();
            setGoogleDocText(txt);
            setGoogleDocHtml(null);
          }
        } catch {
          setGoogleDocText(null);
          setGoogleDocHtml(null);
        }
      }
    };
    loadGoogleDoc();
  }, [selectedDocument]);

  const documents: Document[] = [
    // Физические лица
    {
      id: "contract-individual-agent",
      title: "Агентский договор для покупки оборудования (для физических лиц)",
      description: "Типовой агентский договор на покупку оборудования для физ. лиц",
      category: "contract",
      type: "PDF",
      size: "240 KB",
      watermark: false,
      entityType: "individual"
    },
    {
      id: "contract-individual-lease",
      title: "Договор аренды оборудования (для физических лиц)",
      description: "Договор аренды оборудования для физ. лиц",
      category: "contract",
      type: "PDF",
      size: "260 KB",
      watermark: false,
      entityType: "individual"
    },

    // Юридические лица
    {
      id: "contract-legal-agent",
      title: "Агентский договор для покупки оборудования (для юридических лиц)",
      description: "Типовой агентский договор на покупку оборудования для юр. лиц",
      category: "contract",
      type: "PDF",
      size: "255 KB",
      watermark: false,
      entityType: "legal"
    },
    {
      id: "contract-legal-lease",
      title: "Договор аренды оборудования (для юридических лиц)",
      description: "Договор аренды оборудования для юр. лиц",
      category: "contract",
      type: "PDF",
      size: "275 KB",
      watermark: false,
      entityType: "legal"
    },

    // Самозанятые
    {
      id: "contract-self-employed-agent",
      title: "Агентский договор для покупки оборудования (для самозанятых)",
      description: "Типовой агентский договор на покупку оборудования для самозанятых",
      category: "contract",
      type: "PDF",
      size: "245 KB",
      watermark: false,
      entityType: "selfEmployed"
    },
    {
      id: "contract-self-employed-lease",
      title: "Договор аренды оборудования (для самозанятых)",
      description: "Договор аренды оборудования для самозанятых",
      category: "contract",
      type: "PDF",
      size: "265 KB",
      watermark: false,
      entityType: "selfEmployed"
    },

    // ИП
    {
      id: "contract-ip-agent",
      title: "Агентский договор для покупки оборудования (для ИП)",
      description: "Типовой агентский договор на покупку оборудования для ИП",
      category: "contract",
      type: "PDF",
      size: "250 KB",
      watermark: false,
      entityType: "ip"
    },
    {
      id: "contract-ip-lease",
      title: "Договор аренды оборудования (для ИП)",
      description: "Договор аренды оборудования для ИП",
      category: "contract",
      type: "PDF",
      size: "270 KB",
      watermark: false,
      entityType: "ip"
    }
  ];

  const categories = [
    { id: 'contract', name: 'Договоры', icon: FileCheck, count: 3 },
    { id: 'act', name: 'Акты', icon: Receipt, count: 0 },
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
      case 'legal': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'financial': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    const matchesEntityType = selectedEntityType === 'all' ||
      doc.entityType === selectedEntityType ||
      doc.entityType === 'both';
    return matchesCategory && matchesEntityType;
  });

  const getDocumentContent = (doc: Document) => {
    switch (doc.id) {
      case "financial-001":
        return `ДОГОВОР ТОВАРИЩЕСТВА ДЛЯ ИП И ООО\n\n[ЗДЕСЬ НУЖЕН ТОЧНЫЙ ТЕКСТ ИЗ GOOGLE DOCS. ВСТАВЬТЕ ЕГО БЕЗ ИЗМЕНЕНИЙ.]`;
      case "contract-001":
        return `ДОГОВОР КУПЛИ-ПРОДАЖИ ОБОРУДОВАНИЯ № 27/А/2025-1
г. Москва «27» июня 2025 г.

ИП Грачев Сергей Владимирович (ИНН 525714685436, ОГРНИП 325527500079221), именуемый в дальнейшем «Продавец» и Гражданин(ка) РФ Иванов Иван Иванович, именуемый в дальнейшем «Покупатель», а совместно именуемые «Стороны», заключили настоящий договор о нижеследующем:

1. ПРЕДМЕТ ДОГОВОРА.

1.1. Продавец обязуется передать, а Покупатель принять и оплатить Компьютерное оборудование и комплектующие, специализированные сервера (далее по тексту Товар), на условиях настоящего договора. Наименование, номенклатура (ассортимент), количество и цена Товара согласовываются сторонами в соответствии со спецификацией (Приложение № 1), которая является неотъемлемой частью настоящего договора.

1.2. Товар принадлежит Продавцу на праве собственности, свободен от залогов, обременений и притязаний третьих лиц.

2. ЦЕНА ДОГОВОРА И УСЛОВИЯ ПЛАТЕЖА

2.1. Платеж по настоящему Договору производится путем безналичных расчетов с условием о внесения предоплаты в размере 100 % стоимости товара в течение 3 (трех) рабочих дней, с даты получения счета.

2.2. Счет на оплату действителен в течение 3 рабочих дней.

2.3. Оплата счетов Продавца производится в Российских рублях НДС не облагается, в связи с применением Исполнителем упрощенной системы налогообложения.

3. УСЛОВИЯ ПОСТАВКИ

3.1. Передача Товара, указанного в Приложении № 1 к настоящему Договору осуществляется на протяжении срока действия настоящего Договора.

3.2. Товар, указанный в Приложении № 1 подлежит передаче на условиях, согласованных в спецификации.

4. КАЧЕСТВО ТОВАРА

4.1. Продавец гарантирует Покупателю соответствие качества поставляемого им товара стандартам и требованиям, а также заявленным заводом изготовителем техническим характеристикам.

4.2. Покупатель уведомлен, что приобретаемый товар является новым, Производителем установлен гарантийный срок на Товар до 12 (двенадцати) календарных месяцев.

5. ОТВЕТСТВЕННОСТЬ СТОРОН

5.1. В случае задержки передачи Товара по вине Продавца он уплачивает Покупателю пени в размере 0,1% от суммы не поставленного Товара за каждый день просрочки.

5.2. Уплата штрафных санкций не освобождает Стороны от выполнения своих обязательств по Договору.

6. ПРОЧИЕ УСЛОВИЯ

6.1. Настоящий договор вступает в силу с момента его подписания и действует до полного исполнения Сторонами его условий.

6.2. Все изменения и дополнения к настоящему договору должны быть составлены в письменной форме и подписаны Сторонами.

6.3. Настоящий договор составлен в 2 экземплярах — по одному экземпляру для каждой из Сторон.`;

      case "contract-002":
        return `ДОГОВОР КУПЛИ-ПРОДАЖИ ОБОРУДОВАНИЯ № 27/Б/2025-2
г. Москва «05» августа 2025 г.

ИП Грачев Сергей Владимирович (ИНН 525714685436, ОГРНИП 325527500079221), именуемый в дальнейшем «Продавец» и ООО ____ в лице ___, действующей на основании Устава, именуемый в дальнейшем «Покупатель», а совместно именуемые «Стороны», заключили настоящий договор о нижеследующем:

1. ПРЕДМЕТ ДОГОВОРА.

1.1. Продавец обязуется передать, а Покупатель принять и оплатить Компьютерное оборудование и комплектующие, специализированные сервера (далее по тексту Товар), на условиях настоящего договора.

1.2. Товар принадлежит Продавцу на праве собственности, свободен от залогов, обременений и притязаний третьих лиц.

2. ЦЕНА ДОГОВОРА И УСЛОВИЯ ПЛАТЕЖА

2.1. Платеж по настоящему Договору производится путем безналичных расчетов с условием о внесения предоплаты в размере 100 % стоимости товара в течение 3 (трех) рабочих дней.

2.2. Оплата счетов Продавца производится в Российских рублях НДС не облагается, в связи с применением Исполнителем упрощенной системы налогообложения.

3. УСЛОВИЯ ПОСТАВКИ

3.1. Передача Товара осуществляется на протяжении срока действия настоящего Договора.

4. КАЧЕСТВО ТОВАРА

4.1. Продавец гарантирует Покупателю соответствие качества поставляемого им товара стандартам и требованиям.

4.2. Производителем установлен гарантийный срок на Товар до 12 (двенадцати) календарных месяцев.

5. ОТВЕТСТВЕННОСТЬ СТОРОН

5.1. В случае задержки передачи Товара по вине Продавца он уплачивает Покупателю пени в размере 0,1% от суммы не поставленного Товара за каждый день просрочки.

6. ПРОЧИЕ УСЛОВИЯ

6.1. Настоящий договор вступает в силу с момента его подписания и действует до полного исполнения Сторонами его условий.

6.2. Все изменения и дополнения к настоящему договору должны быть составлены в письменной форме и подписаны Сторонами.`;

      case "contract-003":
        return `ДОГОВОР АРЕНДЫ ОБОРУДОВАНИЯ №
г. Москва 30.07.2025 г.

Гражданин(ка) РФ ФИО, именуемый в дальнейшем «Арендодатель», с одной стороны, и Индивидуальный предприниматель Билявский Вадим Иосифович (ИНН 770202027009, ОГРНИП 325774600093249), именуемый в дальнейшем «Арендатор», с другой стороны, заключили настоящий Договор о нижеследующем:

1. ПРЕДМЕТ ДОГОВОРА

1.1. Арендодатель передает во временное владение и пользование, а Арендатор принимает оборудование, идентифицирующие признаки которого указаны в Спецификации (Приложение №1) к настоящему Договору.

1.2. Оборудование находится в техническом состоянии, пригодном для его использования в целях, предусмотренных в настоящем Договоре.

1.3. Оборудование передается Арендатору по адресу: 141031, Московская область, городской округ Мытищи, посёлок Вешки, ул. Заводская, 24.

2. СРОК ДЕЙСТВИЯ ДОГОВОРА

2.1. Настоящий Договор заключается сроком на 11 (одиннадцать) месяцев и вступает в силу с момента подписания.

2.2. Окончание срока действия настоящего Договора не освобождает Стороны от ответственности за его неисполнение.

3. ПОРЯДОК ПЕРЕДАЧИ ОБОРУДОВАНИЯ

3.1. Передача Оборудования производится по Акту к настоящему Договору, который подписывается Арендодателем и Арендатором в течение 5 (пяти) рабочих дней после подписания настоящего Договора.

5. АРЕНДНАЯ ПЛАТА

5.1.1 Ежемесячная арендная плата за Оборудование составляет 2900 рублей 00 копеек, включая НДФЛ.

5.1.2 Начисление арендной платы начинается с момента подписания Сторонами акта приема-передачи Оборудования.

5.1.3 Оплата арендных платежей производится ежемесячно не позднее 15 (пятнадцатого) числа текущего месяца.

6. ОТВЕТСТВЕННОСТЬ СТОРОН

6.1 При неисполнении или ненадлежащем исполнении обязательств виновная Сторона несет ответственность в соответствии с действующим законодательством.

6.2 В случае неуплаты арендной платы Арендатор уплачивает Арендодателю неустойку в виде пени в размере 0,1% от размера задолженности за каждый день просрочки.`;

      case "contract-004":
        return `ДОГОВОР АРЕНДЫ ОБОРУДОВАНИЯ №
г. Москва 30.07.2025 г.

ООО ____ в лице ___, действующей на основании Устава, именуемый в дальнейшем «Арендодатель», с одной стороны, и Индивидуальный предприниматель Билявский Вадим Иосифович (ИНН 770202027009, ОГРНИП 325774600093249), именуемый в дальнейшем «Арендатор», с другой стороны, заключили настоящий Договор о нижеследующем:

1. ПРЕДМЕТ ДОГОВОРА

1.1. Арендодатель передает во временное владение и пользование, а Арендатор принимает оборудование, идентифицирующие признаки которого указаны в Спецификации (Приложение №1) к настоящему Договору.

1.2. Оборудование находится в техническом состоянии, пригодном для его использования в целях, предусмотренных в настоящем Договоре.

1.3. Оборудование передается Арендатору по адресу: 141031, Московская область, городской округ Мытищи, посёлок Вешки, ул. Заводская, 24.

2. СРОК ДЕЙСТВИЯ ДОГОВОРА

2.1. Настоящий Договор заключается сроком на 11 (одиннадцать) месяцев и вступает в силу с момента подписания.

2.2. Окончание срока действия настоящего Договора не освобождает Стороны от ответственности за его неисполнение.

3. ПОРЯДОК ПЕРЕДАЧИ ОБОРУДОВАНИЯ

3.1. Передача Оборудования производится по Акту к настоящему Договору, который подписывается Арендодателем и Арендатором в течение 5 (пяти) рабочих дней после подписания настоящего Договора.

5. АРЕНДНАЯ ПЛАТА

5.1.1 Ежемесячная арендная плата за Оборудование составляет 2900 рублей 00 копеек, НДС не облагается, в связи с применением Исполнителем упрощенной системы налогообложения.

5.1.2 Начисление арендной платы начинается с момента подписания Сторонами акта приема-передачи Оборудования.

5.1.3 Оплата арендных платежей производится ежемесячно не позднее 15 (пятнадцатого) числа текущего месяца.

6. ОТВЕТСТВЕННОСТЬ СТОРОН

6.1 При неисполнении или ненадлежащем исполнении обязательств виновная Сторона несет ответственность в соответствии с действующим законодательством.

6.2 В случае неуплаты арендной платы Арендатор уплачивает Арендодателю неустойку в виде пени в размере 0,1% от размера задолженности за каждый день просрочки.`;

      default:
        return `Это демонстрационная версия документа.

1. ОБЩИЕ ПОЛОЖЕНИЯ

1.1. Настоящий документ содержит основные условия и требования.

1.2. Документ является типовым и может быть адаптирован под конкретные потребности.

2. ОСНОВНЫЕ УСЛОВИЯ

2.1. Все условия определяются в соответствии с действующим законодательством.

2.2. Изменения и дополнения вносятся в письменной форме.

Полный текст документа доступен после заключения договора.`;
    }
  };

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
          <p className="text-muted-foreground">Договоры, акты и документация</p>
        </div>

        {/* Entity Type Filter Buttons */}
        <div className="flex gap-3">
          <Button
            variant={selectedEntityType === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedEntityType('all')}
            className="flex-1"
          >
            Все документы
          </Button>
          <Button
            variant={selectedEntityType === 'individual' ? 'default' : 'outline'}
            onClick={() => setSelectedEntityType('individual')}
            className="flex-1"
          >
            Список документов для физических лиц
          </Button>
          <Button
            variant={selectedEntityType === 'legal' ? 'default' : 'outline'}
            onClick={() => setSelectedEntityType('legal')}
            className="flex-1"
          >
            Список документов для юридических лиц
          </Button>
          <Button
            variant={selectedEntityType === 'selfEmployed' ? 'default' : 'outline'}
            onClick={() => setSelectedEntityType('selfEmployed')}
            className="flex-1"
          >
            Список документов для самозанятых
          </Button>
          <Button
            variant={selectedEntityType === 'ip' ? 'default' : 'outline'}
            onClick={() => setSelectedEntityType('ip')}
            className="flex-1"
          >
            Список документов для ИП
          </Button>
        </div>

        {/* Category Filter removed per design request */}
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
                    {doc.id === "financial-001" ? (
                      <a
                        href={PARTNERSHIP_DOC_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus:outline-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Badge variant="outline" className={getCategoryColor(doc.category)}>
                          {doc.type}
                        </Badge>
                      </a>
                    ) : (
                      <Badge variant="outline" className={getCategoryColor(doc.category)}>
                        {doc.type}
                      </Badge>
                    )}
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
            </div>
          </DialogHeader>
          
          <div className="flex-1 flex items-center justify-center bg-muted/30 relative overflow-hidden">
            {selectedDocument?.id !== "financial-001" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-6xl font-bold text-muted-foreground/20 rotate-45 select-none">
                  ДЕМО ВЕРСИЯ
                </div>
              </div>
            )}
            <div className="w-full h-full p-0 overflow-auto">
              <div className="mx-auto my-6 bg-transparent text-black max-w-[900px] w-full">
                <div className="bg-white shadow-xl rounded-sm px-12 py-10 leading-relaxed min-h-[1123px]">
                  {googleDocHtml ? (
                    <div className="doc-html" dangerouslySetInnerHTML={{ __html: googleDocHtml }} />
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold text-center mb-8">
                        {selectedDocument?.title}
                      </h1>
                      <div className="text-[15px] whitespace-pre-wrap">
                        {googleDocText ?? (selectedDocument && getDocumentContent(selectedDocument))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};