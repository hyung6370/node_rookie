const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

const myLogger = function (req, res) { // myLogger라는 미들웨어 생성
    console.log('LOGGED');
};

app.use(myLogger); // app.use()를 사용해 미들웨어 붙여줌
app.listen(8080);