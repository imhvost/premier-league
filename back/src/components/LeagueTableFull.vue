<template>
  <transition
    name="fade"
    mode="out-in"
    appear
  >
    <div
      v-if="standings.length && matches.length"
      class="league-table-wrapp">
      <div class="league-table-body">
        <table class="league-table league-table-full">
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
              <td class="league-table-percent">% очков</td>
              <td class="league-table-shapes-wrapp">Форма</td>
              <td class="league-table-coming-games-wrapp">Ближайшие</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in table"
              :key="item.position"
              :class="getZonesClass(index)">
              <td>{{ index + 1 }}</td>
              <td>
                <league-table-team :team="item.team"/>
              </td>
              <td>{{ item.playedGames }}</td>
              <td>{{ item.won }}</td>
              <td>{{ item.draw }}</td>
              <td>{{ item.lost }}</td>
              <td>{{ item.goalsFor }} - {{ item.goalsAgainst }}</td>
              <td><b>{{ item.points }}</b></td>
              <td class="league-table-percent">{{ ((item.points * 100) / (item.playedGames * 3)).toFixed(2) }}</td>
              <td class="league-table-shapes-wrapp">
                <league-table-shapes
                  :matches="matches"
                  :team="item.team.name"
                  :exclude="excludedTeams"
                  count="7"
                />
              </td>
              <td class="league-table-coming-games-wrapp">
                <div class="league-table-coming-games-row flex-row">
                  <div
                    v-for="(match, index) in gatComingGamesTeam(item.team.name)"
                    :key="index"
                    class="league-table-coming-games-col flex-row-item">
                    <league-table-coming-game
                      :match="match"
                      :team="item.team.name"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-else
      class="loading-block loading-block-league-table-full"/>
  </transition>
</template>

<script>
import LeagueTableTeam from '../components/LeagueTableTeam.vue'
import LeagueTableShapes from '../components/LeagueTableShapes.vue'
import LeagueTableComingGame from '../components/LeagueTableComingGame.vue'
import moment from 'moment'
import GetData from '../js/get-data.js'

export default {
  components: {
    LeagueTableTeam,
    LeagueTableShapes,
    LeagueTableComingGame
  },
  data () {
    return {
      standings: [],
      matches: [],
      zones: {
        championsLeagueZone: 4,
        europaLeagueZone: 1,
        relegationZone: 3
      },
      isComingGames: false,
      countComingGames: 2
    }
  },
  computed: {
    table () {
      let tableType = this.$route.name.toUpperCase()
      let table
      this.standings.forEach((item) => {
        if (item.type === tableType) table = item.table
      })
      return table
    },
    excludedTeams () {
      switch (this.$route.name) {
        case 'home': return 'awayTeam'
        case 'away': return 'homeTeam'
        default: return false
      }
    },
    comingGames () {
      let teams = {}
      this.table.forEach((element) => {
        const name = element.team.name
        teams[name] = []
      })

      let count = 0
      const letMaxCount = this.table.length * this.countComingGames

      const now = moment().unix()
      for (let i = 0; i < this.matches.length; i++) {
        if (count === letMaxCount) break
        const element = this.matches[i]
        const teamHomeName = element.homeTeam.name
        const teamAwayName = element.awayTeam.name
        if (moment().unix(element.utcDate) < now) continue
        if (element.status === 'FINISHED' || element.status === 'IN_PLAY') continue

        if (teams[teamHomeName].length < this.countComingGames && this.excludedTeams !== 'homeTeam') {
          teams[teamHomeName].push(element)
          count++
        }
        if (teams[teamAwayName].length < this.countComingGames && this.excludedTeams !== 'awayTeam') {
          teams[teamAwayName].push(element)
          count++
        }
      }
      return teams
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
      self.standings = result[0].standings
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
    gatComingGamesTeam (team) {
      return this.comingGames[team]
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.loading-block-league-table-full{
  height:856px;
}
.league-table-coming-games-row{
  margin:0 -3px -5px;
  justify-content:center;
}
.league-table-coming-games-col{
  padding:0 3px 5px;
}
.league-table-full{
  thead{
    white-space:nowrap;
  }
  @media @md_{
    font-size:1.25rem;
  }
  td{
    @media @sm{
      width:1%;
    }
    &:nth-child(2){
      @media @sm{
        width:100%;
      }
    }
  }
  .league-table-shapes-wrapp{
    @media @md_{
      padding-left:7px;
      padding-right:7px;
    }
  }
}
.league-table-percent{
  color:@placeholder;
}
.league-table-full /deep/ .shape-link,
.league-table-full /deep/ .shape-empty{
  @media @md_{
    width:14px;
    height:14px;
  }
}
</style>
