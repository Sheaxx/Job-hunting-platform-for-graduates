const db = require('../config/db')

//分页获取学校列表
exports.getAccountListByPage = (req, res) => {
  let pageSize = 16;
  let { currentPage } = req.params;
  let sql = 'select * from school order by id desc';
  db.query(sql, (err, results) => {
    if (err) return res.send("error")
    let total = results.length;
    // 分页条件 (跳过多少条)
    let n = (currentPage - 1) * pageSize;
    // 拼接分页的sql语句
    sql += ` limit ${n}, ${pageSize}`;
    // 执行sql语句 （查询对应页码的数据）
    db.query(sql, (err, results) => {
      if (err) throw err;
      // 把数据返回给前端 两个数据 数据总条数 total 和 对应页码的数据 data
      res.send({
        total,
        results
      });
    });
  });
}

//根据id搜索某一条学校信息
exports.getSchoolById = (req, res) => {
  let id = req.params.id;
  let sql = 'select * from school where id=' + id;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  })
}

//根据关键字进行搜索
exports.getSchoolByKeyword = (req, res) => {
  let keyword = req.body.keyword;
  let sql = 'select * from school order by id desc';
  db.query(sql, (err, results) => {
    if (err) throw err;
    let arr = [];
    for (let item in results) {
      if (results[item].name.search(keyword) != -1) {
        arr.push(results[item])
      }
    }
    res.send(arr)
  })
}