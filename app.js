/* 전역변수 */
const express = require('express');
const app = express();
const path = require('path');

/* 라우터 등록 */
const memberRouter = require('./routes/member');

/* 서버구동 */
app.listen(3000, () => {console.log('http://127.0.0.1:3000')});

/* pug등록 */
app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true;

/* router */
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//전역라우터
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/storage', express.static(path.join(__dirname, './uploads')));//절대경로, static(절대경로)
//라우터 등록
app.use('/member', memberRouter);