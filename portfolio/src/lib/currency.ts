export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: "INR", symbol: "₹", name: "🇮🇳 INR (₹)", locale: "en-IN" },
  { code: "USD", symbol: "$", name: "🇺🇸 USD ($)", locale: "en-US" },
  { code: "EUR", symbol: "€", name: "🇪🇺 EUR (€)", locale: "en-DE" },
  { code: "GBP", symbol: "£", name: "🇬🇧 GBP (£)", locale: "en-GB" },
  { code: "JPY", symbol: "¥", name: "🇯🇵 JPY (¥)", locale: "ja-JP" },
  { code: "AUD", symbol: "A$", name: "🇦🇺 AUD (A$)", locale: "en-AU" },
  { code: "CAD", symbol: "C$", name: "🇨🇦 CAD (C$)", locale: "en-CA" },
  { code: "CHF", symbol: "CHF", name: "🇨🇭 CHF (CHF)", locale: "de-CH" },
  { code: "SGD", symbol: "S$", name: "🇸🇬 SGD (S$)", locale: "en-SG" },
  { code: "CNY", symbol: "¥", name: "🇨🇳 CNY (¥)", locale: "zh-CN" },
  { code: "AED", symbol: "AED", name: "🇦🇪 AED (AED)", locale: "ar-AE" },
  { code: "SAR", symbol: "SAR", name: "🇸🇦 SAR (SAR)", locale: "ar-SA" },
  { code: "NZD", symbol: "NZ$", name: "🇳🇿 NZD (NZ$)", locale: "en-NZ" },
  { code: "HKD", symbol: "HK$", name: "🇭🇰 HKD (HK$)", locale: "en-HK" },
  { code: "ZAR", symbol: "R", name: "🇿🇦 ZAR (R)", locale: "en-ZA" },
  { code: "SEK", symbol: "kr", name: "🇸🇪 SEK (kr)", locale: "sv-SE" },
  { code: "NOK", symbol: "kr", name: "🇳🇴 NOK (kr)", locale: "no-NO" },
  { code: "DKK", symbol: "kr", name: "🇩🇰 DKK (kr)", locale: "da-DK" },
  { code: "TRY", symbol: "₺", name: "🇹🇷 TRY (₺)", locale: "tr-TR" },
  { code: "BRL", symbol: "R$", name: "🇧🇷 BRL (R$)", locale: "pt-BR" },
  { code: "MXN", symbol: "$", name: "🇲🇽 MXN ($)", locale: "es-MX" },
  { code: "IDR", symbol: "Rp", name: "🇮🇩 IDR (Rp)", locale: "id-ID" },
  { code: "KRW", symbol: "₩", name: "🇰🇷 KRW (₩)", locale: "ko-KR" },
  { code: "MYR", symbol: "RM", name: "🇲🇾 MYR (RM)", locale: "ms-MY" },
  { code: "PHP", symbol: "₱", name: "🇵🇭 PHP (₱)", locale: "fil-PH" },
  { code: "THB", symbol: "฿", name: "🇹🇭 THB (฿)", locale: "th-TH" },
  { code: "VND", symbol: "₫", name: "🇻🇳 VND (₫)", locale: "vi-VN" },
  { code: "PLN", symbol: "zł", name: "🇵🇱 PLN (zł)", locale: "pl-PL" },
  { code: "ILS", symbol: "₪", name: "🇮🇱 ILS (₪)", locale: "he-IL" },
  { code: "EGP", symbol: "EGP", name: "🇪🇬 EGP (EGP)", locale: "ar-EG" },
  { code: "KWD", symbol: "KWD", name: "🇰🇼 KWD (KWD)", locale: "ar-KW" },
  { code: "QAR", symbol: "QAR", name: "🇶🇦 QAR (QAR)", locale: "ar-QA" },
  { code: "OMR", symbol: "OMR", name: "🇴🇲 OMR (OMR)", locale: "ar-OM" },
  { code: "BHD", symbol: "BHD", name: "🇧🇭 BHD (BHD)", locale: "ar-BH" },
  { code: "COP", symbol: "$", name: "🇨🇴 COP ($)", locale: "es-CO" },
  { code: "CLP", symbol: "$", name: "🇨🇱 CLP ($)", locale: "es-CL" },
  { code: "ARS", symbol: "$", name: "🇦🇷 ARS ($)", locale: "es-AR" },
  { code: "PEN", symbol: "S/.", name: "🇵🇪 PEN (S/.)", locale: "es-PE" },
  { code: "PKR", symbol: "Rs", name: "🇵🇰 PKR (Rs)", locale: "ur-PK" },
  { code: "BDT", symbol: "৳", name: "🇧🇩 BDT (৳)", locale: "bn-BD" },
  { code: "LKR", symbol: "Rs", name: "🇱🇰 LKR (Rs)", locale: "si-LK" },
  { code: "NGN", symbol: "₦", name: "🇳🇬 NGN (₦)", locale: "en-NG" },
  { code: "KES", symbol: "Ksh", name: "🇰🇪 KES (Ksh)", locale: "sw-KE" },
  { code: "GHS", symbol: "GH₵", name: "🇬🇭 GHS (GH₵)", locale: "en-GH" },
  { code: "MAD", symbol: "MAD", name: "🇲🇦 MAD (MAD)", locale: "ar-MA" },
  { code: "UAH", symbol: "₴", name: "🇺🇦 UAH (₴)", locale: "uk-UA" },
  { code: "HUF", symbol: "Ft", name: "🇭🇺 HUF (Ft)", locale: "hu-HU" },
  { code: "CZK", symbol: "Kč", name: "🇨🇿 CZK (Kč)", locale: "cs-CZ" },
  { code: "RON", symbol: "lei", name: "🇷🇴 RON (lei)", locale: "ro-RO" },
  { code: "BGN", symbol: "lv", name: "🇧🇬 BGN (lv)", locale: "bg-BG" },
  { code: "ISK", symbol: "kr", name: "🇮🇸 ISK (kr)", locale: "is-IS" },
  { code: "RUB", symbol: "₽", name: "🇷🇺 RUB (₽)", locale: "ru-RU" },
];

