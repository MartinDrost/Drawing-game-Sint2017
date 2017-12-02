import {IPlayer} from "./IPlayer";

export interface IGameState {
    player: IPlayer;
    ink: number;
    word: string;
}