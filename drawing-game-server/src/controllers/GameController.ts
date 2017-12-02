
import {NextFunction, Request, Response} from "express";
import {gameService} from "../services/GameService";
import {IPlayer} from "../interfaces/IPlayer";

export const gameController = new class GameController {

    /**
     * Let a player join he game
     * @param req
     * @param res
     * @param next
     */
    public joinGame(req: Request, res: Response, next: NextFunction) {

        res.set('Content-Type', 'application/json');

        let player = <IPlayer>req.body;
        gameService.addPlayer(player).then(
            result => {
                res.status(200).send(result);
            },
            error => {
                res.status(500).send({messsage: "Something went wrong"});
            }
        );
    }
};