<template>
  <div class="page-content">
    <page-title
      title="Календарь"
    />
    <div class="page-matches">
      <div class="page-matches-row flex-row">
        <div class="page-matches-col page-matches-col-sidebar flex-row-item">
          <div class="sticky-sidebar-wrapp">
            <div class="page-matches-sidebar-body sticky-sidebar-body">
              <transition
                name="fade"
                mode="out-in"
                appear
              >
                <aside
                  v-if="statuses.length"
                  class="page-matches-sidebar">
                  <div class="match-select-row">
                    <div class="match-select-col">
                      <match-select
                        :list="teams"
                        title="Команда"
                        @filter="filtering('team', $event)"
                      />
                    </div>
                    <div class="match-select-col">
                      <match-select
                        :list="matchdays"
                        title="Тур"
                        @filter="filtering('matchday', $event)"
                      />
                    </div>
                    <div class="match-select-col">
                      <match-select
                        :list="statuses"
                        title="Статус"
                        @filter="filtering('status', $event)"
                      />
                    </div>
                  </div>
                </aside>
                <div
                  v-else
                  class="loading-block loading-block-page-matches-sidebar"/>
              </transition>
            </div>
          </div>
        </div>
        <div class="page-matches-col page-matches-col-content flex-row-item">
          <transition
            name="fade"
            mode="out-in"
            appear
          >
            <div
              v-if="matchesAll.length"
              class="page-matches-content">
              <table
                v-if="matches.length"
                class="matches-table matches-table-full">
                <thead>
                  <tr>
                    <td>Тур</td>
                    <td>Дата</td>
                    <td/>
                    <td/>
                  </tr>
                </thead>
                <template v-for="item in matches">
                  <league-match
                    :key="item.id"
                    :match="item"
                    :is-main="false"
                  />
                </template>
              </table>
              <div
                v-else
                class="matches-table-empty">
                По заданным фильтрам нет матчей
              </div>
            </div>
            <div
              v-else
              class="loading-block loading-block-page-matches-content"/>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'
import LeagueMatch from '../components/LeagueMatch.vue'
import MatchSelect from '../components/MatchSelect.vue'
import GetData from '../js/get-data.js'
import Team from '../js/team.js'
import Help from '../js/help.js'

Help.sticky()

export default {
  components: {
    PageTitle,
    LeagueMatch,
    MatchSelect
  },
  data () {
    return {
      matches: [],
      matchesAll: [],
      teams: [],
      matchdays: [],
      statuses: [],
      filter: {
        team: '',
        matchday: '',
        status: ''
      }
    }
  },
  beforeCreate: function () {
    let self = this
    const season = this.$root.seasons[this.$root.currentSeason]
    const getData = Promise.all(
      [
        GetData.api('matches', season, 'http://api.football-data.org/v2/competitions/' + season + '/matches'),
        GetData.api('teams', season, 'http://api.football-data.org/v2/competitions/' + season + '/teams')
      ]
    )

    getData.then(result => {
      let matches = result[0].matches
      let teams = result[1].teams

      teams = Team.sort(teams)

      let necessaryTeamsArray = []
      teams.forEach((element, index) => {
        necessaryTeamsArray[index] = {
          name: Team.translateTeamName(element.name),
          value: element.id
        }
      })

      const lastMatchday = matches[matches.length - 1].matchday

      let matchdays = []
      for (let i = 0; i < lastMatchday; i++) {
        matchdays[i] = {
          name: i + 1,
          value: i + 1
        }
      }

      let statuses = []
      matches.forEach((element) => {
        if (statuses.indexOf(element.status) !== -1) return
        statuses.push(element.status)
      })

      let statusesObjects = []
      statuses.forEach((element) => {
        let name
        switch (element) {
          case 'FINISHED':
            name = 'Завершены'
            break
          case 'SCHEDULED':
            name = 'Предстоят'
            break
          case 'IN_PLAY':
            name = 'В игре'
            break
          case 'PAUSED':
            name = 'Перерыв'
            break
          default:
            name = element
        }
        statusesObjects.push({
          name: name,
          value: element
        })
      })

      self.matches = matches
      self.matchesAll = matches
      self.teams = necessaryTeamsArray
      self.matchdays = matchdays
      self.statuses = statusesObjects
    })
  },
  methods: {
    teamName (teamName) {
      return Team.getTeamName(teamName)
    },
    translateTeamName (teamName) {
      return Team.translateTeamName(teamName)
    },
    filtering (type, value) {
      this.filter[type] = value
      this.matches = this.matchesAll
      let filtering
      if (this.filter.team) {
        filtering = []
        this.matches.forEach((element) => {
          if (element.homeTeam.id === this.filter.team || element.awayTeam.id === this.filter.team) filtering.push(element)
        })
        this.matches = filtering
      }
      if (this.filter.matchday) {
        filtering = []
        this.matches.forEach((element) => {
          if (element.matchday === this.filter.matchday) filtering.push(element)
        })
        this.matches = filtering
      }
      if (this.filter.status) {
        filtering = []
        this.matches.forEach((element) => {
          if (element.status === this.filter.status) filtering.push(element)
        })
        this.matches = filtering
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.loading-block-page-matches-sidebar{
  height:165px;
  min-width:300px;
  width:300px;
  @media @md{
    min-width:230px;
    width:230px;
  }
  @media @sm{
    width:auto;
    min-width:0;
    height:94px;
  }
  @media @xs{
    height:163px;
  }
}
.loading-block-page-matches-content{
  padding-top:100%;
}
.page-matches-row{
  @media @sm{
    display:block;
  }
}
.page-matches-sidebar-body{
  @media @sm_{
    padding-top:30px;
  }
}
.page-matches-sidebar{
  min-width:300px;
  width:300px;
  padding:20px 15px;
  background-color:@blue;
  color:#fff;
  @media @md{
    min-width:230px;
    width:230px;
  }
  @media @sm{
    width:auto;
    min-width:0;
    padding-top:15px;
  }
}
.page-matches-col-content{
  flex:auto;
  min-width:1px;
}
.matches-table-full{
  font-weight:700;
  thead{
    @media @xs{
      display:none;
    }
  }
}
.matches-table-full /deep/ td{
  @media @xs{
    &:nth-child(1),
    &:nth-child(2){
      width:auto;
    }
    &[data-title]{
      margin-right:15px;
      &:after{
        content:attr(data-title);
      }
    }
  }
}
.matches-table-full /deep/ .league-table-team-link-img{
  @media @sm_{
    opacity:0;
    transition:.2s;
  }
  @media @sm{
    display:none;
  }
}
.matches-table-full /deep/ .league-table-team-link-text{
  @media @sm_{
    transform:translateX(-11px);
    transition:.2s;
  }
}
.matches-table-full tr:hover /deep/ .league-table-team-link-img{
  @media @sm_{
    opacity:1;
  }
}
.matches-table-full tr:hover /deep/ .league-table-team-link-text{
  @media @sm_{
    transform:translateX(0);
  }
}
.matches-table-empty{
  font-size:1.25rem;
  font-weight:700;
  color:@placeholder;
  margin-top:25px;
}
.match-select-row{
  margin:0 -5px -10px;
  @media @sm{
    display:flex;
    flex-wrap:wrap;
  }
}
.match-select-col{
  padding:0 5px 10px;
  @media @sm{
    width:33.333%;
  }
  @media @xs{
    width:50%;
  }
}
</style>
