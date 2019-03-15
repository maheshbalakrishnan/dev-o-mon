import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import Service from './Service';
import Observer from './Observer';

const app = express();
const port: Number = 8999;

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

var _service : Service | null = new Service(1000);
_service!.init();
_service!.start();

function getClientName(req: http.IncomingMessage) : string {
    return "ip_" + req.connection.remoteAddress + "_p_" + req.connection.remotePort; 
}


wss.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {

    var serviceContext : any = {
        ws: ws
    };

    var clientName = getClientName(req);

    _service!.registerObserver(new Observer(clientName, 
            serviceContext, 
            function(data : any, context: any) { 
                context.ws.send(JSON.stringify(data));
    }));
    
    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {
        
        ws.send(`you: ${message}. Server: Shut up!`);

    });

    ws.on('close', () => {

        //remove the observer from the service
        _service!.removeObserver(clientName);

    });

    //send immediatly a feedback to the incoming connection    
    ws.send('You are now connected!');
});


//start our server
server.listen(port, () => {
    console.log(`Websocket listening on ${port} =)`);
});