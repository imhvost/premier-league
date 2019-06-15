<template>
  <div class="teams-row flex-row">
    <div
      v-for="(team, index) in teams"
      :key="index"
      class="teams-col flex-row-item">
      <teams-list-item
        :team="team"
      />
    </div>
  </div>
</template>

<script>
import TeamsListItem from '../components/TeamsListItem.vue'

export default {
  components: {
    TeamsListItem
  },
  props: {
    teams: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.teams-row{
  flex-wrap:wrap;
  justify-content:center;
}
.teams-col{
  width:25%;
  @media @lg{
    width:33.333%;
  }
  @media @md{
    width:50%;
  }
  @media @xs{
    width:100%;
  }
}
</style>
