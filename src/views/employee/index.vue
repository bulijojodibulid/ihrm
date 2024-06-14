<template>
  <div class="employee-container">
    <div class="app-container">
      <div class="left">
        <el-input
          prefix-icon="el-icon-search"
          placeholder="输入员工姓名全员搜索"
          size="mini"
          style="width: 180px; margin-bottom: 20px"
          v-model="requestParams.keyword"
          @change="search"
        ></el-input>
        <el-tree
          :data="data"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
          ref="depTree"
          @node-click="treeNodeClick"
        ></el-tree>
      </div>
      <div class="right">
        <el-row type="flex" justify="end" style="margin-right: 83px">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push('/employee/detail')"
            >添加员工</el-button
          >
          <el-button size="mini" @click="add">excel导入</el-button>
          <el-button size="mini" @click="exportEmp">execl导出</el-button>
        </el-row>
        <el-table style="width: 100%" :data="tableData">
          <el-table-column label="头像" align="center">
            <template slot-scope="{ row }">
              <Avatar :name="row.name"></Avatar>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            align="center"
          ></el-table-column>
          <el-table-column
            label="手机号"
            sortable
            prop="phone"
            align="center"
          ></el-table-column>
          <el-table-column
            label="工号"
            sortable
            prop="workNumber"
            align="center"
          ></el-table-column>
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            align="center"
          >
            <template slot-scope="{ row }">
              {{ row.formOfEmployment === 1 ? "正式" : "非正式" }}
            </template>
          </el-table-column>
          <el-table-column
            label="部门"
            prop="departmentName"
            align="center"
          ></el-table-column>
          <el-table-column
            label="入职时间"
            sortable
            prop="timeOfEntry"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-button
                size="mini"
                type="text"
                @click="$router.push(`/employee/detail/${row.id}`)"
                >查看</el-button
              >
              <el-button size="mini" type="text" @click="btnRole(row.id)"
                >角色</el-button
              >
              <el-popconfirm
                confirm-button-text="确认"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                title="确定删除?"
                style="margin-left: 10px"
                @confirm="del(row)"
              >
                <el-button slot="reference" size="mini" type="text"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-pagination
            layout="prev, pager, next, jumper"
            :total="total"
            :page-size="requestParams.pageSize"
            :current-page.sync="requestParams.currentPage"
            @current-change="setEmployee"
          >
          </el-pagination>
        </el-row>
      </div>
    </div>
    <ImportExcel
      :showDialog.sync="showDialog"
      @flushPage="setEmployee"
    ></ImportExcel>
    <el-dialog :visible.sync="showRoleDialog" title="分配角色" @close="closeHandler">
      <el-checkbox-group v-model="roleIds">
        <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{
          item.name
        }}</el-checkbox>
      </el-checkbox-group>
      <template slot="footer">
        <el-row type="flex" justify="center">
          <el-button size="mini" type="primary" @click="updateRole">确定</el-button>
          <el-button size="mini" @click="showRoleDialog=false">取消</el-button>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { queryAllDepartment } from "@/api/department";
import { transListToTree } from "@/utils";
import { getEmployee, exportEmp, delEmp, getRoleIds, updateRole } from "@/api/employee";
import { getEnableRoleList } from "@/api/role";
import Avatar from "@/components/Avatar.vue";
import ImportExcel from "./components/import-excel.vue";
import FileSaver from "file-saver";
export default {
  name: "Employee",
  created() {
    this.getDepartment();
  },
  components: {
    Avatar,
    ImportExcel,
  },
  data() {
    return {
      data: [],
      defaultProps: {
        label: "name",
        children: "children",
      },
      requestParams: {
        departmentId: "",
        keyword: "",
        currentPage: 1,
        pageSize: 8,
      },
      tableData: [],
      showDialog: false,
      showRoleDialog: false,
      total: 1,
      roleList: [],
      roleIds: [],
      currentEmpId: ''
    };
  },
  methods: {
    async getDepartment() {
      const res = await queryAllDepartment();
      const arr = transListToTree(res, 0);
      this.data = arr;
      this.requestParams.departmentId = arr[0].id;
      // 等待渲染结束后选定节点
      this.$nextTick(async () => {
        this.$refs.depTree?.setCurrentKey(this.requestParams.departmentId);
        // 选定结束后，获取员工信息
        this.setEmployee();
      });
    },
    async getEnableRoleList() {
      const res = await getEnableRoleList();
      this.roleList = res;
    },
    async echoRole(empId){
      const res = await getRoleIds(empId)
      this.roleIds = res
    },
    async btnRole(empId) {
      await this.getEnableRoleList();
      await this.echoRole(empId)
      this.currentEmpId =empId
      this.showRoleDialog = true;
    },
    async updateRole(){
      await updateRole(this.currentEmpId, this.roleIds)
      this.showRoleDialog = false
      this.$message({
        type: 'success',
        message: '修改成功'
      })
    },
    closeHandler(){
      this.roleIds = []
    },
    treeNodeClick(data) {
      this.requestParams.departmentId = data.id;
      this.setEmployee();
    },
    async setEmployee() {
      const res = await getEmployee(this.requestParams);
      this.total = res.total;
      this.tableData = res.rows;
    },
    search() {
      // 直接获取员工信息
      this.setEmployee();
    },
    async exportEmp() {
      const res = await exportEmp();
      FileSaver.saveAs(res, "data.xlsx");
    },
    add() {
      this.showDialog = true;
    },
    async del(data) {
      const id = data.id;
      const res = await delEmp(id);
      this.$message({
        type: "success",
        message: res,
      });
      this._flushPage();
    },
    _flushPage() {
      let currPage = this.requestParams.currentPage;
      let pageSize = this.requestParams.pageSize;

      let totalPage = Math.ceil(this.total / pageSize);
      let delAfterPage = Math.ceil((this.total - 1) / pageSize);

      if (delAfterPage < 1) {
        delAfterPage = 1;
      }
      if (currPage < totalPage) {
        this.setEmployee();
      } else {
        this.requestParams.currentPage = delAfterPage;
        this.setEmployee();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.employee-container {
  height: 100%;
  .app-container {
    margin: 5px;
    height: calc(100% - 10px);
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    .left {
      width: 280px;
      text-align: center;
      padding: 20px;
      border-right: 1px solid #eaeef4;
    }
    .right {
      flex: 1;
      padding: 20px;
    }
  }
}
</style>