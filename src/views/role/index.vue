<template>
  <div class="role-container">
    <div class="btn-container">
      <el-button type="primary" size="mini" @click="add">添加角色</el-button>
    </div>
    <div class="table-container">
      <el-table :data="roles">
        <el-table-column
          label="角色"
          prop="name"
          width="220"
          align="center"
        ></el-table-column>
        <el-table-column label="启用" prop="state" width="220" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.state === 1 ? "已启用" : "未启用" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          align="center"
          prop="description"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini">分配权限</el-button>
            <el-button type="text" size="mini" @click="edit(row)"
              >编辑</el-button
            >
            <el-button type="text" size="mini" @click="del(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-row type="flex" justify="end">
        <el-pagination
          layout="prev, pager, next, jumper"
          :total="total"
          :current-page.sync="currentPage"
          @current-change="pageHandler"
        >
        </el-pagination>
      </el-row>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="showDialog"
      width="450px"
      @close="closeDialog"
    >
      <el-form label-width="80px" :model="ruleForm" :rules="rules" ref="form">
        <el-form-item label="角色名称" prop="name">
          <el-input
            size="mini"
            style="width: 300px"
            v-model="ruleForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="启用">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="ruleForm.state"
          ></el-switch>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input
            type="textarea"
            style="width: 300px"
            v-model="ruleForm.description"
          ></el-input>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-button type="primary" size="mini" @click="submitForm"
            >确定</el-button
          >
          <el-button size="mini" @click="closeDialog">取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { queryAllRole, addRole, delRole, updateRole, getEnableRoleList } from "@/api/role.js";
export default {
  name: "role",
  async created() {
    this.pageHandler(1);
  },
  data() {
    return {
      roles: [],
      currentPage: 1,
      total: 0,
      title: "",
      showDialog: false,
      ruleForm: {
        name: "",
        description: "",
        state: 0,
      },
      rules: {
        name: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let rolesTemp = [...this.roles];
              if (this.title === "编辑角色") {
                rolesTemp = rolesTemp.filter(
                  (item) => item.name !== this.ruleForm.name
                );
              }
              if (rolesTemp.some((item) => item.name === value)) {
                callback(new Error("用户名已存在"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        description: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    async pageHandler(current) {
      const res = await queryAllRole({ page: current, pageSize: 10 });
      this.roles = res.rows;
      this.total = res.total;
    },
    closeDialog() {
      this.$refs.form.resetFields();
      this.showDialog = false;
      this.ruleForm.state = 0;
      this.ruleForm.name = ''
      this.ruleForm.description = ''
    },
    submitForm() {
      this.$refs.form.validate(async (valid) => {
        let res = "";
        if (valid) {
          if (this.title === "添加角色") {
            res = await addRole(this.ruleForm);
          }else if(this.title === '编辑角色'){
            res = await updateRole(this.ruleForm)
          }
          // 编辑角色API逻辑
          this.closeDialog();
          this.$message({
            type: "success",
            message: res,
          });
          this.pageHandler(this.currentPage);
        } else {
          return false;
        }
      });
    },
    add() {
      this.showDialog = true;
      this.title = "添加角色";
    },
    edit(data) {
      this.showDialog = true;
      this.title = "编辑角色";
      this.ruleForm = { ...data };
    },
    del(id) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delRole(id);
          this.$message({
            type: "success",
            message: res,
          });
          // 刷新页面
          this._flushPage();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    _flushPage() {
      const totalPage = Math.ceil(this.total / 10);
      const page = Math.ceil((this.total - 1) / 10);
      if (this.currentPage < totalPage) {
        // 直接刷新当前页
        this.pageHandler(this.currentPage);
      } else {
        // 最后一页
        // 当删除最后一个元素时，page就是前一页，否则刷新当页
        this.pageHandler(page);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.btn-container {
  background-color: rgb(255, 255, 255);
  padding: 10px;
}
:deep(.el-form-item__label) {
  font-weight: bolder;
}
</style>