<template>
  <tr>
    <td>
      <league-table-team
        :team="team"
        :include-name="true"/>
    </td>
    <td>
      <transition
        name="fade"
        mode="out-in"
        appear
      >
        <div
          v-if="getTeamNickname() && getStadiumInfo()"
          class="teams-info-table-data">
          <template v-if="$route.name === 'nicknames'">
            <team-nickname :nickname="getTeamNickname()"/>
          </template>
          <template v-if="$route.name === 'stadiums'">
            <team-stadium-link :stadium="getStadiumInfo()"/>
          </template>
        </div>
        <div
          v-else
          class="loading-block loading-block-teams-info-table-data"/>
      </transition>
    </td>
  </tr>
</template>

<script>
import Team from '../js/team.js'
import LeagueTableTeam from './LeagueTableTeam.vue'
import TeamNickname from './TeamNickname.vue'
import TeamStadiumLink from './TeamStadiumLink.vue'
import GetData from '../js/get-data.js'

export default {
  components: {
    LeagueTableTeam,
    TeamNickname,
    TeamStadiumLink
  },
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      teamInfo: null
    }
  },
  computed: {
    teamName () {
      return Team.getTeamName(this.team.name)
    },
    translateTeamName () {
      return Team.translateTeamName(this.team.name)
    }
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
.loading-block-teams-info-table-data{
  height:19px;
}
</style>
