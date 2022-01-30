<template>
  <div class="page-content">
    <div class="team-body">
      <div class="team-content">
        <transition
          name="fade"
          mode="out-in"
          appear
        >
          <div
            v-if="teamData"
            class="team-head">
            <div class="team-head-row flex-row">
              <div class="team-head-col team-head-col-logo flex-row-item">
                <div class="team-logo">
                  <img
                    :src="'/data/'+ teamName +'/' + teamName + '.svg'"
                    :alt="translateTeamName">
                </div>
              </div>
              <div class="team-head-col team-head-col-content flex-row-item">
                <h1 class="team-title">{{ translateTeamName }}</h1>
                <div class="team-name">{{ teamData.name }}</div>
                <div
                  v-if="getTeamNickname()"
                  class="team-nickname-wrapp">
                  <team-nickname
                    :nickname="getTeamNickname()"
                  />
                </div>
                <div
                  v-if="teamInfo"
                  class="team-info">
                  <ul class="team-info-list">
                    <li v-if="teamData.founded">
                      <span class="team-info-list-title">Основан</span>
                      <span class="team-info-list-data">в <b>{{ teamData.founded }}</b> году</span>
                    </li>
                    <li v-if="teamInfo.location">
                      <span class="team-info-list-title">Местоположение:</span>
                      <span class="team-info-list-data"><b>{{ teamInfo.location }}</b></span>
                    </li>
                    <li v-if="getStadiumInfo()">
                      <span class="team-info-list-title">Стадион:</span>
                      <span class="team-info-list-data">
                        <team-stadium-link :stadium="getStadiumInfo()"/>
                      </span>
                    </li>
                    <li v-if="teamData.website">
                      <span class="team-info-list-title">Официальный сайт:</span>
                      <span class="team-info-list-data">
                        <a
                          :href="teamData.website"
                          target="_balnk" >{{ teamData.website }}</a>
                      </span>
                    </li>
                    <li v-if="teamData.address">
                      <span class="team-info-list-title">Адрес:</span>
                      <span class="team-info-list-data">{{ teamData.address }}</span>
                    </li>
                    <li v-if="teamData.email">
                      <span class="team-info-list-title">Почта:</span>
                      <span class="team-info-list-data">{{ teamData.email }}</span>
                    </li>
                    <li v-if="teamData.phone">
                      <span class="team-info-list-title">Телефон:</span>
                      <span class="team-info-list-data">{{ teamData.phone }}</span>
                    </li>
                    <li v-if="teamInfo.facebook || teamInfo.twitter || teamInfo.youtube || teamInfo.instagram || teamInfo.google">
                      <span class="team-info-list-title"><b>{{ translateTeamName }}</b> в соцсетях:</span>
                      <div class="team-info-list-data">
                        <ul class="team-social-list">
                          <li v-if="teamInfo.facebook">
                            <a
                              :href="'https://www.facebook.com/' + teamInfo.facebook"
                              target="_blank"
                              class="team-social-link team-social-link-facebook">
                              <i class="icon-facebook-i"/>
                            </a>
                          </li>
                          <li v-if="teamInfo.twitter">
                            <a
                              :href="'https://twitter.com/' + teamInfo.twitter"
                              target="_blank"
                              class="team-social-link team-social-link-twitter">
                              <i class="icon-twitter"/>
                            </a>
                          </li>
                          <li v-if="teamInfo.youtube">
                            <a
                              :href="'https://www.youtube.com/' + teamInfo.youtube"
                              target="_blank"
                              class="team-social-link team-social-link-youtube">
                              <i class="icon-youtube"/>
                            </a>
                          </li>
                          <li v-if="teamInfo.instagram">
                            <a
                              :href="'https://www.instagram.com/' + teamInfo.instagram"
                              target="_blank"
                              class="team-social-link team-social-link-instagram">
                              <i class="icon-instagram"/>
                            </a>
                          </li>
                          <li v-if="teamInfo.google">
                            <a
                              :href="'//plus.google.com/u/0/+' + teamInfo.google"
                              target="_blank"
                              class="team-social-link team-social-link-google">
                              <i class="icon-gplus"/>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else
            class="loading-block loading-block-team-head"/>
        </transition>
        <transition
          name="fade"
          mode="out-in"
          appear
        >
          <section
            v-if="teamData"
            class="team-section">
            <h2 class="section-title">Форма</h2>
            <div class="team-kit">
              <div class="team-kit-row flex-row">
                <div class="team-kit-col flex-row-item">
                  <div class="team-kit-block">
                    <div class="team-kit-block-title">Домашняя форма</div>
                    <img
                      :src="'/data/'+ teamName +'/home-kit.png'"
                      :alt="translateTeamName + ' - домашняя форма'">
                  </div>
                </div>
                <div class="team-kit-col flex-row-item">
                  <div class="team-kit-block">
                    <div class="team-kit-block-title">Гостевая форма</div>
                    <img
                      :src="'/data/'+ teamName +'/away-kit.png'"
                      :alt="translateTeamName + ' - гостевая форма'">
                  </div>
                </div>
                <div class="team-kit-col flex-row-item">
                  <div class="team-kit-block">
                    <div class="team-kit-block-title">Дополнительная форма</div>
                    <img
                      :src="'/data/'+ teamName +'/third-kit.png'"
                      :alt="translateTeamName + ' - дополнительная форма'">
                  </div>
                </div>
              </div>
            </div>
            <div class="team-kit-desc">
              Фото взяты с <a
                href="//www.premierleague.com"
                target="_blank">www.premierleague.com</a>
            </div>
          </section>
          <div
            v-else
            class="loading-block loading-block-team-kit"/>
        </transition>
      </div>
      <transition
        name="fade"
        mode="out-in"
        appear
      >
        <section
          v-if="teamData"
          class="team-matches">
          <h2 class="section-title">Календарь</h2>
          <table class="matches-table matches-table-team">
            <template v-for="item in teamMatches">
              <league-match
                :key="item.id"
                :match="item"
                :is-main="true"
                :main-team="teamData.name"
              />
            </template>
          </table>
        </section>
        <div
          v-else
          class="loading-block loading-block-team-matches"/>
      </transition>
    </div>
    <transition
      name="fade"
      mode="out-in"
      appear
    >
      <section
        v-if="teamInfo"
        class="team-section">
        <h2 class="section-title">О клубе</h2>
        <page-content-text
          :content-text="teamInfo.description.replace(/[\\]/g, '')"
          class="page-content-text"
        />
      </section>
      <div
        v-else
        class="loading-block loading-block-team-section-content"/>
    </transition>
  </div>
