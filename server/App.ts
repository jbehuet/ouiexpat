'use strict';
import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as rollbar from 'rollbar';
import * as _ from 'lodash';
import RollbarHelper from './helpers/RollbarHelper';
import HTTPCode from './constants/HttpCodeConstant';
import CONFIG from './config';
import UserRouter from './routes/UserRouter';
import AuthRouter from './routes/AuthRouter';
import ExpatriationRouter from './routes/ExpatriationRouter';
import AssociationRouter from './routes/AssociationRouter';
import ListRouter from './routes/ListRouter';
import BlogRouter from './routes/BlogRouter';
import JobRouter from './routes/JobRouter';
import StatisticRouter from './routes/StatisticRouter';

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

    this.rollbarHelper = RollbarHelper.getInstance();
    this.express.use(rollbar.errorHandler(CONFIG.rollbar))
  }

  private routes(): void {
    const router = express.Router();
    const userRouter = new UserRouter();
    const authRouter = new AuthRouter();
    const associationRouter = new AssociationRouter();
    const expatriationRouter = new ExpatriationRouter();
    const listRouter = new ListRouter();
    const blogRouter = new BlogRouter();
    const jobRouter = new JobRouter();
    const statisticRouter = new StatisticRouter();

    this.express.use('/api', router);
    this.express.use('/api/v1/auth', authRouter.router);
    this.express.use('/api/v1/users', userRouter.router);
    this.express.use('/api/v1/associations', associationRouter.router);
    this.express.use('/api/v1/expatriations', expatriationRouter.router);
    this.express.use('/api/v1/lists', listRouter.router);
    this.express.use('/api/v1/blogs', blogRouter.router);
    this.express.use('/api/v1/jobs', jobRouter.router);
    this.express.use('/api/v1/statistics', statisticRouter.router);
    //uploads
    this.express.use('/uploads', express.static('dist/server/uploads'));
    //Catch all other routes
    this.express.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/index.html'));
    });
  }

}

export default App;
