const SocketIO = require("socket.io");

module.exports = (server) => {
    const io = SocketIO(server, { path: "/socket.io" });
    
    io.on("connection", (socket) => {
        const req = socket.request;
        const ip = req.headers["x-forwarded-for"] ||
                            req.connection.remoteAddress;
        console.log(
            `New Client : ${ip}, socket.id : ${socket.id}`
        );

        socket.on("disconnect", () => {
            console.log(`Client Out : ${ip}, socket.id : ${socket.id}`);
        });

        socket.on("error", (error) => { });

        socket.on("from client", (data) => {  // 클라이언트가 넘긴 데이터
            console.log(data);
        });

        socket.interval = setInterval(() => {  // send 대신 emit으로 메시지를 보냄
            socket.emit("from server", "Message From Server");
        }, 3000);
    });
};