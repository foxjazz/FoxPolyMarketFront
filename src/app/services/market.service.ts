import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Market,
  MarketPriceHistory,
  PriceHistoryInterval,
  TrendingOrder,
} from '../models/market.model';
import { environment } from '../../environments/environment';

const API_BASE_URL = environment.apiUrl;
// Point this at wherever your FoxPolyMarket.Api project runs.
// Check FoxPolyMarketApi/Properties/launchSettings.json for the exact port.
//const API_BASE_URL = '/api';

@Injectable({ providedIn: 'root' })
export class MarketService {
  constructor(private http: HttpClient) {
  }

  getTrending(
    limit = 20,
    order: TrendingOrder = 'volume24hr',
    ascending = false
  ): Observable<Market[]> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('order', order)
      .set('ascending', ascending);
    console.log('[MarketService] requesting', `${API_BASE_URL}/markets/trending`, params.toString());
    return this.http.get<Market[]>(`${API_BASE_URL}/markets/trending`, { params });
  }

  search(query: string): Observable<Market[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<Market[]>(`${API_BASE_URL}/markets/search`, { params });
  }

  getById(id: string): Observable<Market> {
    return this.http.get<Market>(`${API_BASE_URL}/markets/${encodeURIComponent(id)}`);
  }

  getHistory(
    marketId: string,
    tokenId: string,
    interval: PriceHistoryInterval = '1d'
  ): Observable<MarketPriceHistory> {
    const params = new HttpParams().set('tokenId', tokenId).set('interval', interval);

    return this.http.get<MarketPriceHistory>(
      `${API_BASE_URL}/markets/${encodeURIComponent(marketId)}/history`,
      { params }
    );
  }
}
