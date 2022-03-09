const db = require('../config/db')

//分页获取帖子列表
exports.getAccountListByPage = (req, res) => {
  let pageSize = 10;
  let { currentPage } = req.params;
  let sql = 'select * from forum order by id desc';
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
  })
}

//根据所属板块分页获取
exports.getAccountListByPageAndZone = (req, res) => {
  let pageSize = 10;
  let { currentPage, zone } = req.params;
  let sql = 'select * from forum where zone=' + zone + ' order by id desc'
  db.query(sql, (err, results) => {
    if (err) return res.send(err.message)
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
  })
}

//根据id搜索某一条帖子
exports.getPostById = (req, res) => {
  let id = req.params.id;
  let sql = 'select * from forum where id=' + id;
  db.query(sql, (err,results) => {
    if (err) throw err;
    res.send(results[0])
  })
}

//发布帖子
exports.addPost = (req, res) => {
  let post = req.body
  let sql1 = 'select max(id) as maxid from forum';
  db.query(sql1, (err, results) => {
    if (err) throw err;
    post.id = results[0].maxid + 1
    let sql2 = 'insert into forum set ?';
    db.query(sql2, post, (err, results) => {
      if (err) throw err;
      res.send('success')
    })
  })
}