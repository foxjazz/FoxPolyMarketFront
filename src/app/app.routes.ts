import { Routes } from '@angular/router';
import { MarketListComponent } from './components/market-list/market-list.component';
import { MarketDetailComponent } from './components/market-detail/market-detail.component';

export const routes: Routes = [
  { path: '', component: MarketListComponent },
  { path: 'market/:id', component: MarketDetailComponent },
];
