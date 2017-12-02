import Socket = SocketIO.Socket;

export interface IPlayerSocket {
    socket: Socket;
    token: string;
}