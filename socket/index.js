const WebSocket = require('ws');


module.exports = function(server){
    const WebSocketServer = WebSocket.Server
    const wss = new WebSocketServer({
        server: server
    });
    wss.on("connection",async (ws) => {
        ws.on('message', function (message) {
            console.log(`[SERVER] Received: ${message}`);
            ws.send(`ECHO: ${message}`, (err) => {
                if (err) {
                    console.log(`[SERVER] error: ${err}`);
                }
            });
            setTimeout(()=>{
                ws.send(`延时了两秒`, (err) => {
                    if (err) {
                        console.log(`[SERVER] error: ${err}`);
                    }
                });
            },2000)
        })
    })
}