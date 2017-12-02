import {IPlayer} from "../interfaces/IPlayer";
const TokenGenerator = require('uuid-token-generator');

export const gameService = new class GameService {

    private players: IPlayer[] = [];
    private tokenGenerator: any;

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
            resolve(player);
            console.log(this.players)
        });

    }

    /**
     * Returns an existing player by its username
     * @param username
     * @returns {any}
     */
    public getPlayerByUsername(username: string): IPlayer {
        for(let i=0, l=this.players.length; i < l; i++) {
            if(this.players[i].username == username) {
                return this.players[i];
            }
        }
        return null;
    }

    /**
     * Returns an existing player by its token
     * @param username
     * @returns {any}
     */
    public getPlayerByToken(token: string): IPlayer {
        for(let i=0, l=this.players.length; i < l; i++) {
            if(this.players[i].token == token) {
                return this.players[i];
            }
        }
        return null;
    }
};