import { Injectable } from '@angular/core';
import {IPlayer} from "../interfaces/IPlayer";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class GameService {
  private endpoints = {
    joinGame: environment.api + "/game/join"
  };

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Sends a request to attempt to authenticate with the server
   * @param player
   */
  public joinGame(player: IPlayer): Promise<any> {
    return this.http.post(this.endpoints.joinGame, player, {
      headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
    }).toPromise();
  }

  /**
   * saves the session
   * @param player
   */
  public setSession(player: IPlayer): void {
    localStorage.setItem("session", JSON.stringify(player));
  }

  /**
   * gets the saved session
   * @returns {IPlayer}
   */
  public getSesstion(): IPlayer {
    return <IPlayer>JSON.parse(localStorage.getItem("session"));
  }
}
