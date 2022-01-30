<template>
  <transition
    name="fade"
    mode="out-in"
    appear
  >
    <table
      v-if="table.length && matches.length"
      class="league-table league-table-main"
    >
      <thead>
        <tr>
          <td/>
          <td>Команда</td>
          <td>Игры</td>
          <td>Победы</td>
          <td>Ничьи</td>
          <td>Пораж.</td>
          <td>Голы</td>
          <td>Очки</td>
          <td class="league-table-shapes-wrapp">Форма</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in table"
          :key="item.position"
          :class="getZonesClass(index)"
          @mouseenter="onHighlight(item.team.id)"
          @mouseleave="offHighlight()">
          <td>{{ index + 1 }}</td>
          <td>
            <league-table-team :team="item.team"/>
          </td>
          <td>{{ item.playedGames }}</td>
          <td>{{ item.won }}</td>
          <td>{{ item.draw }}</td>
          <td>{{ item.lost }}</td>
          <td class="league-table-goals">{{ item.goalsFor }} - {{ item.goalsAgainst }}</td>
          <td><b>{{ item.points }}</b></td>
          <td class="league-table-shapes-wrapp">
            <league-table-shapes
              :matches="matches"
              :team="item.team.name"
              count="6"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-else
      class="loading-block loading-block-league-table-main"/>
  </transition>
</template>

<script>
import LeagueTableTeam from './LeagueTableTeam.vue'
import LeagueTableShapes from './LeagueTableShapes.vue'
import GetData from '../js/get-data.js'

export default {
  components: {
    LeagueTableTeam,
    LeagueTableShapes
  },
  data () {
    return {
      table: [],
      matches: [],
      zones: {
        championsLeagueZone: 4,
        europaLeagueZone: 1,
        relegationZone: 3
      }
    }
  },
  beforeCreate: function () {
    let self = this
    const season = this.$root.seasons[this.$root.currentSeason]
    const getData = Promise.all(
      [
        GetData.api('standings', season, 'http://api.football-data.org/v2/competitions/' + season + '/standings'),
        GetData.api('matches', season, 'http://api.football-data.org/v2/competitions/' + season + '/matches')
      ]
    )
    getData.then(result => {
      result[0].standings.forEach((item) => {
        if (item.type === 'TOTAL') self.table = item.table
      })
      self.matches = result[1].matches
    })
  },
  methods: {
    getZonesClass (index) {
      if (index < this.zones.championsLeagueZone) {
        return 'champions-league-zone'
      }
      if (index >= this.zones.championsLeagueZone && index < this.zones.championsLeagueZone + this.zones.europaLeagueZone) {
        return 'europa-league-zone'
      }
      if (index >= this.table.length - this.zones.relegationZone) {
        return 'relegation-zone'
      }
    },
    onHighlight (team) {
      document.querySelectorAll('.matches-table-main .league-table-team-link').forEach((el) => {
        if (+el.dataset.id === team) {
          el.closest('tr').classList.add('hover')
        }
      })
    },
    offHighlight () {
      document.querySelectorAll('.matches-table-main tr').forEach(el => {
        el.classList.remove('hover')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.loading-block-league-table-main{
  height:631px;
}
.league-table-main{
  td{
    width:1%;
    &:nth-child(2){
      width:100%;
    }
  }
}
</style>
