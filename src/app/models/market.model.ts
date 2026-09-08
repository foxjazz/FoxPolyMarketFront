export interface Market {
  id: string;
  question: string;
  slug?: string | null;
  description?: string | null;
  active: boolean;
  closed: boolean;

  image?: string | null;
  icon?: string | null;
  category?: string | null;

  volume?: number | null;
  volume24hr?: number | null;
  liquidity?: number | null;

  startDate?: string | null;
  endDate?: string | null;

  // Raw JSON-encoded strings from Gamma (kept for completeness / debugging)
  outcomes?: string | null;
  clobTokenIds?: string | null;
  outcomePrices?: string | null;

  // Convenience parsed arrays populated server-side by the API
  outcomeNames: string[];
  outcomePriceValues: number[];
  clobTokenIdList: string[];
}

export interface MarketPricePoint {
  timestamp: number;
  price: number;
}

export interface MarketPriceHistory {
  marketId: string;
  tokenId: string;
  outcome?: string | null;
  prices: MarketPricePoint[];
}

export type PriceHistoryInterval = '1h' | '6h' | '1d' | '1w' | '1m' | 'max';

export type TrendingOrder = 'volume24hr' | 'volume' | 'liquidity' | 'startDate';
