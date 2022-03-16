const express = require('express');
const router = express.Router();

const handler = require('../handler/employment');

//分页获取招聘信息列表
router.get('/getAccountListByPage/:currentPage', handler.getAccountListByPage)

//根据id搜索某一条招聘信息
router.get('/getEmploymentById/:id', handler.getEmploymentById);

//根据关键字进行搜索
router.post('/getEmploymentByKeyword', handler.getEmploymentByKeyword);

//更新招聘信息
router.post('/updateEmployment', handler.updateEmployment);

//删除招聘信息
router.post('/deleteEmployment/:id', handler.deleteEmployment);

module.exports = router