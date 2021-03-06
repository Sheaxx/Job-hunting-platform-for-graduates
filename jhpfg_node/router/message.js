const express = require('express');
const router = express.Router();

const handler = require('../handler/message');

//获取与我有关的聊天记录
router.get('/getRecords/:username', handler.getRecords)

//根据用户名获取头像
router.post('/getAvatar', handler.getAvatar)

//获取一个头像
router.get('/getOneAvatar/:username', handler.getOneAvatar)

module.exports = router