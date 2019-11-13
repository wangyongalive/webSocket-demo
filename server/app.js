let randomData = require('./utils/getTime');
const WebSocket = require('ws');
const server = new WebSocket.Server({port: 8080});

//
server.on('open', function open() {
    console.log('connected');
});

server.on('close', function close() {
    console.log('disconnected');
});

server.on('connection', function connection(ws, req) {
    console.log("connection");
    // 接收到前端发送的消息
    ws.on('message', function incoming(message) {
        console.log("message");
    });
});

let data = [];
for (let i = 0; i < 1000; i++) {
    data.push(randomData());
}

setInterval(function () {
    for (let i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
        // 广播消息给所有客户端
        server.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
}, 5000);


