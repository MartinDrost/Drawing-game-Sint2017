import {IPlayer} from "../interfaces/IPlayer";
import {IGameState} from "../interfaces/IGameState";
import {socketService} from "./SocketService";
import {IPaintStroke} from "../interfaces/IPaintStroke";
import {RoleEnum} from "../interfaces/RoleEnum";
const TokenGenerator = require('uuid-token-generator');

export const gameService = new class GameService {

    private INK_PER_ROUND = 100;

    public players: IPlayer[] = [];
    private tokenGenerator: any;

    public gameState: IGameState;


    private words = [
        "Coole piet (Diego)", "Katarina", "Stefan", "Piemelfort", "K-pop", "Aardbeienjam"
    ];

    constructor() {
        this.tokenGenerator = new TokenGenerator()
    }

    /**
     * add a player to the game
     * @returns {Promise<IPlayer>}
     */
    public addPlayer(player: IPlayer): Promise<IPlayer> {
        return new Promise( (resolve, reject) => {
            if(this.getPlayerByUsername(player.username) != null) {
                return reject();
            }

            player.token = this.tokenGenerator.generate();
            this.players.push(player);

            if(this.getArtists().length == 1) {
                this.nextRound(false);
            }

            resolve(player);
        });
    }

    /**
     * Returns an existing player by its username
     * @param username
     * @returns {any}
     */
    public getPlayerByUsername(username: string): IPlayer {
        for(let i = 0, l = this.players.length; i < l; i++) {
            if(this.players[i].username == username) {
                return this.players[i];
            }
        }
        return null;
    }

    /**
     * Returns an existing player by its token
     * @returns {any}
     * @param token
     */
    public getPlayerByToken(token: string): IPlayer {
        for(let i = 0, l = this.players.length; i < l; i++) {
            if(this.players[i].token == token) {
                return this.players[i];
            }
        }
        return null;
    }

    public getArtists(): IPlayer[] {
        let eligiblePlayers = [];
        for(let i = 0; i < this.players.length; i++) {
            if(this.players[i].role == RoleEnum.Artist) {
                eligiblePlayers.push(this.players[i]);
            }
        }
        return eligiblePlayers;
    }

    /**
     * Initiate new round
     * @param nextWord
     */
    public nextRound(nextWord: boolean): void {
        if(this.getArtists().length == 0) {
            return;
        }

        let newState = <IGameState>{
            ink: this.INK_PER_ROUND,
            player: (this.gameState || { player: {} }).player,
            word: (this.gameState || { word: {} }).word
        };

        if(this.gameState == null){
            newState.player = this.getArtists()[0];
            newState.word = this.words[0];
        } else if(nextWord) {
            for(let i = 0; i < this.words.length; i++) {
                if(this.words[i] == this.gameState.word) {
                    newState.word = this.words.length > i + 1 ? this.words[i+1] : this.words[0];
                    break;
                }
            }
        } else {
            let eligiblePlayers = this.getArtists();
            for(let i = 0; i < eligiblePlayers.length; i++) {
                if(eligiblePlayers[i].token == this.gameState.player.token) {
                    newState.player = eligiblePlayers.length > i + 1 ? eligiblePlayers[i+1] : eligiblePlayers[0];
                    break;
                }
            }
        }

        this.gameState = newState;

        socketService.sendGameState();
    }

    /**
     * Handle a player stroke
     * @param token
     * @param stroke
     * @returns {boolean}
     */
    public playerStroke(token: string, stroke: IPaintStroke): boolean {
        if(this.gameState == null || token != this.gameState.player.token) {
            return false;
        }

        this.gameState.ink -= 1;
        if(this.gameState.ink <= 0) {
            this.nextRound(false);
        }

        return true;
    }

    /**
     * Remove a player from the game
     * @param token
     */
    public removePlayer(token: string) {
        if(this.gameState != null && token == this.gameState.player.token) {
            this.nextRound(false);

            if(this.players.length == 1) {
                this.gameState = null;
            }
        }

        for(let i = 0, l = this.players.length; i < l; i++) {
            if(this.players[i].token == token) {
                this.players.splice(i, 1);
                break;
            }
        }
    }
};