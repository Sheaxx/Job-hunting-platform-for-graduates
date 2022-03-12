const express = require('express');
const router = express.Router();

const handler = require('../handler/user');

//根据用户名返回简历信息
router.get('/getResume/:username', handler.getResume)

//获取用户的收藏列表
router.get('/getCollectList/:username', handler.getCollectList)

//更新用户的简历信息
router.post('/updateResume', handler.updateResume)

//获取各表的最新可用id
router.get('/getNewTableId/:table', handler.getNewTableId)

//更新用户的教育信息，实习经历，项目经历，校内经历
router.post('/updateTable/:table', handler.updateTable)

module.exports = router