import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import cors = require('cors')
import {GameRoutes} from "./routes/GameRoutes";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {

        // create expressjs application
        this.app = express();

        // configure application
        this.config();

        // add api
        this.routes();
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
        // add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        // use logger middleware
        this.app.use(logger(<any>"dev"));

        // use json form parser middleware
        this.app.use(bodyParser.json());

        // use query string parser middleware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // use q promises
        global.Promise = require("bluebird").Promise;

        // use cookie parser middleware
        this.app.use(cookieParser("SECRET_GOES_HERE"));

        // use override middleware
        this.app.use(methodOverride());

        // catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        // enable cors
        this.app.use(cors());

        // error handling
        //noinspection TypeScriptValidateTypes
        this.app.use(errorHandler());
    }

    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    public routes() {
        let router: express.Router;
        router = express.Router();

        GameRoutes.create(router);

        // use router middleware
        this.app.use(router);
    }
}