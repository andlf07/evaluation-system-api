import express, { Application } from 'express';
import cors from 'cors'
import { config } from './config';
import { questionRouter } from './routes/question';
import { testMaker } from './routes/makeTest';
import MongoDB from './lib/db';


export default class Server {

  private app: Application;
  private port;
  private db;
  private apiPath = {
    homeRoute: '/',
    questions: '/api/questions',
    testMaker: '/api/test'
  }

  constructor() {
    this.app = express();
    this.port = config.port;
    this.db = new MongoDB();

    //Middlewares
    this.middlewares();

    //rutas de mi app
    this.routes();
  }

  get getApp() {
    return this.app;
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //read and bodyparser
    this.app.use(express.json());

  }

  routes() {
    this.app.use(this.apiPath.questions, questionRouter);
    this.app.use(this.apiPath.testMaker, testMaker);
  }

  listenPort() {
    this.app.listen(this.port, () => console.log('Server online Yiy'));
  }
}