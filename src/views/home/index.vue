<template>
  <div class="home-container">
    <div class="aside">
      <Aside @setAsideName="setAsideNameHandler"></Aside>
    </div>
    <div class="main">
      <div class="header">
        <span class="asideName">{{ asideName }}</span>
        <div class="right" @mouseleave="isDropdown = false">
          <span class="userName" @mouseenter="isDropdown = true">{{
            userName
          }}</span>
          <div class="dropdown-List" :class="{ isDropdown: isDropdown }">
            <p class="dropdown-item">首页</p>
            <p class="dropdown-item">项目地址</p>
            <p class="dropdown-item" @click="showDialog = true">修改密码</p>
            <p class="dropdown-item" @click="loginoutHandler">登出</p>
          </div>
        </div>
      </div>
      <div class="body">
        <router-view></router-view>
      </div>
    </div>
    <div class="mark" v-show="showDialog"></div>
    <div class="dialog" v-show="showDialog">
      <ul class="dialog-frame">
        <li class="dialog-item">
          <span>修改密码</span>
          <span @click="cancelHandler">×</span>
        </li>
        <li class="dialog-item">
          <span>旧密码</span>
          <input
            type="password"
            v-model="oldPwd.text"
            v-errmsg="oldPwd.msg"
            :class="{ error: oldPwd.flag }"
            @blur="oldPwdHandler"
          />
          <span class="errMsg">2222</span>
        </li>
        <li class="dialog-item">
          <span>新密码</span>
          <input
            type="password"
            v-model="newPwd.text"
            v-errmsg="newPwd.msg"
            :class="{ error: newPwd.flag }"
            @blur="newPwdHandler"
          />
          <span class="errMsg">2222</span>
        </li>
        <li class="dialog-item">
          <span>重复密码</span>
          <input
            type="password"
            v-model="rptPwd.text"
            v-errmsg="rptPwd.msg"
            :class="{ error: rptPwd.flag }"
            @blur="rptPwdHandler"
          />
          <span class="errMsg">2222</span>
        </li>
        <li class="dialog-item">
          <input type="button" value="确认修改" @click="comfirm"/>
          <input type="button" value="取消" @click="cancelHandler" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Aside from "../aside";
