const express = require('express');
const router = express.Router();

const handler = require('../handler/calendar');

//获取全部日程表信息
router.get('/getAll', handler.getAll)

//添加日程表
router.post('/add', handler.add)

//修改日程表
router.post('/update', handler.update)

//删除日程表
router.post('/delete/:id', handler.delete)

module.exports = router