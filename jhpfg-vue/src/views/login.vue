<template>
  <div id="login">
    <div class="container">
      <div class="form-box">
        <div class="register-box hidden">
          <h1>REGISTER</h1>
          <input
            type="text"
            placeholder="用户名"
            v-model="editRegister.username"
          >
          <input
            type="password"
            placeholder="密码"
            v-model="editRegister.password"
          >
          <select
            name="role"
            v-model="editRegister.role"
          >
            <option
              value=''
              disabled
              selected
              style='display:none;'
            >身份</option>
            <option value="0">学生</option>
            <option value="1">企业</option>
            <option value="2">学校</option>
          </select>
          <button @click="register">注册</button>
        </div>
        <div class="login-box">
          <h1>LOGIN</h1>
          <input
            type="text"
            placeholder="用户名"
            v-model="editLogin.username"
          >
          <input
            type="password"
            placeholder="密码"
            v-model="editLogin.password"
          >
          <button @click="login">登录</button>
        </div>
      </div>
      <div class="con-box left">
        <h2>欢迎来到</h2>
        <h2><span>应届生求职平台</span></h2>
        <img
          src="../assets/image/picture/login-left.png"
          alt="登录界面左插图"
        >
        <p>已有账号？</p>
        <button @click="toLogin">去登录</button>
      </div>
      <div class="con-box right">
        <h2>欢迎来到</h2>
        <h2><span>应届生求职平台</span></h2>
        <img
          src="../assets/image/picture/login-right.png"
          alt="登录界面左插图"
        >
        <p>没有账号？</p>
        <button @click="toRegister">去注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      editRegister: {
        username: "",
        password: "",
        role: "",
      }, //注册
      editLogin: {
        username: "",
        password: "",
      }, //登录
    };
  },
  methods: {
    //切换到注册
    toRegister() {
      let register = document.getElementsByClassName("register-box")[0];
      let login = document.getElementsByClassName("login-box")[0];
      let form_box = document.getElementsByClassName("form-box")[0];
      register.classList.remove("hidden");
      login.classList.add("hidden");
      form_box.style.transform = "translateX(80%)";
    },
    //切换到登录
    toLogin() {
      let register = document.getElementsByClassName("register-box")[0];
      let login = document.getElementsByClassName("login-box")[0];
      let form_box = document.getElementsByClassName("form-box")[0];
      register.classList.add("hidden");
      login.classList.remove("hidden");
      form_box.style.transform = "translateX(0%)";
    },
    //注册
    register() {
      for (let item in this.editRegister) {
        if (this.editRegister[item] == "") {
          this.$message.warning("请填写完毕信息");
          return;
        }
      }
      let obj = Object.assign({}, this.editRegister);
      let that = this;
      this.$ajax
        .post("/user/register", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then((res) => {
          if (res.data == "error") {
            that.$message.error("该用户名已存在");
          } else {
            that.$message.success("注册成功，请登录");
          }
        });
    },
    //登录
    login() {
      for (let item in this.editLogin) {
        if (this.editLogin[item] == "") {
          this.$message.warning("请填写完毕信息");
          return;
        }
      }
      let obj = Object.assign({}, this.editLogin);
      let that = this;
      this.$ajax
        .post("/user/login", qs.stringify(obj), {
          "content-type": "application/x-www-form-urlencoded",
        })
        .then((res) => {
          if (res.data == "error") {
            that.$message.error("用户名或密码错误");
          } else {
            that.$message.success("登录成功");
            window.localStorage.setItem("username", obj.username);
            window.localStorage.setItem("password", obj.password);
            window.localStorage.setItem("role", obj.role);
            window.localStorage.setItem("avatar", res.data.avatar);
            window.localStorage.setItem("collectList", res.data.collectList);
            window.localStorage.setItem("sentList", res.data.sentList);
            window.localStorage.setItem("chatList", res.data.chatList);
            that.$router.replace("/employment");
            that.$socket.emit("login", obj.username);
          }
        });
    },
  },
};
</script>

<style>
#login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(200deg, #eef7fb, #b7d6f7);
}
#login .container {
  background: #fff;
  width: 650px;
  height: 415px;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  position: relative;
}
#login .form-box {
  position: absolute;
  top: -10%;
  left: 5%;
  background: #99bddf;
  width: 320px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transition: 0.5s ease-in-out;
}
#login .register-box,
#login .login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
#login .hidden {
  display: none;
  transition: 0.5s;
}
#login h1 {
  text-align: center;
  margin-bottom: 25px;
  color: #fff;
  letter-spacing: 5px;
  font-size: 2em;
  font-weight: 600;
}
#login input,
#login select {
  background-color: transparent;
  width: 70%;
  color: #fff;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  padding: 10px 0;
  text-indent: 10px;
  margin: 8px 0;
  font-size: 14px;
  letter-spacing: 2px;
}
#login input::placeholder {
  color: #fff;
}
#login input:focus,
#login select:focus {
  color: #4c7ca8;
  outline: none;
  border-bottom: 1px solid #4c7ca8;
  transition: 0.5s;
}
#login input:focus::placeholder {
  opacity: 0;
}
#login option {
  color: #000;
}
#login .form-box button {
  width: 70%;
  margin-top: 35px;
  background: #fbfcfd;
  outline: none;
  border-radius: 8px;
  padding: 13px;
  color: #4c7ca8;
  letter-spacing: 2px;
  border: none;
  cursor: pointer;
}
#login .form-box button:hover {
  background: #4c7ca8;
  color: #fbfcfd;
}
#login .con-box {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
#login .con-box.left {
  left: -2%;
}
#login .con-box.right {
  right: -2%;
}
#login .con-box h2 {
  color: #99bddf;
  font-size: 19px;
  font-weight: 600;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 10px;
}
#login .con-box p {
  letter-spacing: 2px;
  color: #4c7ca8;
  text-align: center;
}
#login .con-box span {
  color: #6d9dca;
  font-weight: 600;
}
#login .con-box img {
  width: 200px;
  height: 200px;
  margin: 15px 0;
}
#login .con-box button {
  margin-top: 3%;
  background: #fff;
  color: #6d9dca;
  border: 1px solid #99bddf;
  padding: 6px 10px;
  border-radius: 5px;
  letter-spacing: 1px;
  outline: none;
  cursor: pointer;
}
#login .con-box button:hover {
  background: #6d9dca;
  color: #fff;
  border: 1px solid #6d9dca;
}
</style>