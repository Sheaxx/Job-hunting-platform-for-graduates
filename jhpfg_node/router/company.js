const express = require('express');
const router = express.Router();

const handler = require('../handler/company');

//分页获取公司列表
router.get('/getAccountListByPage/:currentPage', handler.getAccountListByPage);

//根据id搜索某一条公司信息
router.get('/getCompanyById/:id', handler.getCompanyById)

//获取公司发布的所有招聘信息
router.get('/getAllEmployment/:id', handler.getAllEmployment)

module.exports = router