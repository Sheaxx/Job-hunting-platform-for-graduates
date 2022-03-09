// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入论坛的路由处理函数模块
const handler = require('../handler/forum')

// 分页获取帖子列表
router.get('/getAccountListByPage/:currentPage', handler.getAccountListByPage);

// 根据所属板块分页获取
router.get('/getAccountListByPageAndZone/:currentPage/:zone', handler.getAccountListByPageAndZone);

//根据id搜索某一条帖子
router.get('/getPostById/:id', handler.getPostById);

//发布帖子
router.post('/addPost', handler.addPost);

// 向外共享路由对象
module.exports = router
