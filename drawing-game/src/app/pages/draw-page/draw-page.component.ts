import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";
import {RoleEnum} from "../../interfaces/RoleEnum";

@Component({
  selector: 'app-draw-page',
  templateUrl: './draw-page.component.html',
  styleUrls: ['./draw-page.component.scss']
})
export class DrawPageComponent implements OnInit {

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
  }

  public isArtist(): boolean {
    return this.gameService.getSession().role == RoleEnum.Artist;
  }

}
