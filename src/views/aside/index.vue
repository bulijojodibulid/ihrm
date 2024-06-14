<template>
  <div class="aside-container">
    <ul>
      <li
        v-for="item in routes"
        :key="item.path"
        :class="{ active: item.isSelected }"
        @click="selectHandler(item)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: [],
    };
  },
  created() {
    let temp = this.$router.options.routes.slice(2)[0].children;
    // 过滤出hidden为true的
    this.routes = temp.filter((item) => {
      return !!!item.hidden;
    });
    this.selectHandler(this.routes[0]);
  },
  methods: {
    selectHandler(item) {
      for (const route of this.routes) {
        if (route.isSelected) {
          route.isSelected = false;
        }
      }
      item.isSelected = true;
      this.$emit("setAsideName", item.title);
      this.$router.push(item.path);
    },
  },
};
</script>

<style lang="less" scoped>
.aside-container {
  height: 100%;
  width: 100%;
  background-color: rgb(4, 21, 40);
  background-image: url(../../assets/common/leftnavBg.png);
  background-repeat: no-repeat;
  background-position-y: 513px;
  color: rgb(142, 154, 171);

  ul {
    li {
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      padding-left: 35px;

      &:hover {
        background-color: rgb(78, 90, 103);
        color: rgb(185, 201, 213);
      }

      &.active {
        color: rgb(235, 244, 244);
      }
    }
  }
}
</style>