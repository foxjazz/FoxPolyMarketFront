import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Market } from '../../models/market.model';
import { MarketService } from '../../services/market.service';
import { MarketCardComponent } from '../market-card/market-card.component';

@Component({
  selector: 'app-market-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MarketCardComponent],
  templateUrl: './market-list.component.html',
  styleUrl: './market-list.component.css',
})
export class MarketListComponent implements OnInit {
  markets = signal<Market[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  searchTerm = '';

  private searchInput$ = new Subject<string>();

  constructor(private marketService: MarketService) {
    console.log('[MarketListComponent] constructed');
  }

  ngOnInit(): void {
    console.log('[MarketListComponent] ngOnInit fired');
    this.loadTrending();

    this.searchInput$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => {
          this.loading.set(true);
          this.error.set(null);
          return term.trim()
            ? this.marketService.search(term.trim())
            : this.marketService.getTrending();
        })
      )
      .subscribe({
        next: (markets) => {
          this.markets.set(markets);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('[MarketListComponent] search failed', err);
          this.error.set('Could not reach the market data. Is the API running?');
          this.loading.set(false);
        },
      });
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.searchInput$.next(term);
  }

  private loadTrending(): void {
    console.log('[MarketListComponent] loadTrending called');
    this.loading.set(true);
    this.error.set(null);
    this.marketService.getTrending().subscribe({
      next: (markets) => {
        console.log('[MarketListComponent] got markets', markets);
        this.markets.set(markets);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('[MarketListComponent] request failed', err);
        this.error.set('Could not reach the market data. Is the API running?');
        this.loading.set(false);
      },
    });
  }
}
