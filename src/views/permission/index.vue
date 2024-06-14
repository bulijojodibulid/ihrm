<template>
  <div class="permission-container">
    <el-button size="mini" type="primary" @click="__showAddDialog(1)"
      >添加权限</el-button
    >
    <el-table :data="tableData" row-key="id" max-height="520px" default-expand-all>
      <el-table-column
        label="名称"
        align="center"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="标识"
        align="center"
        prop="code"
      ></el-table-column>
      <el-table-column
        label="描述"
        align="center"
        prop="description"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-row>
            <el-button
              type="text"
              size="mini"
              v-if="row.type === 1"
              @click="__showAddDialog(2, row.id)"
              >添加</el-button
            >
            <el-button type="text" size="mini" @click="edit(row)"
              >编辑</el-button
            >
            <el-button type="text" size="mini" @click="del(row)"
              >删除</el-button
            >
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="showDialog"
      :title="title"
      width="450px"
      @close="closeDialog"
    >
      <el-form
        label-width="100px"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input
            size="mini"
            style="width: 250px"
            v-model="ruleForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input
            size="mini"
            style="width: 250px"
            v-model="ruleForm.code"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input
            size="mini"
            style="width: 250px"
            type="textarea"
            v-model="ruleForm.description"
          ></el-input>
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="ruleForm.enVisible"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label-width="0">
          <el-row type="flex" justify="center">
            <el-button type="primary" size="mini" @click="comfirm"
              >确定</el-button
            >
            <el-button size="mini" @click="closeDialog">取消</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { queryAll, add, del, update } from "@/api/permission.js";
import { transListToTree, getTreeIds } from "@/utils";
import Permission from '@/global/permission'
export default {
  data() {
    return {
      title: "",
      tableData: [],
      showDialog: false,
      ruleForm: {
        id: "",
        type: "",
        code: "",
        pid: "",
        enVisible: 0,
        name: "",
        description: "",
      },
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        code: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    this.__showTreeData();
  },
  methods: {
    async __showTreeData() {
      const res = await queryAll();
      const arr = transListToTree(res, 0);
      this.tableData = arr;
    },
    async __add() {
      const res = await add(this.ruleForm);
      this.__requestSuccess(res);
    },
    __showAddDialog(type, pid) {
      this.title = Permission.addTitle;
      this.ruleForm.type = type;
      pid !== undefined ? (this.ruleForm.pid = pid) : (this.ruleForm.pid = 0);
      this.showDialog = true;
    },
    __requestSuccess(res) {
      this.closeDialog();
      this.$message({
        type: "success",
        message: res,
      });
      this.__showTreeData();
    },
    closeDialog() {
      this.showDialog = false;
      this.ruleForm.name = "";
      this.ruleForm.code = "";
      this.ruleForm.description = "";
      this.ruleForm.enVisible = 0;
      this.$refs.ruleForm.clearValidate();
    },
    comfirm() {
      if (this.title === Permission.addTitle) {
        this.__add();
      } else if (this.title === Permission.editTitle) {
        this.__update();
      }
    },
    del(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = getTreeIds(data);
          await del(res);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.__showTreeData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(data) {
      this.ruleForm = { ...data };
      this.showDialog = true;
      this.title = Permission.editTitle;
    },
    async __update() {
      const res = await update(this.ruleForm);
      this.__requestSuccess(res);
    },
  },
};
</script>

<style lang="less" scoped>
.permission-container {
  padding: 10px;
  background-color: #fff;
}
</style>