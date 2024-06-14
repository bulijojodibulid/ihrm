<template>
  <el-cascader 
    size="mini" 
    :options="treeData" 
    :props="option"
    :value="value"
    @change="changeHandler">
  </el-cascader>
</template>

<script>
import { queryAllDepartment } from "@/api/department.js";
import { transListToTree } from "@/utils/index.js";
export default {
  async created() {
    const res = await queryAllDepartment();
    const arr = transListToTree(res, 0);
    this.treeData = arr;
  },
  props: ['value'],
  data() {
    return {
      treeData: [],
      option: {
        value: "id",
        label: "name",
        emitPath: false,
        checkStrictly: true
      },
    };
  },
  methods: {
    changeHandler(data){
        this.$emit('input', data)
    }
  }
};
</script>