// 部门负责人写一下

<template>
  <div class="addDialog-container">
    <el-dialog
      :title="title"
      :visible="showAddDialog"
      @close="closeHanlder"
      width="450px"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        ref="elForm"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input placeholder="2-10个字符" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="managerId">
          <el-select
            placeholder="请输入负责人"
            style="width: 100%"
            v-model="ruleForm.managerId"
          >
            <el-option
              v-for="item in users"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            type="textarea"
            v-model="ruleForm.introduce"
            placeholder="1-100个字符"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeHanlder">取 消</el-button>
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryAllDepartment,
  querySimpleUsers,
  addDepartment,
  updateDepartment
} from "@/api/department.js";
export default {
  async created() {
    const res = await querySimpleUsers();
    this.users = res;
  },
  data() {
    return {
      title: "",
      flag: "",
      ruleForm: {
        name: "",
        managerId: "",
        introduce: "",
      },
      rules: {
        name: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
          {
            validator: async (rule, value, callback) => {
              let res = await queryAllDepartment();
              if (this.flag === "edit") {
                res = res.filter((item) => {
                  return item.name !== this.ruleForm.name;
                });
              }
              if (
                res.some((item) => {
                  return item.name === value;
                })
              ) {
                callback(new Error("部门已存在"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        managerId: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        introduce: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      selValue: "",
      users: "",
    };
  },
  props: ["showAddDialog", "depTarget"],
  methods: {
    closeHanlder() {
      this.$emit("update:showAddDialog", false);
    },
    confirmBtn() {
      this.$refs.elForm.validate(async (valid) => {
        let res = ''
        if (valid) {
          if (this.flag === "add") {
            res = await addDepartment({
              pid: this.ruleForm.id,
              name: this.ruleForm.name,
              introduce: this.ruleForm.introduce,
              managerId: this.ruleForm.managerId,
            });
          }else if (this.flag === 'edit') {
            res = await updateDepartment({
              id: this.ruleForm.id,
              name: this.ruleForm.name,
              managerId: this.ruleForm.managerId,
              introduce: this.ruleForm.introduce
            })
          }
          this.closeHanlder();
          this.$emit("addOk");
          this.$message(res)
        } else {
          return false;
        }
      });
    },
    setDepTarget(flag) {
      this.$refs.elForm.resetFields();
      if (flag === "add") {
        this.ruleForm.id = this.depTarget.id
        this.title = `添加子部门-${this.depTarget.name}`;
      } else if (flag === "edit") {
        // 做数据回显
        this.ruleForm = this.depTarget;
        this.title = `编辑部门-${this.depTarget.name}`;
      }
      this.flag = flag;
    },
  },
};
</script>

<style lang="less" scoped>
:deep(.el-form-item__label)  {
  font-weight: bolder;
}
</style>