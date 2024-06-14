<template>
  <div class="login-container">
    <div class="logo"></div>
    <div class="form">
      <p class="form-item title">登录</p>
      <div class="form-item">
        <input
          type="text"
          :class="{ error: phoneInput.flag }"
          placeholder="请输入手机号"
          v-model="phoneInput.text"
          v-errmsg="phoneInput.msg"
          @blur="phoneHandler"
        />
        <span class="errMsg">1111</span>
      </div>
      <div class="form-item">
        <input
          type="password"
          :class="{ error: pwdInput.flag }"
          placeholder="请输入密码"
          v-model="pwdInput.text"
          v-errmsg="pwdInput.msg"
          @blur="pwdHandler"
        />
        <span class="errMsg">2222</span>
      </div>
      <div class="form-item">
        <input 
          type="checkbox" 
          ref="checkbox"
          checked
          v-errmsg="checkInput.msg"
          @click="checkHandler"/>
        <span class="errMsg">333</span>
        <span style="color: rgb(73, 162, 255); cursor: pointer"
          >用户平台使用协议</span
        >
      </div>
      <input type="button" value="登录" class="form-item" @click="throttleFunc"/>
    </div>
  </div>
</template>

<script>
import throttle from '@/utils/throttle.js'
export default {
  name: "Login",
  created () {
    this.throttleFunc = throttle(this.btnHandler, 3000)
  },
  data() {
    return {
      phoneInput: {
        text: "18913255747",
        msg: "", // 提示信息
        flag: false,
      },
      pwdInput: {
        text: "123",
        msg: "",
        flag: false,
      },
      checkInput: {
        msg: "",
      }
    };
  },
  methods: {
    phoneHandler() {
      if (this.phoneInput.text === "") {
        this.phoneInput.flag = true;
        this.phoneInput.msg = "手机号不能为空";
        return false;
      }

      if (!this.phoneInput.text.match(/^1[3-9]\d{9}$/)) {
        this.phoneInput.flag = true;
        this.phoneInput.msg = "手机号格式错误";
        return false;
      }

      this.phoneInput.msg = "ok";
      this.phoneInput.flag = false;

      return true
    },
    pwdHandler() {
      if (this.pwdInput.text === "") {
        this.pwdInput.flag = true;
        this.pwdInput.msg = "密码不能为空";
        return false;
      }

      if (this.pwdInput.text.length < 3) {
        this.pwdInput.flag = true;
        this.pwdInput.msg = "密码必须大于三个数";
        return false;
      }

      this.pwdInput.msg = "ok";
      this.pwdInput.flag = false;

      return true
    },
    checkHandler (e) {
      const flag = typeof e === 'boolean' ? e : e.target.checked

      if(!flag){
        this.checkInput.msg = "您必须勾选用户的使用协议！"
        return false
      }

      this.checkInput.msg = "ok"

      return true
    },
    async btnHandler () {
      const flag1 = this.phoneHandler()
      const flag2 = this.pwdHandler()
      const flag3 = this.checkHandler(this.$refs.checkbox.checked)

      if (flag1 && flag2 && flag3){
        await this.$store.dispatch('user/login', {
          phone: this.phoneInput.text,
          pwd: this.pwdInput.text
        })
        this.$router.push('/home')
      }
    }
  },
};
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  width: 100vw;
  height: 100vh;

  .logo {
    flex: 3;
    background-image: url("../../assets/common/login_back.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin-right: 100px;
    border-top-right-radius: 50px;
  }

  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .form-item {
      width: 350px;
      margin-bottom: 50px;
      position: relative;

      &.title {
        font-size: 38px;
        font-weight: bolder;
      }

      .error {
        border-color: rgb(218, 70, 75);
      }

      .errMsg {
        position: absolute;
        left: 15px;
        bottom: 0;
        color: rgb(218, 70, 75);
        opacity: 0;
        transition: 0.5s;
      }
    }

    input:not(input[type="checkbox"]) {
      height: 44px;
      width: 100%;
      text-indent: 15px;
      background: #f4f5fb;
      border-color: rgb(225, 227, 233);
      border-radius: 3px;

      &::placeholder {
        color: rgb(168, 170, 176);
      }
      &:focus {
        border-color: rgb(58, 101, 132);
      }
    }

    .form-item[value="登录"] {
      background-color: rgb(39, 82, 251);
      color: rgb(255, 255, 255);
      border-color: rgb(86, 169, 255);
      cursor: pointer;
      width: 350px;
    }
  }
}
</style>