</template>

<script>
import GetData from '../js/get-data.js'
import Team from '../js/team.js'
import TeamNickname from '../components/TeamNickname.vue'
import TeamStadiumLink from '../components/TeamStadiumLink.vue'
import PageContentText from '../components/PageContentText.vue'
import LeagueMatch from '../components/LeagueMatch.vue'

export default {
  components: {
    TeamNickname,
    TeamStadiumLink,
    PageContentText,
    LeagueMatch
  },
  data () {
    return {
      teamName: this.$route.params.team,
      teamData: null,
      teamInfo: null,
      translateTeamName: '',
      teamMatches: []
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
      let teams = result[0].teams
      let teamData

      for (let i = 0; i < teams.length; i++) {
        const element = teams[i]
        if (Team.getTeamName(element.name) === self.teamName) {
          teamData = element
          break
        }
      }

      self.teamData = teamData
      self.translateTeamName = Team.translateTeamName(teamData.name)

      let matches = result[1].matches
      let teamMatches = []
      for (let i = 0; i < matches.length; i++) {
        const element = matches[i]
        if (element.homeTeam.name === teamData.name || element.awayTeam.name === teamData.name) {
          teamMatches.push(element)
        }
      }
      self.teamMatches = teamMatches
    })
  },
  created: function () {
    const getData = GetData.teamInfo(this.teamName)

    let self = this
    getData.then(result => {
      self.teamInfo = result
    })
  },
  methods: {
    getTeamNickname () {
      if (!this.teamInfo) return false
      return Team.getTeamNickname(this.teamInfo.nickname)
    },
    getStadiumName () {
      if (!this.teamInfo) return false
      return Team.getStadiumName(this.teamInfo.stadiumEn)
    },
    getStadiumInfo () {
      if (!this.teamInfo) return false
      return {
        link: this.getStadiumName(),
        title: this.teamInfo.stadium,
        name: this.teamInfo.stadiumEn,
        team: this.teamName
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.loading-block-team-head{
  height:356px;
}
.loading-block-team-section-content{
  height:350px;
}
.loading-block-team-kit{
  height:441px;
  @media @lg{
    height:920px;
  }
  @media @md{
    height:952px;
  }
  @media @sm{
    height:auto;
    padding-top:100%;
  }
}
.loading-block-team-matches{
  height:400px;
  @media @md_{
    width:380px;
    min-width:380px;
    padding-top:100%;
    height:0;
  }
}
.team-body{
  @media @md_{
    display:flex;
    padding-bottom:30px;
  }
}
.team-content{
  flex:auto;
  min-width:1px;
  @media @md_{
    padding-right:20px;
  }
}
.team-matches{
  padding:30px 0;
  @media @md_{
    width:380px;
    min-width:380px;
    padding:0 0 0 13px;
    border-left:solid 3px @border;
  }
}
.team-head{
  margin-bottom:30px;
}
.team-logo{
  width:300px;
  min-width:300px;
  img{
    display:block;
    width:100%;
  }
  @media @lg{
    width:250px;
    min-width:250px;
  }
  @media @sm{
    width:170px;
    min-width:170px;
  }
  @media @xs{
    margin:auto;
  }
}
.team-head-row{
  @media @xs{
    display:block;
  }
}
.team-head-col-content{
  flex:auto;
  min-width:1px;
}
.team-title{
  font-size:2rem;
  font-weight:600;
  @media @xs{
    text-align:center;
  }
}
.team-name{
  font-size:1.5rem;
  font-weight:700;
  margin-bottom:10px;
  @media @xs{
    text-align:center;
  }
}
.team-nickname-wrapp{
  margin-bottom:10px;
  background-color:@blue;
  padding:5px 10px;
  color:#fff;
}
.team-info{
  padding-top:10px;
  border-top:solid 1px @border;
}
.team-info-list{
  &>li+li{
    margin-top:5px;
  }
}
.team-info-list-title{
  color:@title;
}
.team-info-list-data{
  display:inline-block;
  a{
    text-decoration:underline;
    &:hover{
      text-decoration:none;
    }
  }
}
.team-social-list{
  display:flex;
  margin:0 -4px;
  li{
    padding:0 4px;
  }
}
.team-social-link{
  width:30px;
  height:30px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:50%;
  line-height:1;
  border:solid 1px;
  i{
    &:before{
      width:auto;
      margin:0;
    }
  }
  &:hover{
    background-color:currentColor;
    i{
      color:#fff;
    }
  }
}
.team-social-link-facebook{
  color:#4267b2;
}
.team-social-link-twitter{
  color:#1da1f2;
}
.team-social-link-youtube{
  color:#e62117;
  i{
    font-size:1.25rem;
  }
}
.team-social-link-instagram{
  color:#3897f0;
}
.team-social-link-google{
  color:#db4437;
}
.team-section{
  padding-top:25px;
  position:relative;
  margin-bottom:30px;
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
.team-kit-row{
  flex-wrap:wrap;
  justify-content:center;
}
.team-kit-col{
  width:33.333%;
  display:flex;
  flex-direction:column;
  @media @lg{
    width:50%;
  }
  @media @xs{
    width:100%;
  }
}
.team-kit-block{
  flex:auto;
  padding:15px;
  border:solid 1px @gray;
  text-align:center;
}
.team-kit-block-title{
  font-size:1.25rem;
  font-weight:600;
  margin-bottom:20px;
  color:@title;
}
.team-kit-desc{
  text-align:right;
  margin-top:10px;
  font-size:.85rem;
}
.matches-table-team /deep/ .loss /deep/ td{
  &:last-child{
    border-right:solid 8px @red;
    padding-right:10px;
  }
}
.matches-table-team /deep/ .win /deep/ td{
  &:last-child{
    border-right:solid 8px @green;
    padding-right:10px;
  }
}
.matches-table-team /deep/ .draw /deep/ td{
  &:last-child{
    border-right:solid 8px @yellow;
    padding-right:10px;
  }
}
</style>
