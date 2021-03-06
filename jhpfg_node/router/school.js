const express = require('express');
const router = express.Router();

const handler = require('../handler/school');

//分页获取学校列表
router.get('/getAccountListByPage/:currentPage', handler.getAccountListByPage)

//根据id搜索某一条学校信息
router.get('/getSchoolById/:id', handler.getSchoolById)

//根据名称搜索某一条学校信息
router.get('/getSchoolByName/:name', handler.getSchoolByName)

//根据关键字进行搜索
router.get('/getSchoolByKeyword', handler.getSchoolByKeyword)

//获取学校的推荐列表
router.post('/getRecommendList', handler.getRecommendList)

//学校推荐
router.post('/recommend/:school/:employment', handler.recommend)

//取消学校推荐
router.post('/cancelRecommend/:school/:employment', handler.cancelRecommend)

//更新学校信息
router.post('/updateSchool', handler.updateSchool)

//获取学校的老师
router.post('/getTeachers', handler.getTeachers)

module.exports = router