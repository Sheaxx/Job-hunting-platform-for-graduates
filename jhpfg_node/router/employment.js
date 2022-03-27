const express = require('express');
const router = express.Router();

const handler = require('../handler/employment');

//分页获取招聘信息列表
router.get('/getAccountListByPage/:currentPage', handler.getAccountListByPage)

//根据筛选条件分页获取招聘信息列表
router.post('/getSelectAccountListByPage/:currentPage', handler.getSelectAccountListByPage)

//根据学校名获得其认证的招聘信息
router.post('/getRecommend', handler.getRecommend);

//根据id搜索某一条招聘信息
router.get('/getEmploymentById/:id', handler.getEmploymentById);

//根据关键字进行搜索
router.post('/getEmploymentByKeyword', handler.getEmploymentByKeyword);

//根据求职意向获取推荐人选
router.get('/getUsersByStation/:id', handler.getUsersByStation);

//更新招聘信息
router.post('/updateEmployment', handler.updateEmployment);

//删除招聘信息
router.post('/deleteEmployment/:id', handler.deleteEmployment);

//使招聘者进入下一个招聘流程
router.post('/nextProgress/:id', handler.nextProgress);

//终止招聘流程
router.post('/stopProgress/:id', handler.stopProgress);

module.exports = router