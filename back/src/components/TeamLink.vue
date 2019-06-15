<template>
  <a
    :href="'/teams/team/' + team.link"
    class="team-link">
    {{ team.title }} <i>({{ team.name }})</i>
  </a>
</template>
<script>
export default {
  props: {
    team: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>

.team-link{
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
