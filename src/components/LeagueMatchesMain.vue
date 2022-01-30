<template>
  <transition
    name="fade"
    mode="out-in"
    appear
  >
    <div
      v-if="matches.length && currentMatchday"
      class="main-matches">
      <ul class="matches-tabs-nav tabs-nav">
        <li v-if="prevMatchday">
          <a
            href="#"
            @click.stop.prevent="changeTab('matches-tab-1', $event)"
          >
            <b>Предыдущий тур</b>
            <span>({{ prevMatchday }})</span>
          </a>
        </li>
        <li class="active">
          <a
            href="#"
            @click.stop.prevent="changeTab('matches-tab-2', $event)">
            <b v-if="realMatchday !== lastMatchday">Текущий тур</b>
            <b v-else>Последний тур</b>
            <span>({{ realMatchday }})</span>
          </a>
        </li>
        <li v-if="nextMatchday">
          <a
            href="#"
            @click.stop.prevent="changeTab('matches-tab-3', $event)">
            <b>Следующий тур</b>
            <span>({{ nextMatchday }})</span>
          </a>
        </li>
      </ul>
      <div class="matches-tabs tabs-wrapp">
        <div
          v-if="prevMatchday"
          id="matches-tab-1"
          class="matches-tab tab-block">
          <table class="matches-table matches-table-main">
            <template v-for="item in matches">
              <league-match
                v-if="item.matchday === prevMatchday"
                :key="item.id"
                :match="item"
                :is-main="true"
              />
            </template>
          </table>
        </div>
        <div
          id="matches-tab-2"
          class="matches-tab tab-block active">
          <table class="matches-table matches-table-main">
            <template v-for="item in matches">
              <league-match
                v-if="item.matchday === realMatchday"
                :key="item.id"
                :match="item"
                :is-main="true"
              />
            </template>
          </table>
        </div>
        <div
          v-if="nextMatchday"
          id="matches-tab-3"
          class="matches-tab tab-block">
          <table class="matches-table matches-table-main">
            <template v-for="item in matches">
              <league-match
                v-if="item.matchday === nextMatchday"
                :key="item.id"
                :match="item"
                :is-main="true"
              />
            </template>
          </table>
        </div>
      </div>
    </div>
    <div
      v-else
      class="loading-block loading-block-main-matches"/>
  </transition>
</template>

<script>
import LeagueMatch from './LeagueMatch.vue'
import GetData from '../js/get-data.js'

export default {
  components: {
    LeagueMatch
  },
  data () {
    return {
      matches: [],
      currentMatchday: NaN
    }
  },
  computed: {
    realMatchday () {
      let matches = this.matches.slice().reverse()
      let lastFinished
      for (let i = 0; i < matches.length; i++) {
        const element = matches[i]
        if (element.status === 'FINISHED') lastFinished = element.matchday
      }
      if (lastFinished > this.currentMatchday) return lastFinished++
      return this.currentMatchday
    },
    lastMatchday () {
      let lastMatch = this.matches[this.matches.length - 1]
      return lastMatch.matchday
    },
    prevMatchday () {
      return this.realMatchday === 1 ? 0 : this.realMatchday - 1
    },
    nextMatchday () {
      return this.realMatchday + 1 > this.lastMatchday ? 0 : this.realMatchday + 1
    }
  },
  beforeCreate: function () {
    let self = this
    const season = this.$root.seasons[this.$root.currentSeason]
    const getData = Promise.all(
      [
        GetData.api('competition', season, 'https://api.football-data.org/v2/competitions/' + season),
        GetData.api('matches', season, 'https://api.football-data.org/v2/competitions/' + season + '/matches')
      ]
    )

    getData.then(result => {
      this.currentMatchday = result[0].currentSeason.currentMatchday
      self.matches = result[1].matches
    })
  },
  methods: {
    changeTab (tab, event) {
      document.querySelectorAll('.matches-tabs-nav li, .matches-tab').forEach(el => {
        el.classList.remove('active')
      })
      event.target.closest('li').classList.add('active')
      document.getElementById(tab).classList.add('active')
    }
  }
}
</script>

<style lang="less" scoped>

@import (less) '../less/variables.less';
.loading-block-main-matches{
  height:379px;
}
.matches-table-main /deep/ td{
  .league-table-team-link-img{
    @media @xs_{
      display:none;
    }
  }
}

</style>
