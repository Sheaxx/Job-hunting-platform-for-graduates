const express = require('express');
const router = express.Router();

const handler = require('../handler/school');

//分页获取学校列表
router.get('/getAccountListByPage/:currentPage', handler.getAccountListByPage)

//根据id搜索某一条学校信息
router.get('/getSchoolById/:id', handler.getSchoolById)

//根据关键字进行搜索
router.get('/getSchoolByKeyword', handler.getSchoolByKeyword)

module.exports = router