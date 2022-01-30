<template>
  <div class="page-content">
    <page-title
      title="Стадионы"
    />
    <transition
      name="fade"
      mode="out-in"
      appear
    >
      <div
        v-if="teams.length"
        class="stadiums">
        <div class="stadiums-row flex-row">
          <div
            v-for="(team, index) in teams"
            :key="index"
            class="stadiums-col flex-row-item">
            <stadiums-item :team="team"/>
          </div>
        </div>
      </div>
      <div
        v-else
        class="loading-block loading-block-stadiums"/>
    </transition>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'
import StadiumsItem from '../components/StadiumsItem.vue'
import GetData from '../js/get-data.js'
import Team from '../js/team.js'

export default {
  components: {
    PageTitle,
    StadiumsItem
  },
  data () {
    return {
      teams: []
    }
  },
  beforeCreate: function () {
    let self = this
    const season = this.$root.seasons[this.$root.currentSeason]
    const getData = GetData.api('teams', season, 'http://api.football-data.org/v2/competitions/' + season + '/teams')

    getData.then(result => {
      let teams = result.teams
      teams = Team.sort(teams)
      self.teams = teams
    })
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.loading-block-stadiums{
  padding-top:100%;
}
.stadiums-row{
  flex-wrap:wrap;
  padding-top:20px;
  justify-content:center;
  @media @sm{
    padding-top:10px;
  }
}
.stadiums-col{
  width:25%;
  display:flex;
  flex-direction:column;
  @media @md{
    width:33.333%;
  }
  @media @sm{
    width:50%;
  }
  @media @xs{
    width:100%;
  }
}
</style>
