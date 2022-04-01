const db = require('../config/db')
const moment = require('moment')

//获取与我有关的聊天记录
exports.getRecords = (req, res) => {
  let username = req.params.username;
  let sql = 'select * from message where sender="' + username + '" or receiver="' + username + '"';
  db.query(sql, (err, result) => {
    if (err) throw err;
    for (let item in result) {
      result[item].time = moment(result[item].time).format('YYYY-MM-DD HH:mm:ss');
    }
    res.send(result);
  })
}

//根据用户名获取头像
exports.getAvatar = (req, res) => {
  let chatList = req.body.chatList;
  chatList = chatList.split(",");
  for(let item in chatList) {
    chatList[item] = '"' + chatList[item] + '"';
  }
  let sql = 'select username,avatar from user where username in (' + chatList + ')';
  db.query(sql,(err, result) => {
    if (err) throw err;
    res.send(result);
  })
}

//获取一个头像
exports.getOneAvatar = (req, res) => {
  let username = req.params.username;
  let sql = 'select avatar from user where username="' + username + '"';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0].avatar);
  })
}