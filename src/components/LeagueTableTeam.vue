<template>
  <a
    :href="'/teams/team/' + teamName"
    :data-id="team.id"
    class="league-table-team-link">
    <span
      v-if="!mainTeam || mainTeam === team.name"
      class="league-table-team-link-img">
      <img
        :src="'/data/'+ teamName +'/' + teamName + '.svg'"
        :alt="translateTeamName">
    </span>
    <span
      v-if="mainTeam !== team.name"
      class="league-table-team-link-text">
      {{ translateTeamName }}
      <span
        v-if="includeName"
        class="league-table-team-link-name">
        ({{ team.name }})
      </span>
    </span>
  </a>
</template>

<script>
import Team from '../js/team.js'

export default {
  props: {
    team: {
      type: Object,
      required: true
    },
    includeName: {
      type: Boolean,
      required: false,
      default: false
    },
    mainTeam: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    teamName () {
      return Team.getTeamName(this.team.name)
    },
    translateTeamName () {
      return Team.translateTeamName(this.team.name)
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.league-table-team-link{
  display:flex;
  align-items:center;
  font-weight:600;
  color:@title;
  margin:-3px;
  padding:3px;
  &:hover{
    text-decoration:underline;
  }
}
.league-table-team-link-img{
  width:20px;
  height:20px;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:0;
  flex:none;
  margin-right:5px;
  &:last-child{
    margin-right:0;
  }
  img{
    max-height:100%;
    width:20px;
  }
}
.league-table-team-link-text{
  margin-right:5px;
  &:last-child{
    margin-right:0;
  }
}
.league-table-team-link-name{
  font-weight:400;
  font-style:italic;
}
</style>
