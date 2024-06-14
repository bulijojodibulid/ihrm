<template>
  <div class="department-container">
    <el-tree :data="depts" default-expand-all>
      <template slot-scope="{ data }">
        <el-row type="flex" justify="space-between">
          <el-col>
            <span>{{ data.name }}</span>
          </el-col>
          <el-col :span="4">
            <span class="dropdown-title">{{ data.managerName }}</span>
            <el-dropdown trigger="click" @command="handleCommand($event, data)">
              <span class="el-dropdown-link" @click="clickHandler($event)">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item command="cancel">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </template>
    </el-tree>
    <AddDialog
      :showAddDialog.sync="showAddDialog"
      @addOk="getDepartments"
      ref="addDialog"
      :depTarget="depTarget"
    ></AddDialog>
  </div>
</template>

<script>
import { queryAllDepartment, delDepartment } from "@/api/department.js";
import { transListToTree, getTreeIds } from "@/utils";
import AddDialog from "./components/addDialog.vue";
export default {
  data() {
    return {
      depts: [],
      showAddDialog: false,
      depTarget: "",
    };
  },
  created() {
    this.getDepartments();
  },
  components: {
    AddDialog,
  },
  methods: {
    async getDepartments() {
      const data = await queryAllDepartment();
      console.log(data)
      const arr = transListToTree(data, 0);
      this.depts = arr;
    },
    clickHandler(e) {
      e.stopPropagation();
    },
    handleCommand(itemId, data) {
      if (itemId === "cancel") {
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            // 获取该部门及其子部门id
            const ids = getTreeIds(data)
            await delDepartment(ids)
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getDepartments()
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
        return;
      }
      this.depTarget = { ...data };
      this.showAddDialog = !this.showAddDialog;
      this.$nextTick(() => {
        this.$refs.addDialog.setDepTarget(itemId);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.department-container {
  padding: 0 327px;
}
:deep(.el-tree-node__content) {
  margin-bottom: 12px;

  .el-tree-node {
    margin-bottom: 12px;
  }

  .el-row {
    height: 100%;
    width: 100%;
  }
}

.dropdown-title {
  margin-right: 15px;
}
</style>