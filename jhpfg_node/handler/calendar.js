const db = require('../config/db')
const moment = require('moment')

//获取全部日程表信息
exports.getAll = (req, res) => {
  let school = req.body.school;
  let sql = 'select * from calendar where school="' + school + '"';
  db.query(sql, (err, result) => {
    if (err) throw err;
    for (let item in result) {
      result[item].time = moment(result[item].time).format('YYYY-MM-DD HH:mm:ss');
    }
    res.send(result);
  })
}

//添加日程表
exports.add = (req, res) => {
  let affair = req.body;
  let sql1 = 'select max(id) as maxid from calendar';
  db.query(sql1, (err, result) => {
    if (err) throw err;
    affair.id = result[0].maxid + 1;
    affair.time = moment(affair.time).format('YYYY-MM-DD HH:mm:ss');
    let sql2 = 'insert into calendar set ?';
    db.query(sql2, affair, (err, result) => {
      if (err) throw err;
      res.send(affair);
    })
  })
}

//修改日程表
exports.update = (req, res) => {
  let affair = req.body;
  let sql = 'update calendar set ? where id=' + affair.id;
  db.query(sql, affair, (err, result) => {
    if (err) throw err;
    res.send('success');
  })
}


//删除日程表
exports.delete = (req, res) => {
  let id = req.params.id;
  let sql = 'delete from calendar where id=' + id;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('success');
  })
}