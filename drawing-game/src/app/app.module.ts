import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.routing";
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatCardModule, MatSelectModule, MatInputModule, MatButtonModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import { JoinGameFormComponent } from './components/join-game-form/join-game-form.component';
import {GameService} from "./services/game.service";
import {HttpClientModule} from "@angular/common/http";
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { SpectatorPageComponent } from './pages/spectator-page/spectator-page.component';
import {SocketService} from "./services/socket.service";
import { DrawingCanvasComponent } from './components/drawing-canvas/drawing-canvas.component';
import { DrawPageComponent } from './pages/draw-page/draw-page.component';
import {AuthenticatedGuard} from "./guards/authenticated.guard";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    JoinGameFormComponent,
    ArtistPageComponent,
    SpectatorPageComponent,
    DrawingCanvasComponent,
    DrawPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatCardModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [GameService, SocketService, AuthenticatedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
