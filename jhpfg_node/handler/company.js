const db = require('../config/db')

//分页获取公司列表
exports.getAccountListByPage = (req, res) => {
  let pageSize = 16;
  let { currentPage } = req.params;
  let sql = 'select * from company order by id desc';
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

//根据id搜索某一条公司信息
exports.getCompanyById = (req, res) => {
  let id = req.params.id;
  let sql = 'select * from company where id=' + id;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  })
}

//获取公司发布的所有招聘信息
exports.getAllEmployment = (req, res) => {
  let id = req.params.id;
  let sql = 'select * from employment where companyId=' + id;
  db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  })
}