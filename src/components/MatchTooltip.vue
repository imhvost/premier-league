<template>
  <div class="match-tooltip">
    <a
      href="#"
      class="match-tooltip-close"
      @click.stop.prevent="closeTooltip()"/>
    <a
      :href="'/matches/match/' + match.id"
      class="match-tooltip-link"/>
    <div class="match-tooltip-head">
      <div class="match-tooltip-matchday">
        {{ match.matchday }} тур
      </div>
      <div class="match-tooltip-date">
        {{ date }}
      </div>
    </div>
    <div class="match-tooltip-body">
      <template v-if="match.homeTeam.name === team">
        <div class="match-tooltip-team">
          <img
            :src="'/data/' + teamName + '/' + teamName + '.svg'"
            :alt="translateTeamName(team)"
            width="20">
        </div>
        <div class="match-tooltip-team-divider">-</div>
        <div class="match-tooltip-team">
          {{ translateTeamName(match.awayTeam.name) }}
        </div>
      </template>
      <template v-else>
        <div class="match-tooltip-team">
          {{ translateTeamName(match.homeTeam.name) }}
        </div>
        <div class="match-tooltip-team-divider">-</div>
        <div class="match-tooltip-team">
          <img
            :src="'/data/' + teamName + '/' + teamName + '.svg'"
            :alt="translateTeamName(team)"
            width="20">
        </div>
      </template>
    </div>
    <div class="match-tooltip-result">
      <league-match-result :score="match.score"/>
    </div>
  </div>
</template>

<script>
import leagueMatchResult from './LeagueMatchResult.vue'
import Team from '../js/team.js'
import moment from 'moment'
moment.locale('ru')

export default {
  components: {
    leagueMatchResult
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
  data () {
    return {
      date: moment(this.match.utcDate).format('DD MMM YYYY')
    }
  },
  computed: {
    teamName () {
      return Team.getTeamName(this.team)
    }
  },
  methods: {
    translateTeamName (teamName) {
      return Team.translateTeamName(teamName)
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
.match-tooltip{
  position:absolute;
  bottom:100%;
  margin-bottom:10px;
  background:#fff;
  box-shadow:0 0 40px rgba(0,0,0,.6);
  padding:15px 10px;
  text-align:center;
  z-index:6;
  transform:translateY(-10px);
  transition:.2s;
  width:180px;
  margin-left:-90px;
  opacity:0;
  visibility:hidden;
  left:50%;
  font-size:1rem;
  &:after{
    content:'';
    position:absolute;
    left:50%;
    top:100%;
    margin-left:-10px;
    border-top:solid 10px #fff;
    border-left:solid 10px transparent;
    border-right:solid 10px transparent;
  }
}
.match-tooltip-link{
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
}
.match-tooltip-head{
  display:flex;
  color:@placeholder;
  justify-content:center;
  font-size:.875rem;
  margin-bottom:5px;
  font-weight:600;
}
.match-tooltip-matchday{
  margin-right:10px;
}
.match-tooltip-body{
  display:flex;
  align-items:center;
  justify-content:center;
}
.match-tooltip-team{
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
  min-width:1px;
  max-width:125px;
  img{
    display:block;
  }
}
.match-tooltip-team-divider{
  flex:none;
  margin:0 5px;
}
.match-tooltip-result{
  font-weight:600;
  text-align:center;
}
.match-tooltip-close{
  position:absolute;
  right:5px;
  top:5px;
  color:@text;
  width:12px;
  height:12px;
  z-index:6;
  @media @md_{
    display:none;
  }
  &:before,
  &:after{
    content:'';
    position:absolute;
    left:0;
    right:0;
    top:50%;
    margin-top:-1px;
    height:2px;
    background-color:currentColor;
  }
  &:before{
    transform:rotate(45deg);
  }
  &:after{
    transform:rotate(-45deg);
  }
}

</style>
