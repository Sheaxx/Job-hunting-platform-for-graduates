const db = require('../config/db')

//分页获取招聘信息列表
exports.getAccountListByPage = (req, res) => {
  let pageSize = 9;
  let { currentPage } = req.params;
  let sql1 = 'select * from employment order by id desc';
  db.query(sql1, (err, results) => {
    if (err) throw err;
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

//根据筛选条件分页获取招聘信息列表
exports.getSelectAccountListByPage = (req, res) => {
  let pageSize = 9;
  let { currentPage } = req.params;
  let { education, salaryStart, salaryEnd, location } = req.body;
  let sql = 'select * from employment where';
  let tag = false; //用于判断是否是第一个筛选条件
  if (education != "") { //判断学历要求
    sql += ' education="' + education + '"';
    tag = true;
  }
  if (salaryStart != 0 || salaryEnd != 0) { //判断薪资水平
    if (tag) {
      sql += ' and';
    }
    if (salaryStart != 20000 && salaryEnd != 3000) {
      sql += ' salaryStart>=' + salaryStart + ' and salaryEnd<=' + salaryEnd;
    } else if (salaryStart == 20000) {
      sql += ' salaryStart>=20000';
    } else {
      sql += ' salaryEnd<=3000'
    }
    tag = true;
  }
  if (location != "") { //判断工作地点
    if (tag) {
      sql += ' and';
    }
    sql += ' location="' + location + '"';
    tag = true;
  }
  if (tag) {
    sql += ' order by id desc';
  } else {
    sql = 'select * from employment order by id desc';
  }
  db.query(sql, (err, results) => {
    if (err) throw err;
    let total = results.length;
    // 分页条件 (跳过多少条)
    let n = (currentPage - 1) * pageSize;
    // 拼接分页的sql语句
    sql += ` limit ${n}, ${pageSize}`;
    // 执行sql语句 （查询对应页码的数据）
    db.query(sql, (err, results) => {
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

//根据学校名获得其认证的招聘信息
exports.getRecommend = (req, res) => {
  let {school} = req.body;
  let sql1 = 'select recommend from school where name="' + school + '"';
  db.query(sql1, (err, recommend) => {
    if (err) throw err;
    let list = recommend[0].recommend;
    let sql2 = 'select * from employment where id in (' + list + ')';
    db.query(sql2, (err, result) => {
      if (err) throw err;
      res.send(result);
    })
  })
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

//根据求职意向获取推荐人选
exports.getUsersByStation = (req, res) => {
  let id = req.params.id;
  let sql1 = 'select * from employment where id=' + id;
  db.query(sql1, (err, result) => {
    if (err) throw err;
    let station = result[0].zone;
    let sentUsers = result[0].sentUsers;
    sentUsers = sentUsers.split(",");
    let sql2 = 'select username from resume where expectedPosition="' + station + '"';
    db.query(sql2, (err, result) => {
      if (err) throw err;
      let arr = [];
      for (let i in result) {
        let tag = true;
        for (let j in sentUsers) {
          if (result[i] == sentUsers[j]) {
            tag = false;
            break;
          }
          if (tag == true) {
            arr.push(result[i]);
          }
        }
      }
      res.send(arr);
    })
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