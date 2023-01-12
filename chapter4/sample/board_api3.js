const morgan = require('morgan');
const url = require('url');
const uuidAPIkey = require('uuid-apikey');
const cors = require('cors');

// express app generate
const express = require('express');
const app = express();

// port setting
app.set('port', process.env.PORT || 8080);

// common middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cors());

// 테스트를 위한 API 키
const key = {
    apiKey: '[API_KEY]',
    uuid: '[uuid]'
};

// 테스트를 위한 게시글 데이터
let boardList = [];
let numOfBoard = 0;

// 라우팅 설정
app.get('/', (req, res) => {
    res.send('This is api.js');
});

// 게시글 검색 API using uuid-key
app.get('/board/:apikey/:type', (req, res) => {
    let { type, apikey } = req.params;
    const queryData = url.parse(req.url, true).query;

    if (uuidAPIkey.isAPIKey(apikey) && uuidAPIkey.check(apikey, key.uuid)) {
        if (type === 'search') {  // 키워드로 게시글 검색
            const keyword = queryData.keyword;
            const result = boardList.filter((e) => {
                return e.title.includes(keyword)
            })
            res.send(result);
        }
        else if (type === 'user') {
            const user_id = queryData.user_id;
            const result = boardList.filter((e) => {
                return e.user_id === user_id;
            });
            res.send(result);
        }
        else {
            res.send('Wrong URL');
        }
    }
    else {
        res.send('Wrong API Key');
    }
});

// 서버와 포트 연결
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 .. ');
});