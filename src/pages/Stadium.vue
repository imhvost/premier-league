<template>
  <div class="page-content">
    <div
      v-if="teamInfo && stadiumInfo"
      class="stadium-head">
      <div class="stadium-head-row flex-row">
        <div class="stadium-head-col stadium-head-col-content flex-row-item">
          <div class="stadium-head-content">
            <h1 class="stadium-title">{{ stadiumInfo.name }} </h1>
            <div class="stadium-name">{{ teamInfo.stadiumEn }}</div>
            <div
              v-if="stadiumNickname"
              class="stadium-nickname-wrapp">
              <team-nickname
                :nickname="stadiumNickname"
              />
            </div>
            <div class="stadium-info">
              <ul class="stadium-info-list">
                <li v-if="teamLink">
                  <span class="stadium-info-list-title">Команда:</span>
                  <span class="team-info-list-data">
                    <team-link :team="teamLink"/>
                  </span>
                </li>
                <li v-if="stadiumInfo.capacity">
                  <span class="stadium-info-list-title">Вместимость:</span>
                  <span class="stadium-info-list-data"><b>{{ stadiumInfo.capacity }}</b> человек</span>
                </li>
                <li v-if="stadiumInfo.built">
                  <span class="stadium-info-list-title">Построен</span>
                  <span class="stadium-info-list-data">в <b>{{ stadiumInfo.built }}</b> году</span>
                </li>
                <li v-if="stadiumInfo.rebuilt">
                  <span class="stadium-info-list-title">Реконструкция:</span>
                  <span class="stadium-info-list-data">в <b>{{ stadiumInfo.rebuilt }}</b> году</span>
                </li>
                <li v-if="stadiumInfo.size">
                  <span class="stadium-info-list-title">Размер поля:</span>
                  <span class="stadium-info-list-data"><b>{{ stadiumInfo.size }}</b></span>
                </li>
                <li v-if="stadiumInfo.address">
                  <span class="stadium-info-list-title">Адрес:</span>
                  <span class="stadium-info-list-data">{{ stadiumInfo.address }}</span>
                </li>
                <li v-if="stadiumInfo.tel">
                  <span class="stadium-info-list-title">Телефон:</span>
                  <span class="stadium-info-list-data">{{ stadiumInfo.tel }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="stadium-head-col stadium-head-col-img flex-row-item">
          <div class="stadium-head-img">
            <img
              :src="'/data/' + teamName + '/' + stadiumName + '.jpg'"
              :alt="stadiumInfo.name">
          </div>
        </div>
      </div>
    </div>
    <section
      v-if="stadiumInfo"
      class="stadium-section">
      <h2 class="section-title">О стадионе</h2>
      <page-content-text
        :content-text="stadiumInfo.description.replace(/[\\]/g, '')"
        class="page-content-text"
      />
    </section>
    <div class="stadium-view">
      <div class="stadium-view-row flex-row">
        <div class="stadium-view-col flex-row-item">
          <section class="stadium-section">
            <h2 class="section-title">Вид со спутника</h2>
            <div
              id="stadium-map-satellite"
              class="stadium-map"/>
          </section>
        </div>
        <div class="stadium-view-col flex-row-item">
          <section class="stadium-section">
            <h2 class="section-title">Панорама</h2>
            <div
              id="stadium-map-panorama"
              class="stadium-map"/>
          </section>
        </div>
      </div>
    </div>
    <section class="stadium-section">
      <h2 class="section-title">На карте</h2>
      <div
        id="stadium-map-main"
        class="stadium-map"/>
    </section>
  </div>
</template>

<script>
import GetData from '../js/get-data.js'
import Team from '../js/team.js'
import TeamLink from '../components/TeamLink.vue'
import TeamNickname from '../components/TeamNickname.vue'
import PageContentText from '../components/PageContentText.vue'

export default {
  components: {
    TeamLink,
    PageContentText,
    TeamNickname
  },
  data () {
    return {
      teamLink: null,
      teamInfo: null,
      stadiumInfo: null,
      stadiumName: '',
      stadiumNickname: '',
      teamName: this.$route.params.team
    }
  },
  beforeCreate: function () {
    let self = this
    const season = this.$root.seasons[this.$root.currentSeason]
    const getData = GetData.api('teams', season, 'http://api.football-data.org/v2/competitions/' + season + '/teams')

    getData.then(result => {
      let teams = result.teams
      let teamData

      for (let i = 0; i < teams.length; i++) {
        const element = teams[i]
        if (Team.getTeamName(element.name) === self.teamName) {
          teamData = element
          break
        }
      }

      let translateTeamName = Team.translateTeamName(teamData.name)
      self.teamLink = {
        link: self.teamName,
        title: translateTeamName,
        name: teamData.name
      }
    })
  },
  created: function () {
    const getData = GetData.teamInfo(this.teamName)

    let self = this
    getData.then(result => {
      let teamInfo = result
      self.teamInfo = teamInfo
      self.stadiumName = Team.getStadiumName(teamInfo.stadiumEn)

      const getData = GetData.stadiumInfo(self.teamName, self.stadiumName)
      getData.then(result => {
        self.stadiumInfo = result
        self.stadiumNickname = Team.getTeamNickname(result.nickname) || ''
        self.createGoogleMaps().then(this.initGoogleMaps)
      })
    })
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
    initGoogleMaps () {
      const center = {
        lat: +this.stadiumInfo.lat,
        lng: +this.stadiumInfo.lng
      }
      const centerPanorama = center
      /* eslint-disable-next-line */
      var satellite = new google.maps.Map(document.getElementById('stadium-map-satellite'), {
        center: center,
        zoom: 18,
        /* eslint-disable-next-line */
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        mapTypeControl: false,
        scrollwheel: false
      })
      /* eslint-disable-next-line */
      var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('stadium-map-panorama'), {
          position: centerPanorama,
          pov: {
            heading: 35,
            pitch: 10
          },
          addressControl: false
        })
      satellite.setStreetView(panorama)
      /* eslint-disable-next-line */
      var map = new google.maps.Map(document.getElementById('stadium-map-main'), {
        center: center,
        zoom: 9,
        /* eslint-disable-next-line */
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        mapTypeControl: false,
        streetViewControl: false,
        scrollwheel: false
      })

      const contentString = `<div class="map-content">
      <div class="map-content-title">
        ${this.stadiumInfo.name} <i>(${this.teamInfo.stadiumEn})</i>
      </div>
      <div class="map-content-address">${this.stadiumInfo.address}</div>
      </div>`
      /* eslint-disable-next-line */
      const infowindow = new google.maps.InfoWindow({
        content: contentString
      })
      /* eslint-disable-next-line */
      const marker = new google.maps.Marker({
        position: center,
        map: map,
        title: ''
      })
      marker.addListener('click', function () {
        infowindow.open(map, marker)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.stadium-head{
  margin-bottom:30px;
}
.stadium-head-row{
  @media @sm{
    display:block;
  }
}
.stadium-title{
  font-size:2rem;
  font-weight:600;
  @media @xs{
    text-align:center;
  }
}
.stadium-name{
  font-size:1.5rem;
  font-weight:700;
  margin-bottom:10px;
  @media @xs{
    text-align:center;
  }
}
.stadium-nickname-wrapp{
  margin-bottom:10px;
  background-color:@blue;
  padding:5px 10px;
  color:#fff;
}
.stadium-info{
  padding-top:10px;
  border-top:solid 1px @border;
}
.stadium-info-list{
  &>li+li{
    margin-top:5px;
  }
}
.stadium-info-list-title{
  color:@title;
}
.stadium-info-list-data{
  a{
    text-decoration:underline;
    &:hover{
      text-decoration:none;
    }
  }
}
.stadium-head-content{
  width:400px;
  @media @lg{
    width:300px;
  }
  @media @sm{
    width:auto;
  }
}
.stadium-section{
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
.stadium-view{
  margin-bottom:25px;
}
.stadium-view-row{
  flex-wrap:wrap;
}
.stadium-view-col{
  width:50%;
  @media @md{
    width:100%;
  }
}
.stadium-map{
  height:400px;
  @media @sm{
    height:300px;
  }
}
.stadium-map /deep/ .map-content-title{
  font-family:@ff;
  font-weight:600;
  font-size:1.25rem;
  color:@blue;
  margin-bottom:5px;
}
.stadium-map /deep/ .map-content-address{
  font-family:@ff;
  color:@placeholder;
  font-size:.875rem;
}
</style>
