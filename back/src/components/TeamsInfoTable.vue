<template>
  <table class="teams-info-table">
    <teams-info-table-item
      v-for="(team, index) in teams"
      :key="index"
      :team="team"
    />
  </table>
</template>

<script>
import TeamsInfoTableItem from '../components/TeamsInfoTableItem.vue'

export default {
  components: {
    TeamsInfoTableItem
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
.teams-info-table{
  width:100%;
}
.teams-info-table /deep/ td{
  padding:5px;
  border-bottom:solid 1px @border;
  &:first-child{
    padding-right:10px;
    min-width:220px;
    @media @md_{
      width:1%;
      white-space:nowrap;
    }
    @media @xs{
      min-width:0;
      width:50%;
    }
  }
  &:last-child{
    width:100%;
    @media @xs{
      width:50%;
    }
  }
}
</style>