// Fallback rates (Base INR)
export const FALLBACK_RATES: Record<string, number> = {
  INR: 1.0,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0093,
  JPY: 1.91,
  AUD: 0.018,
  CAD: 0.016,
  CHF: 0.011,
  SGD: 0.016,
  CNY: 0.087,
  AED: 0.044,
  SAR: 0.045,
  NZD: 0.020,
  HKD: 0.094,
  ZAR: 0.22,
  SEK: 0.13,
  NOK: 0.13,
  DKK: 0.083,
  TRY: 0.40,
  BRL: 0.067,
  MXN: 0.21,
  IDR: 195.0,
  KRW: 16.5,
  MYR: 0.056,
  PHP: 0.70,
  THB: 0.43,
  VND: 300.0,
  PLN: 0.048,
  ILS: 0.045,
  EGP: 0.58,
  KWD: 0.0037,
  QAR: 0.044,
  OMR: 0.0046,
  BHD: 0.0045,
  COP: 48.0,
  CLP: 11.2,
  ARS: 11.0,
  PEN: 0.045,
  PKR: 3.3,
  BDT: 1.4,
  LKR: 3.6,
  NGN: 18.0,
  KES: 1.5,
  GHS: 0.18,
  MAD: 0.12,
  UAH: 0.50,
  HUF: 4.3,
  CZK: 0.28,
  RON: 0.055,
  BGN: 0.022,
  ISK: 1.67,
  RUB: 1.1,
};

export async function fetchExchangeRates(): Promise<Record<string, number>> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/INR");
    if (!res.ok) throw new Error("Failed to fetch rates");
    const data = await res.json();
    return data.rates;
  } catch (error) {
    console.warn("Using fallback exchange rates:", error);
    return FALLBACK_RATES;
  }
}

export async function detectUserCurrency(): Promise<string> {
  try {
    // Fast CORS-friendly country and currency detection
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) throw new Error("Failed to fetch location data");
    const data = await res.json();
    if (data.currency && CURRENCIES.some(c => c.code === data.currency)) {
      return data.currency;
    }
  } catch (error) {
    console.warn("Could not geolocate user currency, trying locale detection:", error);
  }

  // Fallback to browser locale detection
  try {
    const locale = navigator.language;
    if (locale.startsWith("en-US")) return "USD";
    if (locale.startsWith("en-GB")) return "GBP";
    if (locale.startsWith("ja")) return "JPY";
    if (locale.startsWith("en-AU")) return "AUD";
    if (locale.startsWith("en-CA")) return "CAD";
    if (locale.startsWith("de") || locale.startsWith("fr") || locale.startsWith("it") || locale.startsWith("es")) return "EUR";
    if (locale.endsWith("IN") || locale.startsWith("hi")) return "INR";
  } catch (e) {}

  return "INR"; // Default fallback
}

export function formatCurrencyValue(
  valInINR: number,
  targetCurrencyCode: string,
  rates: Record<string, number>
): string {
  const rate = rates[targetCurrencyCode] || FALLBACK_RATES[targetCurrencyCode] || 1.0;
  let targetVal = valInINR * rate;

  // Visual/marketing rounding for non-INR currencies
  if (targetCurrencyCode !== "INR") {
    if (targetVal >= 1000) {
      targetVal = Math.round(targetVal / 10) * 10; // round to nearest 10
    } else if (targetVal >= 100) {
      // Round to end in "9" (e.g. $249, $599, €229) for professional pricing feel
      const rounded = Math.round(targetVal / 10) * 10;
      targetVal = rounded - 1;
    } else {
      targetVal = Math.round(targetVal);
    }
  } else {
    // Clean thousands rounding for INR
    if (targetVal >= 1000) {
      targetVal = Math.round(targetVal / 1000) * 1000;
    } else {
      targetVal = Math.round(targetVal / 100) * 100;
    }
  }

  const currencyInfo = CURRENCIES.find(c => c.code === targetCurrencyCode) || {
    code: targetCurrencyCode,
    symbol: "",
    locale: "en-US",
  };

  try {
    return new Intl.NumberFormat(currencyInfo.locale, {
      style: "currency",
      currency: targetCurrencyCode,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(targetVal);
  } catch (error) {
    return `${currencyInfo.symbol}${targetVal.toLocaleString()}`;
  }
}
