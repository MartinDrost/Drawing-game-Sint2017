import { Component, OnInit } from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {IGameState} from "../../interfaces/IGameState";

@Component({
  selector: 'app-spectator-page',
  templateUrl: './spectator-page.component.html',
  styleUrls: ['./spectator-page.component.scss']
})
export class SpectatorPageComponent implements OnInit {

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

}
