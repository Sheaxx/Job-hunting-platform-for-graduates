const db = require('../config/db')
const moment = require('moment')

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

//更新用户的简历信息
exports.updateResume = (req, res) => {
  let resume = req.body
  let sql1 = 'select * from resume where username="' + resume.username + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    //未填写过简历，新建一个数据
    if (!result.length) {
      let sql2 = 'select max(id) as maxid from resume';
      let sql3 = 'insert into resume set ?'
      db.query(sql2, (err, results) => {
        if (err) throw err;
        resume.id = results[0].maxid + 1
        db.query(sql3, resume, (err, result) => {
          if (err) throw err;
          res.send('success')
        })
      })
    } else {//否则，修改数据
      let sql4 = 'update resume set ? where username="' + resume.username + '"';
      db.query(sql4, resume, (err, result) => {
        if (err) throw err;
        res.send('success')
      })
    }
  })
}

//更新用户的教育信息
exports.updateEducation = (req, res) => {
  let education = req.body
  let sql1 = 'select * from education where username="' + education.username + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    //未填写过教育信息，新建一个数据
    if (!result.length) {
      let sql2 = 'select max(id) as maxid from education';
      let sql3 = 'insert into education set ?'
      db.query(sql2, (err, results) => {
        if (err) throw err;
        education.id = results[0].maxid + 1
        db.query(sql3, education, (err, result) => {
          if (err) throw err;
          res.send('success')
        })
      })
    } else {//否则，修改数据
      let sql4 = 'update education set ? where username="' + education.username + '"';
      db.query(sql4, education, (err, result) => {
        if (err) throw err;
        res.send('success')
      })
    }
  })
}

//更新用户的实习经历
exports.updateInternship = (req, res) => {
  let internship = req.body
  let sql1 = 'select * from internship where username="' + internship.username + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    //未填写过实习经历，新建一个数据
    if (!result.length) {
      let sql2 = 'select max(id) as maxid from internship';
      let sql3 = 'insert into internship set ?'
      db.query(sql2, (err, results) => {
        if (err) throw err;
        internship.id = results[0].maxid + 1
        db.query(sql3, internship, (err, result) => {
          if (err) throw err;
          res.send('success')
        })
      })
    } else {//否则，修改数据
      let sql4 = 'update internship set ? where username="' + internship.username + '"';
      db.query(sql4, internship, (err, result) => {
        if (err) throw err;
        res.send('success')
      })
    }
  })
}

//更新用户的项目经历
exports.updateProject = (req, res) => {
  let project = req.body
  let sql1 = 'select * from project where username="' + project.username + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    //未填写过项目经历，新建一个数据
    if (!result.length) {
      let sql2 = 'select max(id) as maxid from project';
      let sql3 = 'insert into project set ?'
      db.query(sql2, (err, results) => {
        if (err) throw err;
        project.id = results[0].maxid + 1
        db.query(sql3, project, (err, result) => {
          if (err) throw err;
          res.send('success')
        })
      })
    } else {//否则，修改数据
      let sql4 = 'update project set ? where username="' + project.username + '"';
      db.query(sql4, project, (err, result) => {
        if (err) throw err;
        res.send('success')
      })
    }
  })
}

//更新用户的校内经历
exports.updateCampusExperience = (req, res) => {
  let campusExperience = req.body
  let sql1 = 'select * from campusExperience where username="' + campusExperience.username + '"';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    //未填写过校内经历，新建一个数据
    if (!result.length) {
      let sql2 = 'select max(id) as maxid from campusExperience';
      let sql3 = 'insert into campusExperience set ?'
      db.query(sql2, (err, results) => {
        if (err) throw err;
        campusExperience.id = results[0].maxid + 1
        db.query(sql3, campusExperience, (err, result) => {
          if (err) throw err;
          res.send('success')
        })
      })
    } else {//否则，修改数据
      let sql4 = 'update campusExperience set ? where username="' + campusExperience.username + '"';
      db.query(sql4, campusExperience, (err, result) => {
        if (err) throw err;
        res.send('success')
      })
    }
  })
}

//更新教育信息，实习经历，项目经历，校内经历
// function updateInfo(list, table, tag) {
//   //tag为true表示插入，tag为false表示更新
//   if (tag) {
//     let sql1 = 'select max(id) as maxid from ' + table
//     db.query(sql1, (err, result) => {
//       if (err) throw err;
//       let sql2 = 'insert into ' + table + ' set ?'
//       let maxid = result[0].id + 1;
//       for (let item in list) {
//         list[item].id = maxid;
//         db.query(sql2, list[item], (err, result) => {
//           if (err) throw err;
//         })
//         maxid++
//       }
//     })
//   } else {
//     let sql = 'update ' + table + ' set ? where id=?'
//     for (let item in list) {
//       db.query(sql, [list[item], list[item.id]], (err, result) => {
//         if (err) throw err;
//       })
//     }
//   }
// }