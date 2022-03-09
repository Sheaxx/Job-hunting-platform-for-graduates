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

//论坛
const forumRouter = require('./router/forum')
app.use('/forum', forumRouter)


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