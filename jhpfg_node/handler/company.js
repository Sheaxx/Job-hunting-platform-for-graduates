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

//根据关键字进行搜索
exports.getCompanyByKeyword = (req, res) => {
  let keyword = req.body.keyword;
  let sql = 'select * from company order by id desc';
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

//获取公司发布的所有招聘信息
exports.getAllEmployment = (req, res) => {
  let id = req.params.id;
  let sql = 'select * from employment where companyId=' + id;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  })
}

//获取所有公司的数据，返回id和公司名
exports.getAllCompany = (req, res) => {
  let sql = 'select id,name from company';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  })
}

//更新公司信息
exports.updateCompany = (req, res) => {
  let company = req.body;
  if (!company.id) {
    let sql1 = 'select max(id) as maxid from company';
    db.query(sql1, (err, results) => {
      if (err) throw err;
      company.id = results[0].maxid + 1;
      let sql2 = 'insert into company set ?';
      db.query(sql2, company, (err, result) => {
        if (err) throw err;
        res.send('success');
      })
    })
  } else {
    let sql3 = 'update company set ? where id=' + company.id;
    db.query(sql3, company, (err, result) => {
      if (err) throw err;
      res.send('success');
    })
  }
}

//获取用户的关注列表
exports.getFollowList = (req, res) => {
  let username = req.params.username;
  //获取用户的关注列表
  let sql1 = 'select * from user where username="' + username + '"';
  db.query(sql1, (err, follows) => {
    if (err) throw err;
    //根据关注列表获得公司们
    let sql2 = 'select * from company';
    db.query(sql2, (err, companys) => {
      let results = [];
      let list = follows[0].followList.split(",")
      for (let i in list) {
        for (let j in companys) {
          if (list[i] == companys[j].id) {
            results.push(companys[j].id)
            break;
          }
        }
      }
      //获取所有在企业板块的帖子
      let sql3 = 'select * from forum where zone=5 order by id desc';
      db.query(sql3, (err, forums) => {
        if (err) throw err;
        //获取所有在用户所关注的公司里的账号
        //如果这个帖子的发布者属于用户关注的公司，则加入结果
        let sql4 = 'select username from resume where company in (' + results + ')';
        db.query(sql4, (err, authors) => {
          if (err) throw err;
          let arr = [];
          for (let i in forums) {
            for (let j in authors) {
              if (forums[i].author == authors[j].username) {
                arr.push(forums[i]);
                break;
              }
            }
          }
          res.send(arr);
        })
      })
    })
  })
}

//关注公司
exports.follow = (req, res) => {
  let { username, id } = req.params;
  //找到这个用户
  let sql1 = 'select * from user where username="' + username + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    let list = result[0].followList;
    if (list.length) {
      list = list.split(",");
      list[list.length] = id;
    } else {
      list = [id];
    }
    //更新他的关注列表
    let sql2 = 'update user set followList="' + list + '" where username="' + username + '"';
    db.query(sql2, (err, result) => {
      if (err) throw err;
      res.send(list);
    })
  })
}

//取消关注
exports.cancelFollow = (req, res) => {
  let { username, id } = req.params;
  //找到这个用户
  let sql1 = 'select * from user where username="' + username + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    let list = result[0].followList;
    list = list.split(",");
    let index = list.indexOf(String(id));
    list.splice(index, 1).join(",");
    //更新他的投递列表
    let sql2 = 'update user set followList="' + list + '" where username="' + username + '"';
    db.query(sql2, (err, result) => {
      if (err) throw err;
      res.send(list);
    })
  })
}

//根据名称更新用户简历
exports.updateResumeByName = (req, res) => {
  let { name, username } = req.body;
  let sql1 = 'select * from company where name="' + name + '"';
  db.query(sql1, (err, results) => {
    if (err) throw err;
    let sql2 = 'update resume set company=' + results[0].id + ' where username="' + username + '"';
    db.query(sql2, (err, result) => {
      if (err) throw err;
    })
  })
}