<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="edit-form">
        <el-form
          ref="userForm"
          label-width="220px"
          :model="userInfo"
          :rules="rules"
        >
          <!-- 姓名 部门 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input
                  size="mini"
                  class="inputW"
                  v-model="userInfo.name"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 工号 入职时间 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="工号" prop="workNumber">
                <el-input
                  size="mini"
                  class="inputW"
                  disabled
                  v-model="userInfo.workNumber"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!--手机 聘用形式  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机" prop="phone">
                <el-input
                  size="mini"
                  class="inputW"
                  v-model="userInfo.phone"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门" prop="departmentId">
                <!-- 放置及联部门组件 -->
                <SelectTree class="inputW" v-model="userInfo.departmentId"></SelectTree>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select
                  size="mini"
                  class="inputW"
                  v-model="userInfo.formOfEmployment"
                >
                  <el-option label="正式" :value="1"></el-option>
                  <el-option label="非正式" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间" prop="timeOfEntry">
                <el-date-picker
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  class="inputW"
                  v-model="userInfo.timeOfEntry"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 保存个人信息 -->
          <el-row type="flex">
            <el-col :span="12" style="margin-left: 220px">
              <el-button size="mini" type="primary" @click="saveData">保存更新</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import SelectTree from "./components/select-tree.vue";
import {addEmp, getOneEmp, updateEmp} from '@/api/employee.js'
export default {
  data() {
    return {
      userInfo: {
        name: "", // 用户名
        phone: "", // 手机号
        workNumber: "", // 工号
        formOfEmployment: null, // 聘用形式
        departmentId: null, // 部门id
        timeOfEntry: "", // 入职时间
        id: "" // 员工id
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 1,
            max: 4,
            message: "姓名为1-4位",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            //   pattern 正则表达式
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "请选择聘用形式", trigger: "blur" },
        ],
        departmentId: [
          { required: true, message: "请选择部门", trigger: "blur" },
        ],
        timeOfEntry: [
          { required: true, message: "请选择入职时间", trigger: "blur" },
        ],
      },
    };
  },
  created(){
    this.$route.params.id && this.getEmployee()
  },
  methods: {
    saveData () {
      this.$refs.userForm.validate(async isok => {
        let res;
        if(isok){
          if(this.$route.params.id){
            // 编辑模式
            res = await updateEmp(this.userInfo)
          }else {
            // 添加模式
            res = await addEmp(this.userInfo)
          }
          this.$refs.userForm.resetFields()
          this.$router.push('/employee')
          this.$message({
            type: 'success',
            message: res
          })
        }else{
          return false
        }
      })
    },
    async getEmployee () {
      const res = await getOneEmp(this.$route.params.id)
      this.userInfo = res
    }
  },
  components: {
    SelectTree,
  },
};
</script>

<style scoped lang="less">
.dashboard-container {
  height: 100%;
  width: 100%;
  .app-container {
    height: 100%;
    width: 100%;
    .edit-form {
      background: #fff;
      padding: 20px;
      .inputW {
        width: 380px;
      }
    }
  }
}
</style>