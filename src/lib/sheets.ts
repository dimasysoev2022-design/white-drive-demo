export type SheetRow = Record<string, string>;

// Ожидаемый формат колонок в таблице Google Sheets (первая строка — заголовки):
// id,name,year,description,purchasePrice,performance,miningStartDate,workingDays,minedBTC,btcPriceRub,currentProfit,roiPercent,paybackPercent,dailyMiningCurrent,uptimePercent

export async function fetchSheetCSV(csvUrl: string): Promise<SheetRow[]> {
  const res = await fetch(csvUrl, { cache: "no-store" });
  if (!res.ok) throw new Error(`Sheets fetch failed: ${res.status}`);
  const text = await res.text();
  return parseCSV(text);
}

export function parseCSV(csv: string): SheetRow[] {
  const records: string[][] = [];
  let field = "";
  let record: string[] = [];
  let inQuotes = false;
  const pushField = () => { record.push(field); field = ""; };
  const pushRecord = () => { records.push(record); record = []; };

  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i];
    if (inQuotes) {
      if (ch === '"') {
        const next = csv[i + 1];
        if (next === '"') { // escaped quote
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        pushField();
      } else if (ch === '\n') {
        pushField();
        pushRecord();
      } else if (ch === '\r') {
        // ignore, handle on \n
      } else {
        field += ch;
      }
    }
  }
  // flush last field/record
  pushField();
  pushRecord();

  // remove empty trailing record if any
  while (records.length && records[records.length - 1].length === 1 && records[records.length - 1][0] === "") {
    records.pop();
  }
  if (!records.length) return [];
  const headers = records[0].map((h) => h.trim());
  const rows: SheetRow[] = [];
  for (let r = 1; r < records.length; r++) {
    const rec = records[r];
    if (rec.length === 1 && rec[0].trim() === "") continue;
    const obj: SheetRow = {};
    headers.forEach((h, idx) => {
      obj[h] = (rec[idx] ?? "").trim();
    });
    rows.push(obj);
  }
  return rows;
}


