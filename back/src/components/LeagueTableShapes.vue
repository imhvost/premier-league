<template>
  <div class="league-table-shapes">
    <div
      class="shape-row flex-row">
      <div
        v-for="match in necessaryMatches"
        :key="match.id"
        class="shape-col">
        <league-table-shape
          :match="match"
          :team="team"
        />
      </div>
      <template v-if="emptyShapes.length">
        <div
          v-for="item in emptyShapes"
          :key="item"
          class="shape-col">
          <div class="shape shape-empty"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import LeagueTableShape from './LeagueTableShape.vue'

export default {
  components: {
    LeagueTableShape
  },
  props: {
    matches: {
      type: Array,
      required: true
    },
    team: {
      type: String,
      required: true
    },
    count: {
      type: String,
      required: true
    },
    exclude: {
      type: [String, Boolean],
      required: false,
      default: false
    },
    startMatchday: {
      type: Number,
      required: false,
      default: NaN
    }
  },
  computed: {
    necessaryMatches () {
      let matchesArray = this.matches.slice().reverse()
      let count = 0
      let necessaryMatches = []
      for (let i = 0; i < matchesArray.length; i++) {
        if (count === +this.count) break
        const element = matchesArray[i]
        if (!isNaN(this.startMatchday) && this.startMatchday < element.matchday) continue
        if (element.homeTeam.name !== this.team && element.awayTeam.name !== this.team) continue
        if (element.status !== 'FINISHED') continue
        if (this.exclude === 'homeTeam' && element.homeTeam.name === this.team) continue
        if (this.exclude === 'awayTeam' && element.awayTeam.name === this.team) continue
        necessaryMatches.push(element)
        count++
      }
      necessaryMatches.reverse()
      return necessaryMatches
    },
    emptyShapes () {
      return new Array(this.count - this.necessaryMatches.length)
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.shape-row{
  margin:0 -2px -5px;
  justify-content:flex-start;
}
.shape-col{
  padding:0 2px 5px;
}
.shape-empty{
  width:10px;
  height:10px;
  pointer-events:none;
  border-radius:50%;
  background-color:@border;
}
</style>
