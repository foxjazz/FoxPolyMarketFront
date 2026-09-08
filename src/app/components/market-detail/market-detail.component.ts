import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Market } from '../../models/market.model';
import { MarketService } from '../../services/market.service';

@Component({
  selector: 'app-market-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './market-detail.component.html',
  styleUrl: './market-detail.component.css',
})
export class MarketDetailComponent implements OnInit {
  market = signal<Market | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private marketService: MarketService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('No market id provided.');
      this.loading.set(false);
      return;
    }

    this.marketService.getById(id).subscribe({
      next: (market) => {
        this.market.set(market);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('[MarketDetailComponent] request failed', err);
        this.error.set('Could not load this market. Is the API running?');
        this.loading.set(false);
      },
    });
  }
}
