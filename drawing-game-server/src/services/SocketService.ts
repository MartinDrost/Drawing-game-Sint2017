import Server = SocketIO.Server;
import socketIO = require('socket.io');
import {IPlayerSocket} from "../interfaces/IPlayerSocket";
import Socket = SocketIO.Socket;
import {IPaintStroke} from "../interfaces/IPaintStroke";
import {gameService} from "./GameService";

export const socketService = new class SocketService {
    private io: Server;
    private sockets: IPlayerSocket[] = [];

    constructor() {
    }

    /**
     * Register the http application
     * @param app
     */
    public registerApp(app: any): void {
        this.io = socketIO(app);

        this.io.on('connection', socket => {
            this.addConnection(socket);
        });
    }

    /**
     * Start listening on a port
     * @param port
     */
    public listen(port: number): void {
        this.io.listen(port);
        console.log("Socket listening on port: " + port);
    }

    /**
     * Bind listeners to the provided socket
     * @param socket
     */
    public addEventListeners(socket: Socket): void {
        const socketRef = socket;

        socket.on("register", token => {
            this.registerToken(socketRef.id, token)
        });
        socket.on("paint", stroke => {
            this.playerStroke(socketRef.id, <IPaintStroke>stroke);
        });
        socket.on("nextRound", nextWord => {
            gameService.nextRound(nextWord);
        });
        socket.on("disconnect", () => {
            this.removeSocket(socketRef);
        });
    }

    /**
     * Add a new connection
     * @param socket
     */
    public addConnection(socket: Socket) {
        this.sockets.push(<IPlayerSocket> {
            socket: socket
        });
        this.addEventListeners(socket);
    }

    /**
     * Registers a session token at a socket
     * @param socketId
     * @param token
     */
    public registerToken(socketId: string, token: string) {
        this.getSocketById(socketId).token = token;
        this.sendPlayers();
        this.sendGameState();
    }

    /**
     * Get a socket by its id
     * @param id
     */
    public getSocketById(id: string): IPlayerSocket {
        for(let i = 0, l = this.sockets.length; i < l; i++) {
            if(this.sockets[i].socket.id == id) {
                return this.sockets[i];
            }
        }
        return null;
    }

    /**
     * Handle the stroke of a brush
     * @param socketId
     * @param stroke
     */
    public playerStroke(socketId: string, stroke: IPaintStroke): void {
        if(gameService.playerStroke((this.getSocketById(socketId) || { token: "" }).token, stroke)) {
            this.io.emit("stroke", stroke);
            this.sendGameState();
        }
    }

    /**
     * Send the new game state
     */
    public sendGameState(): void {
        this.io.emit("gameState", gameService.gameState);
    }

    /**
     * send a list of players
     */
    public sendPlayers(): void {
        let players = [];
        for(let i = 0; i < gameService.players.length; i ++) {
            players.push(gameService.players[i].username);
        }

        this.io.emit("players", players);
    }

    /**
     * remove a socket
     * @param socket
     */
    public removeSocket(socket: Socket): void {
        for(let i = 0, l = this.sockets.length; i < l; i++) {
            if(this.sockets[i].socket.id == socket.id) {
                gameService.removePlayer(this.sockets[i].token);
                this.sockets.splice(i, 1);
                break;
            }
        }
        this.sendPlayers();
    }
};