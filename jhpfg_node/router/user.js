const express = require('express');
const router = express.Router();

const handler = require('../handler/user');

//根据用户名返回简历信息
router.get('/getResume/:username', handler.getResume)

//获取用户的收藏列表
router.get('/getCollectList/:username', handler.getCollectList)

//更新用户的简历信息
router.post('/updateResume', handler.updateResume)

//更新用户的校园经历
router.post('/updateEducation', handler.updateEducation)

//更新用户的实习经历
router.post('/updateInternship', handler.updateInternship)

//更新用户的项目经历
router.post('/updateProject', handler.updateProject)

//更新用户的校内经历
router.post('/updateCampusExperience', handler.updateCampusExperience)

module.exports = router