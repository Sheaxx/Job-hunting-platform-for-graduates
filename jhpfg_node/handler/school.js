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

//根据名称搜索某一条学校信息
exports.getSchoolByName = (req, res) => {
  let name = req.params.name;
  let sql = 'select * from school where name="' + name + '"';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
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

//获取学校的推荐列表
exports.getRecommendList = (req, res) => {
  let id = req.params.id;
  let sql1 = 'select * from school where id=' + id;
  db.query(sql1, (err, recommendList) => {
    if (err) throw err;
    let sql2 = 'select * from employment'
    db.query(sql2, (err, employments) => {
      let results = [];
      let list = recommendList[0].recommend.split(",")
      for (let i in list) {
        for (let j in employments) {
          if (list[i] == employments[j].id) {
            results.push(employments[j])
            break;
          }
        }
      }
      let sql3 = 'select * from company'
      db.query(sql3, (err, companys) => {
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
        res.send(results);
      })
    })
  })
}

//学校推荐
exports.recommend = (req, res) => {
  let { school, employment } = req.params;
  //找到这个学校
  let sql1 = 'select * from school where name="' + school + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    let list = result[0].recommend;
    if (list.length) {
      list = list.split(",");
      list[list.length] = employment;
    } else {
      list = [employment];
    }
    //更新他的推荐列表
    let sql2 = 'update school set recommend="' + list + '" where name="' + school + '"';
    db.query(sql2, (err, result) => {
      if (err) throw err;
      res.send(list);
    })
  })
}

//取消学校推荐
exports.cancelRecommend = (req, res) => {
  let { school, employment } = req.params;
  //找到这个学校
  let sql1 = 'select * from school where name="' + school + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    let list = result[0].recommend;
    list = list.split(",");
    let index = list.indexOf(String(employment));
    list.splice(index, 1).join(",");
    //更新他的推荐列表
    let sql2 = 'update school set recommend="' + list + '" where name="' + school + '"';
    db.query(sql2, (err, result) => {
      if (err) throw err;
      res.send(list);
    })
  })
}

//更新学校信息
exports.updateSchool = (req, res) => {
  let school = req.body;
  if (!school.id) {
    let sql1 = 'select max(id) as maxid from school';
    db.query(sql1, (err, results) => {
      if (err) throw err;
      school.id = results[0].maxid + 1;
      let sql2 = 'insert into school set ?';
      db.query(sql2, school, (err, result) => {
        if (err) throw err;
        res.send('success');
      })
    })
  } else {
    let sql3 = 'update school set ? where id=' + school.id;
    db.query(sql3, school, (err, result) => {
      if (err) throw err;
      res.send('success');
    })
  }
}