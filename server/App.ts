'use strict';
import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as rollbar from 'rollbar';
import RollbarHelper from './helpers/RollbarHelper';
import HTTPCode from './constants/HttpCodeConstant';
import CONFIG from './config';
import UserRouter from './routes/UserRouter';
import AuthRouter from './routes/AuthRouter';
import AssociationRouter from './routes/AssociationRouter';

class App {

    public express: express.Application;
    public rollbarHelper: RollbarHelper;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // Override HTTP methods to support DELETE PUT
        this.express.use(methodOverride('X-HTTP-Method-Override'));

        console.log(`Server Mode : ${this.express.get('env')}`)
        if (this.express.get('env') === 'production')
            this.express.use(express.static('dist/client'));
        if (CONFIG.rollbar) {
            this.rollbarHelper = RollbarHelper.getInstance();
            this.express.use(rollbar.errorHandler(CONFIG.rollbar))
        }
    }

    private routes(): void {
        const router = express.Router();
        const userRouter = new UserRouter();
        const authRouter = new AuthRouter();
        const associationRouter = new AssociationRouter();
        this.express.use('/api', router);
        this.express.use('/api/v1/auth', authRouter.router);
        this.express.use('/api/v1/users', userRouter.router);
        this.express.use('/api/v1/associations', associationRouter.router);
        //Catch all other routes
        this.express.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/index.html'));
        });
    }

}

export default App;
