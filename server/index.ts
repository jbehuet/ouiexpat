import * as http from 'http';
import * as mongoose from 'mongoose';
import App from './App';
import CONFIG from './config';
import Seeds from './seeds'


const port = normalizePort(CONFIG.port || 3000);
const app = new App().express;
app.set('port', port);

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);

mongoose.Promise = Promise;
mongoose.connect(CONFIG.mongodb.uri, function(err) {
    if (!err) {
        console.log('Database : Success')
        const seeds = new Seeds();
        seeds.start().then(()=>{
          console.log("Seeds : Success");
          return server.listen(port);;
        }).catch((err) => {
            console.log(err);
            process.exit(1);
        });
    } else {
        console.error('App starting error:', err.stack);
        process.exit(1);
    }
});

function normalizePort(val: number | string): number | string | boolean {
        let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port)) return val;
        else if (port >= 0) return port;
        else return false;
    }


function onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') throw error;
        let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

function onListening(): void {
        let addr = server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        console.info(`Server listening on ${bind}`);
    }
