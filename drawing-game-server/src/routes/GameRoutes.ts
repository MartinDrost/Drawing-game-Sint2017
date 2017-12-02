import { Router } from "express";
import {gameController} from "../controllers/GameController";

export class GameRoutes {

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        // log
        console.log("[IndexRoute::create] Creating tweet routes.");

        //add home page route
        router.post("/game/join", gameController.joinGame);
    }


}