const express = require('express');
const router = express.Router();

const handler = require('../handler/company');

//分页获取公司列表
router.get('/getAccountListByPage/:currentPage', handler.getAccountListByPage);

//根据id搜索某一条公司信息
router.get('/getCompanyById/:id', handler.getCompanyById)

//根据关键字进行搜索
router.get('/getCompanyByKeyword', handler.getCompanyByKeyword)

//获取公司发布的所有招聘信息
router.get('/getAllEmployment/:id', handler.getAllEmployment)

//获取所有公司的数据，返回id和公司名
router.get('/getAllCompany', handler.getAllCompany)

//更新公司信息
router.post('/updateCompany', handler.updateCompany)

//获取用户的关注列表
router.get('/getFollowList/:username', handler.getFollowList)

//关注公司
router.post('/follow/:username/:id', handler.follow)

//取消关注
router.post('/cancelFollow/:username/:id', handler.cancelFollow)

//根据名称更新用户简历
router.post('/updateResumeByName', handler.updateResumeByName)

module.exports = router