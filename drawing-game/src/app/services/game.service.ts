import { Injectable } from '@angular/core';
import {IPlayer} from "../interfaces/IPlayer";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {SocketService} from "./socket.service";

@Injectable()
export class GameService {
  private session: any;

  private endpoints = {
    joinGame: environment.api + "/game/join"
  };

  constructor(
    private http: HttpClient,
    private socketService: SocketService
  ) {
    this.removeSession();
  }

  /**
   * Sends a request to attempt to authenticate with the server
   * @param player
   */
  public joinGame(player: IPlayer): Promise<any> {
    let promise = this.http.post(this.endpoints.joinGame, player, {
      headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
    }).toPromise();

    // save the session if successful
    promise.then(
      session => {
        this.setSession(<IPlayer>session);
      }
    );

    return promise;
  }

  /**
   * saves the session
   * @param player
   */
  public setSession(player: IPlayer): void {
    this.session = player;
    this.socketService.register(player.token);
  }

  public removeSession(): void {
    this.session = null;
  }

  public validateSession(): boolean {
    if(this.session != null) {
      this.socketService.register(this.session.token);
      return true;
    }

    return false;
  }

  /**
   * gets the saved session
   * @returns {IPlayer}
   */
  public getSession(): IPlayer {
    return this.session;
  }
}
