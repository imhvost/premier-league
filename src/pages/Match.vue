<template>
  <div class="page-content">
    <transition
      name="fade"
      mode="out-in"
      appear
    >
      <div
        v-if="match"
        class="match">
        <div
          v-if="getStadiumInfo()"
          :style="'background-image:url(/data/' + homeTeam.teamName + '/' + getStadiumInfo().link + '.jpg)'"
          class="match-bg"/>
        <div class="match-body">
          <div class="match-head">
            <page-title
              tag="div"
            />
            <h1 class="match-title">
              {{ homeTeam.translateTeamName }}
              -
              {{ awayTeam.translateTeamName }}
            </h1>
          </div>
          <div class="match-content">
            <div class="match-matchday">Тур {{ match.matchday }}</div>
            <div class="match-date-wrapp"/>
            <match-date
              :date="match.utcDate"
            />
            <div class="match-stadium">
              Стадион
              <team-stadium-link
                v-if="getStadiumInfo()"
                :stadium="getStadiumInfo()"
                :include-name="false"/>
              <span v-if="homeTeam.stadium.capacity">(вместимость {{ homeTeam.stadium.capacity }})</span>
            </div>
            <div class="match-status-wrapp">
              <div
                :class="getStatus(match.status)[1]"
                class="match-status">{{ getStatus(match.status)[0] }}</div>
            </div>
            <div class="match-info">
              <div class="match-info-row flex-row">
                <div class="match-info-col match-info-col-team flex-row-item">
                  <div class="match-info-team-name">{{ homeTeam.translateTeamName }}</div>
                  <div
                    v-if="homeTeam.info.nickname"
                    class="match-info-team-nickname"><span>{{ getNickname(homeTeam.info.nickname) }}</span></div>
                  <teams-list-item
                    :is-match="true"
                    :team="homeTeam.data"/>
                  <div class="match-shapes">
                    <league-table-shapes
                      :matches="matches"
                      :team="homeTeam.data.name"
                      :start-matchday="match.matchday - 1"
                      count="6"
                    />
                  </div>
                </div>
                <div class="match-info-col match-info-col-result flex-row-item">
                  <div class="match-info-result">
                    <league-match-result :score="match.score"/>
                  </div>
                </div>
                <div class="match-info-col match-info-col-team flex-row-item">
                  <div class="match-info-team-name">{{ awayTeam.translateTeamName }}</div>
                  <div
                    v-if="awayTeam.info.nickname"
                    class="match-info-team-nickname"><span>{{ getNickname(awayTeam.info.nickname) }}</span></div>
                  <teams-list-item
                    :is-match="true"
                    :away-kit="true"
                    :team="awayTeam.data"/>
                  <div class="match-shapes">
                    <league-table-shapes
                      :matches="matches"
                      :team="awayTeam.data.name"
                      :start-matchday="match.matchday - 1"
                      count="6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="loading-block loading-block-match"/>
    </transition>
    <div class="match-comments">
      <div class="content-block">
        <h2 class="section-title">Комментарии, прогнозы.</h2>
        <div id="disqus_thread"/>
      </div>
    </div>
  </div>
</template>

<script>
import GetData from '../js/get-data.js'
import PageTitle from '../components/PageTitle.vue'
import MatchDate from '../components/MatchDate.vue'
import TeamStadiumLink from '../components/TeamStadiumLink.vue'
import TeamsListItem from '../components/TeamsListItem.vue'
import LeagueTableShapes from '../components/LeagueTableShapes.vue'
import leagueMatchResult from '../components/LeagueMatchResult.vue'
import Team from '../js/team.js'

