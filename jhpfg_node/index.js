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

// All joined users
var allUsers = {};
// All joined sockets
var allSockets = {};

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


  // 以下都是面试的
  var user = ''; // current joined user

  socket.on('message', function(data) {
    var data = JSON.parse(data);
    switch (data.event) {
      // When has new user join in
      case 'join':
        user = data.name;
        // Duplicated user name is not allowed
        if (allUsers[user]) {
          sendTo(socket, {
            event: 'join',
            message: '该用户名已存在, 请重新输入',
            success: false,
          });
        } else {
          console.log('User joined', data.name);
          // Save users info
          allUsers[user] = true; // 'true' means has not call, 'false' means calling
          allSockets[user] = socket;
          socket.name = user;
          showUserInfo(allUsers);
          sendTo(socket, {
            event: 'join',
            allUsers: allUsers,
            success: true,
          });
        }
        break;

      case 'call':
        var conn = allSockets[data.connectedUser];
        sendTo(conn, {
          event: 'call',
          name: socket.name,
        });
        break;

      case 'offer':
        // i.e. UserA wants to call UserB
        console.log('Sending offer to: ', data.connectedUser);
        //if UserB exists then send him offer details
        var conn = allSockets[data.connectedUser];
        allUsers[user] = false;
        if (conn != null) {
          showUserInfo(allUsers);
          // Setting that UserA connected with UserB
          socket.otherName = data.connectedUser;
          sendTo(conn, {
            event: 'offer',
            offer: data.offer,
            name: socket.name,
          });
        } else {
          sendTo(socket, {
            event: 'msg',
            message: 'Not found this name',
          });
        }
        break;

      case 'accept':
        var conn = allSockets[data.connectedUser];
        if (conn != null) {
          if (data.accept) {
            sendTo(conn, {
              event: 'accept',
              accept: true,
            });
          } else {
            allUsers[data.connectedUser] = true;
            sendTo(conn, {
              event: 'accept',
              accept: false,
            });
          }
        }
        break;

      case 'answer':
        console.log('Sending answer to: ', data.connectedUser);
        // i.e. UserB answers UserA
        var conn = allSockets[data.connectedUser];
        allUsers[user] = false;
        if (conn != null) {
          showUserInfo(allUsers);
          socket.otherName = data.connectedUser;
          sendTo(conn, {
            event: 'answer',
            answer: data.answer,
          });
        }
        break;

      case 'candidate':
        console.log('Sending candidate to:', data.connectedUser);
        var conn1 = allSockets[data.connectedUser];
        var conn2 = allSockets[socket.otherName];
        if (conn1 != null) {
          sendTo(conn1, {
            event: 'candidate',
            candidate: data.candidate,
          });
        } else {
          sendTo(conn2, {
            event: 'candidate',
            candidate: data.candidate,
          });
        }
        break;

      case 'leave':
        console.log('Disconnecting from', data.connectedUser);
        var conn = allSockets[data.connectedUser];
        allUsers[socket.name] = true;
        allUsers[data.connectedUser] = true;
        socket.otherName = null;
        // Notify the other user so he can disconnect his peer connection
        if (conn != null) {
          showUserInfo(allUsers);
          sendTo(conn, {
            event: 'leave',
          });
        }
        break;
    }
  });

  socket.on('disconnect', function() {
    if (socket.name) {
      delete allUsers[socket.name];
      delete allSockets[socket.name];
      showUserInfo(allUsers);
      if (socket.otherName) {
        console.log('Disconnecting from ', socket.otherName);
        var conn = allSockets[socket.otherName];
        allUsers[socket.otherName] = true;
        socket.otherName = null;
        if (conn != null) {
          sendTo(conn, {
            type: 'leave',
          });
        }
      }
    }
  });
});


function showUserInfo(allUsers) {
  sendTo(io, {
    event: 'show',
    allUsers: allUsers,
  });
}

function sendTo(connection, message) {
  connection.send(message);
}


http.listen(3000, function () {
  console.log('listening on *:3000');
});