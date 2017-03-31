'use strict';
import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import HTTPCode from './constants/HttpCodeConstant';
import UserRouter from './routes/UserRouter';
import AuthRouter from './routes/AuthRouter';
import AssociationRouter from './routes/AssociationRouter';

class App {

    public express: express.Application;

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
        this.express.use(express.static('dist/public'));
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
    }

}

export default App;
