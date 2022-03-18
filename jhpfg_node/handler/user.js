const db = require('../config/db')
const moment = require('moment')
const fs = require('fs')
const path = require('path')
const multiparty = require("multiparty");

//根据用户名返回账号信息
exports.getUser = (req, res) => {
  let username = req.params.username;
  let sql = 'select * from user where username="' + username + '"';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  })
}

//根据用户名返回简历信息
exports.getResume = (req, res) => {
  let username = req.params.username;
  let sql1 = 'select * from resume where username="' + username + '"';
  let sql2 = 'select * from education where username="' + username + '"';
  let sql3 = 'select * from internship where username="' + username + '"';
  let sql4 = 'select * from project where username="' + username + '"';
  let sql5 = 'select * from campusExperience where username="' + username + '"';
  db.query(sql1, (err, resume) => {
    if (err) throw err;
    db.query(sql2, (err, education) => {
      if (err) throw err;
      db.query(sql3, (err, internship) => {
        if (err) throw err;
        db.query(sql4, (err, project) => {
          if (err) throw err;
          db.query(sql5, (err, campusExperience) => {
            if (err) throw err;
            let skill = resume[0].skill.split(",");
            let certificate = resume[0].certificate.split(",")
            resume[0].birth = moment(resume[0].birth).format("YYYY-MM-DD")
            res.send({
              resume: resume[0],
              education,
              internship,
              project,
              campusExperience,
              skill,
              certificate
            })
          })
        })
      })
    })
  })
}

//获取用户的收藏列表
exports.getCollectList = (req, res) => {
  let username = req.params.username;
  let sql1 = 'select * from user where username="' + username + '"';
  db.query(sql1, (err, collects) => {
    if (err) throw err;
    let sql2 = 'select * from employment'
    db.query(sql2, (err, employments) => {
      let results = [];
      let list = collects[0].collectList.split(",")
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

//更新用户的头像
exports.updateAvatar = (req, res) => {
  let avatar = req.body.avatar;
  let { username } = req.params;
  let sql = 'update user set avatar="' + avatar + '" where username="' + username + '"';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('success');
  })
}

//更新用户的简历信息
exports.updateResume = (req, res) => {
  let resume = req.body
  let sql1 = 'select * from resume where username="' + resume.username + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    //未填写过简历，新建一个数据
    if (!result.length) {
      let sql2 = 'select max(id) as maxid from resume';
      let sql3 = 'insert into resume set ?';
      db.query(sql2, (err, results) => {
        if (err) throw err;
        resume.id = results[0].maxid + 1
        db.query(sql3, resume, (err, result) => {
          if (err) throw err;
          res.send('success');
        })
      })
    } else {//否则，修改数据
      let sql4 = 'update resume set ? where username="' + resume.username + '"';
      db.query(sql4, resume, (err, result) => {
        if (err) throw err;
        res.send('success');
      })
    }
  })
}

//获取各表的最新可用id
exports.getNewTableId = (req, res) => {
  let table = req.params.table;
  let sql = 'select max(id) as maxid from ' + table;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0])
  })
}

//更新用户的教育信息，实习经历，项目经历，校内经历
exports.updateTable = (req, res) => {
  let table = req.params.table;
  let data = req.body;
  let sql1 = 'select * from ' + table + ' where id=' + data.id;
  db.query(sql1, (err, result) => {
    if (err) throw err;
    if (!result.length) {
      let sql2 = 'insert into ' + table + ' set ?'
      db.query(sql2, data, (err, result) => {
        if (err) throw err;
      })
    } else {
      let sql3 = 'update ' + table + ' set ? where id=' + data.id
      db.query(sql3, data, (err, result) => {
        if (err) throw err;
        res.send('success');
      })
    }
  })
}

//根据用户名返回学校或企业用户信息
exports.getPersonal = (req, res) => {
  let username = req.params.username;
  let sql = 'select * from resume where username="' + username + '"';
  db.query(sql, (err, result) => {
    if (err) throw err;
    result[0].birth = moment(result[0].birth).format("YYYY-MM-DD")
    res.send(result[0]);
  })
}

//更新学校或企业用户信息
exports.updatePersonal = (req, res) => {
  let user = req.body;
  let sql = 'update resume set ? where username="' + user.username + '"';
  db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.send('success');
  })
}

//注册
exports.register = (req, res) => {
  let user = req.body;
  let sql1 = 'select * from user where username="' + user.username + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    if (result.length) {
      res.send("error");
    } else {
      let sql2 = 'insert into user set ?';
      user.avatar = "";
      user.collectList = "";
      db.query(sql2, user, (err, result) => {
        if (err) throw err;
        res.send(user);
      })
    }
  })
}

//登录
exports.login = (req, res) => {
  let user = req.body;
  let sql = 'select * from user where username="' + user.username + '"';
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (user.password == result[0].password) {
      res.send("success");
    } else {
      res.send("error");
    }
  })
}

//修改密码
exports.updatePassword = (req, res) => {
  let { oldPassword, newPassword } = req.body;
  let username = req.params.username;
  let sql1 = 'select * from user where username="' + username + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    if (oldPassword != result[0].password) {
      res.send("error");
    } else {
      let sql2 = 'update user set password="' + newPassword + '" where username="' + username + '"';
      db.query(sql2, (err, result) => {
        if (err) throw err;
        res.send("success");
      })
    }
  })
}