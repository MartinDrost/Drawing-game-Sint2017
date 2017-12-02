import { Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {ArtistPageComponent} from "./pages/artist-page/artist-page.component";
import {SpectatorPageComponent} from "./pages/spectator-page/spectator-page.component";
import {DrawPageComponent} from "./pages/draw-page/draw-page.component";
import {AuthenticatedGuard} from "./guards/authenticated.guard";

export const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'draw',
    component: DrawPageComponent,
    canActivate: [AuthenticatedGuard]
  }
];

