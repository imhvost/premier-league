import Home from '../pages/Home.vue'
import LeagueTable from '../pages/LeagueTable.vue'
import Matches from '../pages/Matches.vue'
import Teams from '../pages/Teams.vue'
import Stadiums from '../pages/Stadiums.vue'
import Stadium from '../pages/Stadium.vue'
import Team from '../pages/Team.vue'
import Match from '../pages/Match.vue'
import Page404 from '../pages/Page404.vue'
import Rules from '../pages/Rules.vue'
import Contacts from '../pages/Contacts.vue'

import LeagueTableFull from '../components/LeagueTableFull.vue'
import TeamsList from '../components/TeamsList.vue'
import TeamsInfoTable from '../components/TeamsInfoTable.vue'

export default {
  mode: 'history',
  fallback: false,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    { path: '/', component: Home },
    { path: '/league-table/', redirect: '/league-table/total' },
    { path: '/league-table/',
      component: LeagueTable,
      children: [
        {
          name: 'total',
          path: 'total',
          component: LeagueTableFull
        },
        {
          name: 'home',
          path: 'home',
          component: LeagueTableFull
        },
        {
          name: 'away',
          path: 'away',
          component: LeagueTableFull
        }
      ]
    },
    { path: '/matches/', component: Matches },
    { path: '/teams/', redirect: '/teams/list' },
    { path: '/teams/',
      component: Teams,
      children: [
        {
          name: 'list',
          path: 'list',
          component: TeamsList
        },
        {
          name: 'nicknames',
          path: 'nicknames',
          component: TeamsInfoTable
        },
        {
          name: 'stadiums',
          path: 'stadiums',
          component: TeamsInfoTable
        }
      ]},
    { path: '/stadiums/', component: Stadiums },
    { path: '/stadiums/:team/:stadium', component: Stadium },
    { path: '/teams/team/:team', component: Team },
    { path: '/matches/match/:match', component: Match },
    { path: '/rules/', component: Rules },
    { path: '/contacts/', component: Contacts },
    { path: '*', component: Page404 }
  ]
}
