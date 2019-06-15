<template>
  <tr
    :class="resultClass"
    class="league-match"
    @mouseenter="onHighlight(match.homeTeam.id, match.awayTeam.id)"
    @mouseleave="offHighlight()"
    @click="goToMatch(match.id)">
    <td
      v-if="!isMain"
      data-title=" тур">
      <a :href="'/matches/match/' + match"/>
      {{ match.matchday }}
    </td>
    <td>
      <div class="league-match-date">
        <span>{{ date }}</span>
        <span>{{ time }}</span>
      </div>
    </td>
    <td class="league-match-teams-wrapp">
      <div class="league-match-teams">
        <league-table-team
          :team="match.homeTeam"
          :main-team="mainTeam"/>
        <span class="league-match-teams-divider">-</span>
        <league-table-team
          :team="match.awayTeam"
          :main-team="mainTeam"/>
      </div>
    </td>
    <td>
      <league-match-result
        :score="match.score"
        :in-play="match.status === 'IN_PLAY' ? true : false"
        :in-paused="match.status === 'PAUSED' ? true : false"
      />
    </td>
  </tr>
</template>

<script>
import moment from 'moment'
import LeagueTableTeam from './LeagueTableTeam.vue'
import leagueMatchResult from './LeagueMatchResult.vue'

moment.locale('ru')

export default {
  components: {
    LeagueTableTeam,
    leagueMatchResult
  },
  props: {
    match: {
      type: Object,
      required: true
    },
    isMain: {
      type: Boolean,
      required: true
    },
    mainTeam: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    date () {
      return moment(this.match.utcDate).format('DD MMM YYYY')
    },
    time () {
      return moment(this.match.utcDate).format('HH:mm')
    },
    resultClass () {
      if (!this.mainTeam) return ''
      const winner = this.match.score.winner
      if (winner === 'DRAW') return 'draw'
      if (winner === 'HOME_TEAM') {
        if (this.match.homeTeam.name === this.mainTeam) {
          return 'win'
        } else {
          return 'loss'
        }
      }
      if (winner === 'AWAY_TEAM') {
        if (this.match.awayTeam.name === this.mainTeam) {
          return 'win'
        } else {
          return 'loss'
        }
      }
    }
  },
  methods: {
    onHighlight (homeTeam, awayTeam) {
      document.querySelectorAll('.league-table-main .league-table-team-link').forEach((el) => {
        if (+el.dataset.id === homeTeam || +el.dataset.id === awayTeam) {
          el.closest('tr').classList.add('hover')
        }
      })
    },
    offHighlight () {
      document.querySelectorAll('.league-table-main tr').forEach(el => {
        el.classList.remove('hover')
      })
    },
    goToMatch (match) {
      location.href = '/matches/match/' + match
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.league-match{
  position:relative;
  transition:.2s;
  cursor:pointer;
  &:hover,
  &.hover{
    background-color:@gray;
  }
}
.league-match-date{
  font-size:.875rem;
  color:@placeholder;
  display:flex;
  white-space:nowrap;
  font-weight:600;
  span{
    &:first-child{
      margin-right:5px;
    }
  }
  @media @xs{
    justify-content:center;
  }
}
.league-match-teams{
  display:flex;
  align-items:center;
  @media @xs{
    justify-content:center;
  }
}
.league-match-teams-divider{
  flex:none;
  margin:0 5px;
}
</style>
