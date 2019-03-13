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

var _service : Service | null = null;

wss.on('connection', (ws: WebSocket) => {

    var serviceContext : any = {
        ws: ws
    };

    _service = new Service(1000) 
    
    _service.registerObserver(new Observer("websocket", 
            serviceContext, 
            function(data : any, context: any) { 
                context.ws.send(data);
    }));
    
    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        
        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');

    _service!.init();

    _service!.start();

});


//start our server
server.listen(port, () => {
    console.log(`Server started on port ${port} =)`);
});