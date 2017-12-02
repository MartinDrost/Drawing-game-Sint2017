import { Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {ArtistPageComponent} from "./pages/artist-page/artist-page.component";
import {SpectatorPageComponent} from "./pages/spectator-page/spectator-page.component";

export const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'spectator',
    component: SpectatorPageComponent
  },
  {
    path: 'artist',
    component: ArtistPageComponent
  }
];

