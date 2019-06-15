<template>
  <div
    class="match-tooltip-block"
    @click="openTooltip($event)">
    <a
      :href="'/matches/match/' + match.id"
      class="comming-match-link">
      <img
        :src="'/data/'+ teamName +'/' + teamName + '.svg'"
        :alt="translateTeamName"
        width="30">
    </a>
    <match-tooltip
      :match="match"
      :team="team"
    />
  </div>
</template>

<script>
import MatchTooltip from './MatchTooltip.vue'
import Team from '../js/team.js'

export default {
  components: {
    MatchTooltip
  },
  props: {
    match: {
      type: Object,
      required: true
    },
    team: {
      type: String,
      required: true
    }
  },
  computed: {
    teamName () {
      return Team.getTeamName(this.rival)
    },
    translateTeamName () {
      return Team.translateTeamName(this.rival)
    },
    rival () {
      return this.team === this.match.homeTeam.name ? this.match.awayTeam.name : this.match.homeTeam.name
    }
  },
  methods: {
    openTooltip (event) {
      this.closeTooltip()
      event.target.closest('.match-tooltip-block').classList.add('active')
    },
    closeTooltip () {
      document.querySelectorAll('.match-tooltip-block').forEach(element => {
        element.classList.remove('active')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.comming-match-link{
  display:flex;
  flex-direction:column;
  align-items:center;
  font-size:0;
  width:30px;
  height:30px;
  @media @md{
    width:24px;
    height:24px;
    pointer-events:none;
  }
  img{
    max-height:100%;
  }
}
</style>
