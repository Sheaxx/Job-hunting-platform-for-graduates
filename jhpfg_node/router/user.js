const express = require('express');
const router = express.Router();

const handler = require('../handler/user');

//根据用户名返回账号信息
router.get('/getUser/:username', handler.getUser);

//根据用户名返回简历信息
router.get('/getResume/:username', handler.getResume)

//获取用户的收藏列表
router.get('/getCollectList/:username', handler.getCollectList);

//更新用户的头像
router.post('/updateAvatar/:username', handler.updateAvatar);

//更新用户的简历信息
router.post('/updateResume', handler.updateResume)

//获取各表的最新可用id
router.get('/getNewTableId/:table', handler.getNewTableId)

//更新用户的教育信息，实习经历，项目经历，校内经历
router.post('/updateTable/:table', handler.updateTable)

//根据用户名返回学校用户信息
router.get('/getPersonal/:username', handler.getPersonal)

//更新学校用户信息
router.post('/updatePersonal', handler.updatePersonal)

module.exports = router