import { Component, OnInit } from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {IGameState} from "../../interfaces/IGameState";

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss']
})
export class ArtistPageComponent implements OnInit {

  public gameState: IGameState = <IGameState>{};
  public players: string[] = [];

  constructor(
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.socketService.server.on("gameState", gameState => {
      this.gameState = gameState;
    });
    this.socketService.server.on("players", players => {
      this.players = players;
    });
  }

  public nextRound() {
    this.socketService.nextRound(false);
  }

  public nextWord() {
    this.socketService.nextRound(true);
  }

}
