<template>
  <div class="avatar-container">
    <p class="name">{{ firstName }}</p>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: ["name"],
  computed: {
    firstName() {
      return this.name?.charAt(0);
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
  .name {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    background-color: #66b1ff;
    line-height: 35px;
    color: #fff;
  }
}
</style>