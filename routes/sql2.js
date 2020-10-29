/* const express = require('express');
const router = express.Router();
라우터 만들면 이거 3줄 무조건 쓰고 시작함 + app.js에서 라우터 등록에 추가
module.exports = router; */

const express = require('express');
const router = express.Router();
const {pool} = require('../modules/mysql-conn');

router.get('/create', (req, res, next) => {
  const pug = {title: "도서등록", scriptFile: ""}/* pug파일을 전달할 변수 */
  res.render('./book/create2.pug');/* pug파일을 불러오는 곳 */
});

router.post('/save', async (req, res, next) => {
  const connect = await pool.getConnection();

  const {title, content, isbn, writer, wdate, price} = req.body;
  const sql = `INSERT INTO books SET title=?, content=?, isbn=?, writer=?, wdate=?, price=?`;
  const values = [title, content, isbn, writer, wdate, price];
  const result = await connect.query(sql, values);
  if(result[0].serverStatus == 2){
    const sql2 = `SELECT * FROM books ORDER BY id DESC`;
    const result2 = await connect.query(sql2);
    res.json(result2[0]);
  }else{
    res.json({err : "데이터 저장에 실패하였습니다."});
  }

  connect.release();

});

/* router.get('/list', async (req, res, next) => {
  const connect = await pool.getConnection();
  const result = await connect.query('SELECT * FROM books');
  connect.release();
  res.json(result);
}); */

module.exports = router;