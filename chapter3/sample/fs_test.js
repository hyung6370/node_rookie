const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        const f = await fs.readFile('./fs_test.html');
        res.writeHead(200, { 'Content-Type' : 'text.html; charset=utf-8' }); // 200이면 요청 성공
        res.end(f); // 요청 종료
    } catch(err) {  // 오류 처리
        console.log(err);
        res.writeHead(500, { 'Content-Type' : 'text.html; charset=utf-8' }); // 500이면 서버에 오류 발생
        res.end(err.message);
    } 
})
    .listen(8080, () => {
        console.log('8080포트에서 서버 연결 중 ..');
    });