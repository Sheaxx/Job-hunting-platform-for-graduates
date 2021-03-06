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

//获取用户的投递列表
exports.getSentList = (req, res) => {
  let username = req.params.username;
  let sql1 = 'select * from progress where sender="' + username + '"';
  db.query(sql1, (err, progresses) => {
    if (err) throw err;
    let arr = [];
    for (let item in progresses) {
      arr.push(progresses[item].company);
    }
    let sql2 = 'select id,name from company where id in (' + arr.join(",") + ')';
    db.query(sql2, (err, results) => {
      if (err) throw err;
      for (let i in progresses) {
        for (let j in results) {
          if (progresses[i].company == results[j].id) {
            progresses[i].companyName = results[j].name;
            break;
          }
        }
      }
      res.send(progresses);
    })
  })
}

//根据用户名和招聘id获取招聘流程
exports.getSent = (req, res) => {
  let { id, username } = req.params;
  let sql = 'select * from progress where employmentId=' + id + ' and sender="' + username + '"';
  db.query(sql, (err, progress) => {
    if (err) throw err;
    res.send(progress[0]);
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
  resume.birth = moment(resume.birth).format("YYYY-MM-DD");
  let sql = 'update resume set ? where username="' + resume.username + '"';
  db.query(sql, resume, (err, result) => {
    if (err) throw err;
    res.send('success');
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
      })
    }
  })
  if (table == "education") {
    let sql4 = 'select * from education where username="' + data.username + '"';
    db.query(sql4, (err, result) => {
      if (err) throw err;
      let newest = result[0];
      let gpa = 0;
      for (let item in result) {
        if (result[item].duration > newest.duration) {
          newest = result[item];
        }
        gpa += result[item].gpa;
      }
      gpa = gpa / result.length;
      let sql5 = 'update resume set gpa=' + gpa + ',school="' + newest.school + '",specialty="' + newest.specialty + '",highesteducation="' + newest.qualification +'" where username="' + data.username + '"';
      db.query(sql5, (err, result) => {
        if (err) throw err;
      })
    })
  }
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

//获取投递者信息列表
exports.getSenderList = (req, res) => {
  let sentUsers = req.params.sentUsers.split(",");
  let sql = 'select username,realname,school,specialty,highesteducation,gpa from resume';
  db.query(sql, (err, result) => {
    if (err) throw err;
    let list = [];
    for (let i in sentUsers) {
      for (let j in result) {
        if (result[j].username == sentUsers[i]) {
          list.push(result[j])
        }
      }
    }
    res.send(list)
  })
}

//更新学校或企业用户信息
exports.updatePersonal = (req, res) => {
  let user = req.body;
  let obj = {
    birth:null,
    sex:"",
    tel:"",
    email:"",
    highesteducation:"",
    expectedPosition:"",
    skill:"",
    certificate:"",
    specialty:"",
    gpa:null
  };
  obj.realname = user.realname;
  obj.position = user.position;
  if ("school" in user) { //身份为学校
    obj.school = user.school;
  }
  let sql = 'update resume set ? where username="' + user.username + '"';
  db.query(sql, obj, (err, result) => {
    if (err) throw err;
    res.send('success');
  })
}

//投递简历
exports.sendResume = (req, res) => {
  let { id, username } = req.params;
  //找到这个用户
  let sql1 = 'select * from user where username="' + username + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    let list = result[0].sentList;
    if (list.length) {
      list = list.split(",");
      list[list.length] = id;
      list.join(",");
    } else {
      list = id;
    }
    //更新他的投递列表
    let sql2 = 'update user set sentList="' + list + '" where username="' + username + '"';
    db.query(sql2, (err, result) => {
      if (err) throw err;
      //找到这条招聘信息
      let sql3 = 'select * from employment where id=' + id;
      db.query(sql3, (err, employment) => {
        if (err) throw err;
        let users = employment[0].sentUsers;
        if (employment[0].sentUsers != null) {
          users = users.split(",");
          users[users.length] = username;
          users.join(",");
        } else {
          users = username;
        }
        //更新岗位候选者
        let sql4 = 'update employment set sentUsers="' + users + '" where id=' + id;
        db.query(sql4, (err, result) => {
          if (err) throw err;
          //在简历投递表里插入新信息
          let sql5 = 'select max(id) as maxid from progress';
          let sql6 = 'insert into progress set ?';
          db.query(sql5, (err, result) => {
            if (err) throw err;
            let progress = {
              id: result[0].maxid + 1,
              employmentId: id,
              employmentStation: employment[0].station,
              company: employment[0].companyId,
              sender: username,
              total: employment[0].total,
              progressList: employment[0].progressList,
              current: 0,
              currentState: "process",
            }
            db.query(sql6, progress, (err, result) => {
              if (err) throw err;
              res.send("success");
            })
          })
        })
      })
    })
  })
}

//收藏招聘信息
exports.collect = (req, res) => {
  let { username, id } = req.params;
  //找到这个用户
  let sql1 = 'select * from user where username="' + username + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    let list = result[0].collectList;
    if (list.length) {
      list = list.split(",");
      list[list.length] = id;
    } else {
      list = [id];
    }
    //更新他的投递列表
    let sql2 = 'update user set collectList="' + list + '" where username="' + username + '"';
    db.query(sql2, (err, result) => {
      if (err) throw err;
      res.send(list);
    })
  })
}

//取消收藏
exports.cancelCollect = (req, res) => {
  let { username, id } = req.params;
  //找到这个用户
  let sql1 = 'select * from user where username="' + username + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    let list = result[0].collectList;
    list = list.split(",");
    let index = list.indexOf(String(id));
    list.splice(index, 1).join(",");
    //更新他的投递列表
    let sql2 = 'update user set collectList="' + list + '" where username="' + username + '"';
    db.query(sql2, (err, result) => {
      if (err) throw err;
      res.send(list);
    })
  })
}

//注册
exports.register = (req, res) => {
  let user = req.body;
  //查找该用户名是否已被注册
  let sql1 = 'select * from user where username="' + user.username + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    if (result.length) {
      res.send("error");
    } else {
      //用户表插入
      let sql2 = 'insert into user set ?';
      user.avatar = "";
      user.collectList = "";
      user.sentList = "";
      user.chatList = "";
      user.followList = "";
      db.query(sql2, user, (err, result) => {
        if (err) throw err;
        //简历表插入
        let sql3 = 'select max(id) as maxid from resume';
        db.query(sql3, (err, results) => {
          if (err) throw err;
          let resume = {
            id: results[0].maxid + 1,
            username: user.username,
            realname: "",
            birth: null,
            sex: "",
            tel: "",
            email: "",
            highesteducation: "",
            school: "",
            expectedPosition: "",
            skill: "",
            certificate: "",
            position: "",
            company: null
          }
          let sql4 = 'insert into resume set ?';
          db.query(sql4, resume, (err, result) => {
            if (err) throw err;
            res.send(user);
          })
        })
      })
    }
  })
}

//登录
exports.login = (req, res) => {
  let user = req.body;
  let sql1 = 'select * from user where username="' + user.username + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    if (user.password == result[0].password) {
      let sql2 = 'select school from resume where username="' + user.username + '"';
      db.query(sql2, (err, school) => {
        if (err) throw err;
        result[0].school = school[0].school;
        res.send(result[0]);
      })
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