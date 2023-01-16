const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => { // Connection
        const ip = req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress;
        console.log('Nww Client : ', ip);
        ws.on('message', (message) => {  // 클라이언트로부터 받은 메시지
            console.log(message);
        });
        ws.on('error', (err) => {  // 오류 처리
            console.error(err);
        });
        ws.on('close', () => {  // 종료
            console.log('클라이언트 접속 해제', ip);
            clearInterval(ws.interval);
        });
        ws.interval = setInterval(() => {  // 서버에서 메시지
            if (ws.readyState === ws.OPEN) {
                ws.send('Message From Server.');
            }
        }, 3000);
    });
};