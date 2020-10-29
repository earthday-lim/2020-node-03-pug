const express = require('express');
const router = express.Router();

/* mysql 라우터 위에 들어가야함 */
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
});

router.get('/create', (req, res, next) => {
  const pug = {title: "도서등록", scriptFile: ""}/* pug파일을 전달할 변수 */
  res.render('./book/create.pug');/* pug파일을 불러오는 곳 */
});

/*router.post('/save', (req, res, next) => {
  const {title, content, isbn, writer, wdate, price} = req.body;
  const sql = `
  INSERT INTO books SET 
  title='${title}',
  content='${content}',
  isbn='${isbn}',
  writer='${writer}',
  wdate='${wdate}',
  price='${price}'
  `; 

  connection.connect();//db 접근
  connection.query(sql, (err, result, field) => {
    res.json(result);
  });
  connection.end();//db close

  //res.json(req.body); 저장된 데이터가 req.body에 들어오고 그 req.body를 json으로 응답해줘 
}); */

router.post('/save', (req, res, next) => {
  const {title, content, isbn, writer, wdate, price} = req.body;
  const sql = `
  INSERT INTO books SET title=?, content=?, isbn=?, writer=?, wdate=?, price=?`;
  const values = [title, content, isbn, writer, wdate, price];

  connection.connect();/* db 접근 */
  connection.query(sql, values, (err, result, field) => {
    if(result.serverStatus === 2){
      const sql2 = `SELECT * FROM books ORDER BY id DESC`;
      connection.query(sql2, (err, result, field) => {
        res.json(result);
        connection.end();
      });
    }
    else connection.end();/* db close */
  });

  //res.json(req.body);/* 저장된 데이터가 req.body에 들어오고 그 req.body를 json으로 응답해줘 */
});

module.exports = router;