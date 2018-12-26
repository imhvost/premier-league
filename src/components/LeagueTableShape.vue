<template>
  <div
    class="match-tooltip-block"
    @click="openTooltip($event)">
    <a
      :href="'/matches/match/' + match.id"
      :class="'shape-link shape-link-' + result"/>
    <match-tooltip
      :match="match"
      :team="team"
    />
  </div>
</template>

<script>
import MatchTooltip from './MatchTooltip.vue'

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
    result () {
      const score = this.match.score
      if (this.match.homeTeam.name === this.team) {
        switch (score.winner) {
          case 'HOME_TEAM': return 'win'
          case 'AWAY_TEAM': return 'loss'
          default: return 'draw'
        }
      } else {
        switch (score.winner) {
          case 'HOME_TEAM': return 'loss'
          case 'AWAY_TEAM': return 'win'
          default: return 'draw'
        }
      }
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
.shape-link{
  width:10px;
  height:10px;
  display:block;
  border-radius:50%;
  @media @md{
    pointer-events:none;
  }
}
.shape-link-loss{
  background-color:@red;
}
.shape-link-win{
  background-color:@green;
}
.shape-link-draw{
  background-color:@yellow;
}
</style>
