<template>
  <div
    class="team-nickname"
    v-html="nickname"/>
</template>

<script>
export default {
  props: {
    nickname: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.team-nickname{
  font-weight:600;
}
.team-nickname /deep/ i{
  font-weight:400;
}
</style>
