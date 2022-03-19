const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  allowEIO3: true,
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true
  }
});
const db = require('./config/db')
// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())

app.use(express.urlencoded({ limit: "10mb", extended: false }))

//路由
const router = require('./router/index');
const { json } = require('express/lib/response');
app.use('/forum', router.forumRouter)
app.use('/employment', router.employmentRouter)
app.use('/company', router.companyRouter)
app.use('/school', router.schoolRouter)
app.use('/user', router.userRouter)
app.use('/calendar', router.calendarRouter)
app.use('/message', router.messageRouter)

let socketInfo = []
io.sockets.on('connection', function (socket) {
  //登录
  socket.on('login', data => {
    socketInfo.push({
      username: data,
      socketid: socket.id
    });
    console.log(socketInfo)
  });
  //发送消息
  socket.on('send', data => {
    /* 遍历数组 */
    socketInfo.forEach(s => {
      /* 判断该对象是不是我们需要发送的那个人 */
      if (s.username == data.receiver) {
        /* 发送数据 */
        io.to(s.socketid).emit('receive', data);
      }
    });
    data.status = 0;
    let sql = 'insert into message set ?';
    db.query(sql, data, (err, result) => {
      if (err) throw err;
    })
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});