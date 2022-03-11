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
// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())

app.use(express.urlencoded({ extended: false }))

//路由
const router = require('./router/index')
app.use('/forum', router.forumRouter)
app.use('/employment', router.employmentRouter)
app.use('/company', router.companyRouter)
app.use('/user', router.userRouter)

io.sockets.on('connection', function (socket) {
  console.log('a user connected');
  //发送消息
  socket.on('send', data => {
    console.log('send', data);
  });

});

http.listen(3000, function () {
  console.log('listening on *:3000');
});