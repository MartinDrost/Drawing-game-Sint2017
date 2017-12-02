import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {GameService} from "../../services/game.service";
import {IPlayer} from "../../interfaces/IPlayer";
import {RoleEnum} from "../../interfaces/RoleEnum";

@Component({
  selector: 'app-join-game-form',
  templateUrl: './join-game-form.component.html',
  styleUrls: ['./join-game-form.component.scss']
})
export class JoinGameFormComponent implements OnInit {

  constructor(
    private router: Router,
    private gameService: GameService
  ) { }

  ngOnInit() {
  }

  public submitForm(f: NgForm): void {
    if(!f.valid) {
      return;
    }

    let player = <IPlayer>{
      username: f.form.controls['username']['value'],
      role: <number>f.form.controls['roleSelect']['value']
    };

    this.gameService.joinGame(player).then(
      createdPlayer => {
        if(createdPlayer.role == RoleEnum.Artist) {
          this.router.navigate(['artist']);
        } else if(createdPlayer.role == RoleEnum.Spectator) {
          this.router.navigate(['spectator']);
        }
      },
      error => {
        alert("Something went wrong");
      }
    );
  }

}