import { mapGetters } from "vuex";
import { router } from "@/router/router";
import { updateUserPwd } from '@/api/user'
export default {
  name: "Home",
  data() {
    return {
      asideName: "首页",
      isDropdown: false,
      showDialog: false,
      oldPwd: {
        text: "",
        msg: "",
        flag: false,
      },
      rptPwd: {
        text: "",
        msg: "",
        flag: false,
      },
      newPwd: {
        text: "",
        msg: "",
        flag: false,
      },
    };
  },
  computed: {
    ...mapGetters(["userName"]),
  },
  components: {
    Aside,
  },
  methods: {
    asideChangeHandler(asideName) {
      this.asideName = asideName;
    },
    async loginoutHandler() {
      await this.$store.dispatch("user/loginout");
      router.push("/login");
      this.$message("成功登出");
    },
    cancelHandler() {
      this.showDialog = false;
      this.clearInput();
    },
    oldPwdHandler() {
      if (!this.oldPwd.text) {
        this.oldPwd.flag = true;
        this.oldPwd.msg = "不能为空";
        return false;
      }

      this.oldPwd.msg = "ok";
      return true;
    },
    rptPwdHandler() {
      if (!this.rptPwd.text) {
        this.rptPwd.flag = true;
        this.rptPwd.msg = "不能为空";
        return false;
      }

      if (this.rptPwd.text !== this.newPwd.text) {
        this.rptPwd.flag = true;
        this.rptPwd.msg = "密码不一致";
        return false;
      }

      this.rptPwd.msg = "ok";
      return true;
    },
    newPwdHandler() {
      if (!this.newPwd.text) {
        this.newPwd.flag = true;
        this.newPwd.msg = "不能为空";
        return false;
      }

      this.newPwd.msg = "ok";
      return true;
    },
    clearInput() {
      this.oldPwd.flag = false;
      this.newPwd.flag = false;
      this.rptPwd.flag = false;

      this.oldPwd.text = "";
      this.newPwd.text = "";
      this.rptPwd.text = "";

      this.oldPwd.msg = "";
      this.newPwd.msg = "";
      this.rptPwd.msg = "";
    },
    async comfirm () {
      const flag1 = this.oldPwdHandler();
      const flag2 = this.rptPwdHandler();
      const flag3 = this.newPwdHandler();

      if (flag1 && flag2 && flag3) {
        const res = await updateUserPwd(this.oldPwd.text, this.newPwd.text)
        this.$message(res)
        if (res === '修改成功'){
          this.cancelHandler()
        }
      }
    },
    setAsideNameHandler (name) {
      this.asideName = name
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: rgb(244, 246, 248);

  .aside {
    flex: 1;
  }

  .main {
    flex: 8;

    .header {
      height: 40px;
      border-top: 2px solid rgb(206, 206, 206);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      background-color: #fff;
      .right {
        position: relative;
        height: 160px;
        z-index: 99;
        .dropdown-List {
          position: absolute;
          z-index: 99;
          height: 180px;
          width: 90px;
          top: 60px;
          right: 21px;
          box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.16);
          transition: 0.3s;
          transform-origin: center top;
          transform: scaleY(0);
          padding: 10px 0;
          background-color: #fff;
          &::after {
            content: "";
            display: block;
            position: absolute;
            width: 0px;
            height: 0px;
            border-left: 10px solid transparent;
            border-top: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid rgb(255, 255, 255);
            left: 23px;
            top: -19px;
          }

          .dropdown-item {
            cursor: pointer;
            padding-left: 15px;

            &:hover {
              background-color: rgb(232, 238, 243);
            }
          }
        }

        .isDropdown {
          transform: scaleY(1);
        }
      }

      span {
        margin: 0 25px;

        &.asideName {
          color: rgb(176, 176, 180);
        }
      }
    }

    .body {
      padding: 5px;
      height: calc(100% - 45px);
      width: 1365px;
    }
  }

  .mark {
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .dialog {
    width: 400px;
    height: 350px;
    position: fixed;
    z-index: 9;
    top: 50%;
    left: 50%;
    transform: translate(-200px, -200px);
    background-color: #fff;

    .errMsg {
      position: absolute;
      left: 128px;
      bottom: -15px;
      color: rgb(218, 70, 75);
      opacity: 0;
      transition: 0.5s;
    }

    .dialog-frame {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      .error {
        border-color: rgb(218, 70, 75);
      }

      .dialog-item:nth-child(1) {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;

        span:nth-child(1) {
          font-size: 24px;
        }

        span:nth-child(2) {
          color: rgb(140, 140, 139);
          cursor: pointer;
          height: 20px;
        }
      }
      .dialog-item:nth-child(2),
      .dialog-item:nth-child(3),
      .dialog-item:nth-child(4) {
        height: 35px;
        width: 100%;
        font-size: 16px;
        line-height: 38px;
        font-weight: bold;
        text-align: right;
        padding-right: 45px;
        position: relative;
        input {
          margin-left: 15px;
          height: 100%;
          width: 230px;
          text-indent: 15px;
          border-color: rgb(225, 227, 233);

          &:focus {
            border-color: rgb(58, 101, 132);
          }
        }
      }
      .dialog-item:nth-child(5) {
        width: 100%;
        padding-left: 125px;

        input:nth-child(1) {
          background-color: rgb(39, 82, 251);
          color: rgb(255, 255, 255);
          border-color: rgb(86, 169, 255);
          cursor: pointer;
          width: 100px;
          height: 38px;
          margin-right: 5px;
        }

        input:nth-child(2) {
          background-color: #fff;
          border-color: rgb(225, 227, 233);
          cursor: pointer;
          width: 50px;
          height: 38px;
        }
      }
    }
  }
}
</style>