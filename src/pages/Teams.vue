<template>
  <div class="page-content">
    <page-title
      title="Команды"
    />
    <div class="page-teams-row flex-row">
      <div class="page-teams-col page-teams-col-sidebar flex-row-item">
        <div class="sticky-sidebar-wrapp">
          <div class="page-matches-sidebar-body sticky-sidebar-body">
            <transition
              name="fade"
              mode="out-in"
              appear
            >
              <aside
                v-if="teams.length"
                class="page-teams-sidebar">
                <ul class="page-teams-nav">
                  <router-link
                    tag="li"
                    to="/teams/list"
                  >
                    <a>
                      <b>Команды</b>
                    </a>
                  </router-link>
                  <router-link
                    tag="li"
                    to="/teams/nicknames"
                  >
                    <a>
                      <b>Прозвища</b>
                    </a>
                  </router-link>
                  <router-link
                    tag="li"
                    to="/teams/stadiums"
                  >
                    <a>
                      <b>Стадионы</b>
                    </a>
                  </router-link>
                </ul>
              </aside>
              <div
                v-else
                class="loading-block loading-block-page-teams-sidebar"/>
            </transition>
          </div>
        </div>
      </div>
      <div class="page-teams-col page-teams-col-content flex-row-item">
        <div class="page-teams-content">
          <transition
            name="fade"
            mode="out-in"
            appear
          >
            <router-view
              v-if="teams.length"
              v-bind="{teams: teams}"/>
            <div
              v-else
              class="loading-block loading-block-page-teams-content"/>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'
import Help from '../js/help.js'
import GetData from '../js/get-data.js'
import Team from '../js/team.js'

Help.sticky()

export default {
  components: {
    PageTitle
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
.loading-block-page-teams-sidebar{
  height:39px;
  @media @sm_{
    min-width:200px;
    width:200px;
    height:119px;
  }
}
.loading-block-page-teams-content{
  padding-top:100%;
}
.page-teams-row{
  @media @sm{
    display:block;
  }
}
.page-matches-sidebar-body{
  padding-top:30px;
  @media @sm{
    padding:0 0 10px;
  }
}
.page-teams-sidebar{
  @media @sm_{
    min-width:200px;
    width:200px;
  }
}
.page-teams-col-content{
  flex:auto;
  min-width:1px;
}
.page-teams-nav{
  text-align:center;
  @media @sm{
    display:flex;
  }
  li{
    margin-bottom:1px;
    @media @sm{
      margin:0 1px 0 0;
      flex:auto;
    }
  }
  a{
    display:block;
    padding:10px 5px;
    background-color:@gray;
    transition:.2s;
    position:relative;
    color:inherit;
    font-weight:700;
    &:hover{
      background-color:@border;
    }
    &:after{
      content:'';
      position:absolute;
      left:100%;
      top:50%;
      margin-top:-10px;
      border-top:solid 10px transparent;
      border-bottom:solid 10px transparent;
      border-left:solid 10px @green;
      transition:.2s;
      opacity:0;
      visibility:hidden;
      @media @sm{
        left:50%;
        top:100%;
        margin:0 0 0 -10px;
        border-left:solid 10px transparent;
        border-right:solid 10px transparent;
        border-top:solid 10px @green;
        border-bottom:0;
      }
    }
  }
  .active,
  .router-link-active{
    a{
      pointer-events:none;
      background-color:@green;
      color:#fff;
      &:after{
        opacity:1;
        visibility:visible;
      }
    }
  }
}
</style>
