import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarketListComponent } from './components/market-list/market-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MarketListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Fox2PolyFront');
}
