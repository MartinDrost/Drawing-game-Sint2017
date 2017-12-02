import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {IPlayer} from "../interfaces/IPlayer";
import {IPaintStroke} from "../interfaces/IPaintStroke";
import Socket = SocketIOClient.Socket;
import * as io from 'socket.io-client';


@Injectable()
export class SocketService {

  public server: Socket;

  constructor() {
    this.server = io(environment.socket);
  }

  public register(token: string) {
    this.server.emit("register", token);
  }

  public paint(stroke: IPaintStroke) {
    this.server.emit("paint", stroke);
  }

  public nextRound(nextWord: boolean) {
    this.server.emit("nextRound", nextWord);
  }

}
