import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Market } from '../../models/market.model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-market-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './market-card.component.html',
  styleUrl: './market-card.component.css',
})
export class MarketCardComponent {
  @Input({ required: true }) market!: Market;

  get isBinary(): boolean {
    return this.market.outcomeNames?.length === 2;
  }

  get yesLabel(): string {
    return this.market.outcomeNames?.[0] ?? 'Yes';
  }

  get noLabel(): string {
    return this.market.outcomeNames?.[1] ?? 'No';
  }

  get yesPct(): number {
    const p = this.market.outcomePriceValues?.[0] ?? 0;
    return Math.round(p * 100);
  }

  get noPct(): number {
    return 100 - this.yesPct;
  }

  /** For markets with more than two outcomes, show the current front-runner. */
  get leadingOutcome(): { name: string; pct: number } | null {
    const names = this.market.outcomeNames ?? [];
    const prices = this.market.outcomePriceValues ?? [];
    if (names.length === 0 || prices.length === 0) return null;

    let bestIdx = 0;
    for (let i = 1; i < prices.length; i++) {
      if (prices[i] > prices[bestIdx]) bestIdx = i;
    }

    return {
      name: names[bestIdx],
      pct: Math.round((prices[bestIdx] ?? 0) * 100),
    };
  }

  get formattedVolume(): string {
    const v = this.market.volume24hr ?? this.market.volume ?? 0;
    if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`;
    return `$${v.toFixed(0)}`;
  }

  get formattedEndDate(): string {
    if (!this.market.endDate) return '';
    const d = new Date(this.market.endDate);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }
}
