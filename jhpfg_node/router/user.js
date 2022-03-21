const express = require('express');
const router = express.Router();

const handler = require('../handler/user');

//根据用户名返回账号信息
router.get('/getUser/:username', handler.getUser);

//根据用户名返回简历信息
router.get('/getResume/:username', handler.getResume)

//获取用户的收藏列表
router.get('/getCollectList/:username', handler.getCollectList);

//获取用户的投递列表
router.get('/getSentList/:username', handler.getSentList);

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

//根据投递者用户名列表获取他的真名和学校
router.get('/getRealnameSchool/:sentUsers', handler.getRealnameSchool)

//更新学校用户信息
router.post('/updatePersonal', handler.updatePersonal)

//投递简历
router.post('/sendResume/:id/:username', handler.sendResume)

//收藏招聘信息
router.post('/collect/:username/:id', handler.collect)

//取消收藏
router.post('/cancelCollect/:username/:id', handler.cancelCollect)

//注册
router.post('/register', handler.register)

//登录
router.post('/login', handler.login)

//修改密码
router.post('/updatePassword/:username', handler.updatePassword)

module.exports = router