export default {
  components: {
    PageTitle,
    MatchDate,
    TeamStadiumLink,
    TeamsListItem,
    LeagueTableShapes,
    leagueMatchResult
  },
  data () {
    return {
      match: null,
      matches: [],
      homeTeam: null,
      awayTeam: null
    }
  },
  beforeCreate: function () {
    let self = this
    const season = this.$root.seasons[this.$root.currentSeason]
    const getData = Promise.all(
      [
        GetData.api('teams', season, 'http://api.football-data.org/v2/competitions/' + season + '/teams'),
        GetData.api('matches', season, 'http://api.football-data.org/v2/competitions/' + season + '/matches')
      ]
    )

    getData.then(result => {
      let matches = result[1].matches
      let match
      self.matches = matches

      for (let i = 0; i < matches.length; i++) {
        const element = matches[i]
        if (element.id === +self.$route.params.match) {
          match = element
          break
        }
      }

      self.match = match

      let homeTeamName = match.homeTeam.name
      let awayTeamName = match.awayTeam.name
      self.homeTeam = {
        teamName: Team.getTeamName(homeTeamName),
        translateTeamName: Team.translateTeamName(homeTeamName),
        info: {},
        stadium: {},
        data: {}
      }
      self.awayTeam = {
        teamName: Team.getTeamName(awayTeamName),
        translateTeamName: Team.translateTeamName(awayTeamName),
        info: {},
        data: {}
      }

      let teams = result[0].teams
      teams.forEach((element) => {
        if (element.name === homeTeamName) self.homeTeam.data = element
        if (element.name === awayTeamName) self.awayTeam.data = element
      })

      const getData = Promise.all(
        [
          GetData.teamInfo(self.homeTeam.teamName),
          GetData.teamInfo(self.awayTeam.teamName)
        ]
      )

      getData.then(result => {
        self.homeTeam.info = result[0]
        self.awayTeam.info = result[1]
        const getData = GetData.stadiumInfo(self.homeTeam.teamName, Team.getStadiumName(result[0].stadiumEn))
        getData.then(result => {
          self.homeTeam.stadium = result
        })
      })
    })
  },
  mounted: function () {
    (function () {
      var d = document; var s = d.createElement('script')
      s.src = 'https://premier-league-xyz.disqus.com/embed.js'
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s)
    })()
  },
  methods: {
    createGoogleMaps () {
      const API_KEY = 'AIzaSyAKU8BWgQIC3LgSkaiKflyRiJfx5d0fCcE'
      return new Promise((resolve, reject) => {
        if (document.querySelector('script[src*="' + API_KEY + '"]')) return
        let gmap = document.createElement('script')
        gmap.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
        gmap.type = 'text/javascript'
        gmap.onload = resolve
        gmap.onerror = reject
        document.body.appendChild(gmap)
      })
    },
    initComments () {

    },
    getStadiumInfo () {
      if (!this.homeTeam.info || !this.homeTeam.info.stadiumEn) return false
      return {
        link: Team.getStadiumName(this.homeTeam.info.stadiumEn),
        title: this.homeTeam.info.stadium,
        name: this.homeTeam.info.stadiumEn,
        team: this.homeTeam.teamName
      }
    },
    getStatus (status) {
      let name
      switch (status) {
        case 'FINISHED':
          return ['Матч завершен', 'match-status-finished']
        case 'SCHEDULED':
          return ['Матч предстоят', 'match-status-scheduled']
        case 'IN_PLAY':
          return ['Идет игра', 'match-status-in-play']
        case 'PAUSED':
          return ['Перерыв', 'match-status-paused']
      }
      return {
        name: name
      }
    },
    getNickname (nickname) {
      return Team.getTeamNicknameFirst(nickname)
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.loading-block-match{
  height:612px;
}
.match{
  position:relative;
  border:solid 1px @border;
}
.match-bg{
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  background-position:center center;
  background-repeat:no-repeat;
  background-size:cover;
  opacity:.1;
}
.match-body{
  position:relative;
  z-index:1;
}
.match-head{
  padding:20px 10px;
  border-bottom:solid 2px @blue;
  text-align:center;
}
.match-title{
  font-size:1.5rem;
  font-weight:600;
}
.match-content{
  padding:20px 10px 40px;
  text-align:center;
}
.match-matchday{
  font-weight:600;
  margin-bottom:15px;
  font-size:1.25rem;
}
.match-stadium{
  font-style:italic;
  margin-bottom:15px;
}
.match-status-wrapp{
  margin-bottom:20px;
}
.match-status{
  padding:5px 10px;
  display:inline-block;
  font-weight:600;
  background-color:@gray;
}
.match-status-finished{
  background-color:@blue;
  color:#fff;
}
.match-status-in-play{
  background-color:@green;
  color:#fff;
}
.match-status-paused{
  background-color:@yellow;
  color:#fff;
}
.match-info{
  padding-top:20px;
}
.match-info-row{
  justify-content:center;
  @media @sm{
    flex-wrap:wrap;
  }
}
.match-info-col{
  width:200px;
  display:flex;
  flex-direction:column;
  align-items:center;
   @media @sm{
    order:0;
    width:100%;
  }
}
.match-info-team-name{
  font-size:1.25rem;
  font-weight:600;
  line-height:1.2;
  margin-bottom:5px;
}
.match-info-team-nickname{
  font-style:italic;
  font-size:.875rem;
  display:inline-block;
  padding:2px 5px;
  background-color:@placeholder;
  line-height:1;
  color:#fff;
  margin-bottom:auto;
  margin-bottom:10px;
}
.match-shapes{
  margin-top:20px;
}
.match-shapes /deep/ .shape-row{
  margin:0 -4px -6px;
}
.match-shapes /deep/ .shape-col{
  padding:0 4px 6px;
}
.match-shapes /deep/ .shape-empty,
.match-shapes /deep/ .shape-link{
  width:12px;
  height:12px;
}
.match-info-result /deep/ .league-match-result-full{
  font-size:3rem;
  font-weight:600;
}
.match-comments{
  padding-top:25px;
  position:relative;
  margin:30px 0;
  &:last-child{
    margin-bottom:0;
  }
  &:before{
    content:'';
    position:absolute;
    width:120px;
    height:3px;
    left:0;
    top:0;
    background:@blue;
  }
}
</style>
