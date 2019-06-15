<template>
  <a
    :href="'/stadiums/'+ stadium.team +'/' + stadium.link"
    class="team-stadium-link">
    {{ stadium.title }} <i v-if="includeName">({{ stadium.name }})</i>
  </a>
</template>

<script>
export default {
  props: {
    stadium: {
      type: Object,
      required: true
    },
    includeName: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.team-stadium-link{
  font-weight:600;
  text-decoration:underline;
  &:hover{
    text-decoration:none;
  }
  i{
    font-weight:400;
  }
}
</style>
