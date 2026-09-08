# Wiring notes

## 1. Enable HttpClient

In `src/app/app.config.ts`, add `provideHttpClient()`:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    // ...your existing providers
  ],
};
```

## 2. Drop in the market-list page

In `src/app/app.routes.ts`:

```ts
import { Routes } from '@angular/router';
import { MarketListComponent } from './components/market-list/market-list.component';

export const routes: Routes = [
  { path: '', component: MarketListComponent },
  // ...your existing routes
];
```

Or, if you don't have routing set up yet, just drop `<app-market-list></app-market-list>`
into your root `app.component.html`.

## 3. Point the service at your API

Open `src/app/services/market.service.ts` and set `API_BASE_URL` to wherever
`FoxPolyMarket.Api` is actually running (check
`FoxPolyMarketApi/Properties/launchSettings.json` for the exact port —
commonly `https://localhost:7100` or similar for `dotnet run`).

## 4. Merge the global styles

Copy the contents of `GLOBAL_STYLES_TO_MERGE.css` into your `src/styles.css`.
These are the CSS variables (`--bg`, `--surface`, `--accent`, etc.) the card
and list components reference.

## 5. CORS

The updated `Program.cs` already allows `http://localhost:4200`. If you run
`ng serve` on a different port, update the CORS policy in `Program.cs` to match.
