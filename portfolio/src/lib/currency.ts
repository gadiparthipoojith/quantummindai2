export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: "INR", symbol: "₹", name: "Indian Rupee (INR)", locale: "en-IN" },
  { code: "USD", symbol: "$", name: "US Dollar (USD)", locale: "en-US" },
  { code: "EUR", symbol: "€", name: "Euro (EUR)", locale: "en-DE" },
  { code: "GBP", symbol: "£", name: "British Pound (GBP)", locale: "en-GB" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen (JPY)", locale: "ja-JP" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar (AUD)", locale: "en-AU" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar (CAD)", locale: "en-CA" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc (CHF)", locale: "de-CH" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar (SGD)", locale: "en-SG" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan (CNY)", locale: "zh-CN" },
  { code: "AED", symbol: "AED", name: "UAE Dirham (AED)", locale: "ar-AE" },
  { code: "SAR", symbol: "SAR", name: "Saudi Riyal (SAR)", locale: "ar-SA" },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar (NZD)", locale: "en-NZ" },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar (HKD)", locale: "en-HK" },
  { code: "ZAR", symbol: "R", name: "South African Rand (ZAR)", locale: "en-ZA" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona (SEK)", locale: "sv-SE" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone (NOK)", locale: "no-NO" },
  { code: "DKK", symbol: "kr", name: "Danish Krone (DKK)", locale: "da-DK" },
  { code: "TRY", symbol: "₺", name: "Turkish Lira (TRY)", locale: "tr-TR" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real (BRL)", locale: "pt-BR" },
  { code: "MXN", symbol: "$", name: "Mexican Peso (MXN)", locale: "es-MX" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah (IDR)", locale: "id-ID" },
  { code: "KRW", symbol: "₩", name: "South Korean Won (KRW)", locale: "ko-KR" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit (MYR)", locale: "ms-MY" },
  { code: "PHP", symbol: "₱", name: "Philippine Peso (PHP)", locale: "fil-PH" },
  { code: "THB", symbol: "฿", name: "Thai Baht (THB)", locale: "th-TH" },
  { code: "VND", symbol: "₫", name: "Vietnamese Dong (VND)", locale: "vi-VN" },
  { code: "PLN", symbol: "zł", name: "Polish Zloty (PLN)", locale: "pl-PL" },
  { code: "ILS", symbol: "₪", name: "Israeli Shekel (ILS)", locale: "he-IL" },
  { code: "EGP", symbol: "EGP", name: "Egyptian Pound (EGP)", locale: "ar-EG" },
  { code: "KWD", symbol: "KWD", name: "Kuwaiti Dinar (KWD)", locale: "ar-KW" },
  { code: "QAR", symbol: "QAR", name: "Qatari Riyal (QAR)", locale: "ar-QA" },
  { code: "OMR", symbol: "OMR", name: "Omani Rial (OMR)", locale: "ar-OM" },
  { code: "BHD", symbol: "BHD", name: "Bahraini Dinar (BHD)", locale: "ar-BH" },
  { code: "COP", symbol: "$", name: "Colombian Peso (COP)", locale: "es-CO" },
  { code: "CLP", symbol: "$", name: "Chilean Peso (CLP)", locale: "es-CL" },
  { code: "ARS", symbol: "$", name: "Argentine Peso (ARS)", locale: "es-AR" },
  { code: "PEN", symbol: "S/.", name: "Peruvian Sol (PEN)", locale: "es-PE" },
  { code: "PKR", symbol: "Rs", name: "Pakistani Rupee (PKR)", locale: "ur-PK" },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka (BDT)", locale: "bn-BD" },
  { code: "LKR", symbol: "Rs", name: "Sri Lankan Rupee (LKR)", locale: "si-LK" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira (NGN)", locale: "en-NG" },
  { code: "KES", symbol: "Ksh", name: "Kenyan Shilling (KES)", locale: "sw-KE" },
  { code: "GHS", symbol: "GH₵", name: "Ghanaian Cedi (GHS)", locale: "en-GH" },
  { code: "MAD", symbol: "MAD", name: "Moroccan Dirham (MAD)", locale: "ar-MA" },
  { code: "UAH", symbol: "₴", name: "Ukrainian Hryvnia (UAH)", locale: "uk-UA" },
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint (HUF)", locale: "hu-HU" },
  { code: "CZK", symbol: "Kč", name: "Czech Koruna (CZK)", locale: "cs-CZ" },
  { code: "RON", symbol: "lei", name: "Romanian Leu (RON)", locale: "ro-RO" },
  { code: "BGN", symbol: "lv", name: "Bulgarian Lev (BGN)", locale: "bg-BG" },
  { code: "ISK", symbol: "kr", name: "Icelandic Króna (ISK)", locale: "is-IS" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble (RUB)", locale: "ru-RU" },
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
