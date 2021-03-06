const db = require('../config/db')
const moment = require('moment')

//分页获取帖子列表
exports.getAccountListByPage = (req, res) => {
  let { pageSize,currentPage } = req.params;
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
      for (let item in results) {
        results[item].createTime = moment(results[item].createTime).format('YYYY-MM-DD HH:mm:ss');
      }
      // 把数据返回给前端 两个数据 数据总条数 total 和 对应页码的数据 data
      res.send({
        total,
        results
      });
    });
  });
}

//根据所属板块分页获取
exports.getAccountListByPageAndZone = (req, res) => {
  let { pageSize, currentPage, zone } = req.params;
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
      for (let item in results) {
        results[item].createTime = moment(results[item].createTime).format('YYYY-MM-DD HH:mm:ss');
      }
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
  let sql1 = 'select * from forum where id=' + id;
  db.query(sql1, (err, results) => {
    if (err) throw err;
    results[0].createTime = moment(results[0].createTime).format('YYYY-MM-DD HH:mm:ss');
    let sql2 = 'select * from comment where postid=' + id
    db.query(sql2, (err, list) => {
      if (err) throw err;
      for (let item in list) {
        list[item].time = moment(list[item].time).format('YYYY-MM-DD HH:mm:ss');
      }
      res.send({ 
        post: results[0], 
        commentList: list
      });
    })
  })
}

//根据关键字进行搜索
exports.getPostByKeyword = (req, res) => {
  let keyword = req.body.keyword;
  let sql = 'select * from forum order by id desc';
  db.query(sql, (err, results) => {
    if (err) throw err;
    let arr = [];
    for (let item in results) {
      if (results[item].title.search(keyword) != -1) {
        results[item].createTime = moment(results[item].createTime).format('YYYY-MM-DD HH:mm:ss');
        arr.push(results[item])
      }
    }
    res.send(arr)
  })
}

//根据用户名搜索所发布的帖子
exports.getPostByUsername = (req, res) => {
  let username = req.params.username;
  let sql = 'select * from forum where author="' + username + '"';
  db.query(sql,(err, list) => {
    if (err) throw err;
    for (let item in list) {
      list[item].createTime = moment(list[item].createTime).format('YYYY-MM-DD HH:mm:ss');
    }
    res.send(list);
  })
}

//发布帖子
exports.addPost = (req, res) => {
  let post = req.body;
  post.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
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

//删除帖子
exports.deletePost = (req, res) => {
  let id = req.params.id;
  let sql = 'delete from forum where id=' + id;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send('success');
  })
}

//帖子详情中发布评论
exports.addComment = (req, res) => {
  let comment = req.body;
  comment.time = moment().format('YYYY-MM-DD HH:mm:ss');
  let sql1 = 'select max(id) as maxid from comment';
  db.query(sql1, (err, results) => {
    if (err) throw err;
    comment.id = results[0].maxid + 1
    let sql2 = 'insert into comment set ?';
    db.query(sql2, comment, (err, results) => {
      if (err) throw err;
      res.send('success')
    })
  })
}