const express = require('express');
const app = express();

app.get('/:type', (req, res) => {
    let { type } = req.params;  // 입력한 변수가 req.param에 저장
    res.send(type);
});

app.listen(8080);