<template>
  <div class="import-excel-container">
    <el-dialog
      width="500px"
      title="添加员工"
      :visible="showDialog"
      @close="close"
    >
      <el-row type="flex" justify="center">
        <div class="upload-excel">
          <input
            type="file"
            ref="excel-upload-input"
            class="excel-upload-input"
            accept=".xlsx, .xls"
            @change="changeHandler"
          />
          <div
            class="drop"
            ref="drop"
            draggable
            @dragover="dragoverHandler"
            @drop="dropHandler"
          >
            <i class="el-icon-upload"></i>
            <el-button type="text" @click="getTemplate" style="width: 85px"
              >下载导入模板</el-button
            >
            <span>
              将文件拖到此处或
              <el-button type="text" @click="fileOpen">点击上传</el-button>
            </span>
          </div>
        </div>
      </el-row>
      <el-row type="flex" justify="end">
        <el-button size="mini" type="primary" @click="close">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getTemplate, importEmp } from "@/api/employee";
import FileSaver from "file-saver";
export default {
  props: ["showDialog"],
  methods: {
    close() {
      this.$emit("update:showDialog", false);
    },
    changeHandler(e) {
      if (e.target.files.length > 0) {
        this.uploadFile(e.target.files[0])
      }
    },
    async uploadFile(file) {
      const formData = new FormData();
      formData.append("file", file, "template.xlsx");
      const res = await importEmp(formData);
      if (!res) {
        this.$message({
          type: "success",
          message: "导入成功",
        });
        this.close();
        this.$emit("flushPage");
      } else {
        this.$message.error(res);
      }
      // 清空文件选择器
      this.$refs["excel-upload-input"].value = "";
    },
    fileOpen() {
      this.$refs["excel-upload-input"].click();
    },
    async getTemplate() {
      const res = await getTemplate();
      this.$message({
        type: "success",
        message: "开始下载，请等待",
      });
      FileSaver.saveAs(res, "template.xlsx");
    },
    dragoverHandler(e) {
      e.preventDefault();
    },
    dropHandler(e) {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      this.uploadFile(file)
    },
  }
};
</script>

<style lang="less" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin: 20px;
  width: 360px;
  height: 180px;
  align-items: center;
  color: #697086;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .drop {
    border: 1px dashed #dcdfe6;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 160px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .drop {
    line-height: 40px;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
      color: #c0c4cc;
    }
  }
}
</style>