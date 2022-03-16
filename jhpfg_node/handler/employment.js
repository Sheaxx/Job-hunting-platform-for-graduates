const db = require('../config/db')

//分页获取招聘信息列表
exports.getAccountListByPage = (req, res) => {
  let pageSize = 9;
  let { currentPage } = req.params;
  let sql1 = 'select * from employment order by id desc';
  db.query(sql1, (err, results) => {
    if (err) return res.send("error")
    let total = results.length;
    // 分页条件 (跳过多少条)
    let n = (currentPage - 1) * pageSize;
    // 拼接分页的sql语句
    sql1 += ` limit ${n}, ${pageSize}`;
    // 执行sql语句 （查询对应页码的数据）
    db.query(sql1, (err, results) => {
      if (err) throw err;
      // 把数据返回给前端 两个数据 数据总条数 total 和 对应页码的数据 data
      let sql2 = 'select * from company';
      db.query(sql2, (err, companys) => {
        if (err) throw err;
        for (let i in results) {
          for (let j in companys) {
            if (results[i].companyId === companys[j].id) {
              results[i].companyName = companys[j].name;
              results[i].trade = companys[j].trade;
              results[i].level = companys[j].level;
              break;
            }
          }
        }
        res.send({
          total,
          results
        });
      });
    });
  });
}

//根据id搜索某一条招聘信息
exports.getEmploymentById = (req, res) => {
  let id = req.params.id;
  let sql = 'select * from employment where id=' + id;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  })
}

//根据关键字进行搜索
exports.getEmploymentByKeyword = (req, res) => {
  let { keyword, isFullTime } = req.body;
  let sql = 'select * from employment where isFullTime=' + isFullTime + ' order by id desc'
  db.query(sql, (err, results) => {
    if (err) throw err;
    let arr = [];
    for (let item in results) {
      if (results[item].station.search(keyword) != -1) {
        arr.push(results[item])
      }
    }
    res.send(arr)
  })
}

//更新招聘信息
exports.updateEmployment = (req, res) => {
  let employment = req.body;
  if (!employment.id) { //新建
    let sql1 = 'select max(id) as maxid from employment';
    let sql2 = 'insert into employment set ?';
    db.query(sql1, (err, result) => {
      if (err) throw err;
      employment.id = result[0].maxid + 1;
      db.query(sql2, employment, (err, result) => {
        if (err) throw err;
        res.send('success');
      })
    })
  } else { //修改
    let sql3 = 'update employment set ? where id=' + employment.id;
    db.query(sql3, employment, (err, result) => {
      if (err) throw err;
      res.send('success');
    })
  }
}

//删除招聘信息
exports.deleteEmployment = (req, res) => {
  let id = req.params.id;
  let sql = 'delete from employment where id=' + id;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send('success')
  })
}

//