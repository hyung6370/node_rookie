const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const app = express();

const webSocket = require('./socket.js');

// Port Setting
app.set('port', process.env.POST || 8080);

// Common Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('wsExample'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'wsExample',
    cookie: {
        httpOnly:true,
        secure: false
    }
}));

// Router Setting
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//404 Error Handling
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 해당 주소가 없습니다. `);
    error.status = 404;
    next(error);
});

// Error Handling Middlewar
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send('error Occured');
});

// Connecting Server with Port
const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 .. ');
});

webSocket(server); // ws와 http 포트 공유