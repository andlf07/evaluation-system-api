import MongoDB from './lib/db';
import Server from './server';

const app = new Server();

const db = new MongoDB();

app.listenPort();