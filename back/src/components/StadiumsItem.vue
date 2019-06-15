<template>
  <transition
    name="fade"
    mode="out-in"
    appear
  >
    <div
      v-if="getStadiumName()"
      class="stadiums-block">
      <a
        :href="'/stadiums/'+ teamName +'/' + getStadiumName()"
        class="stadiums-block-link"/>
      <div class="stadiums-block-img">
        <img
          :src="'/data/' + teamName + '/' + getStadiumName() + '.jpg'"
          :alt="teamInfo.stadium">
      </div>
      <div class="stadiums-block-content">
        <div class="stadiums-block-title">{{ teamInfo.stadium }}</div>
        <div class="stadiums-block-name">({{ teamInfo.stadiumEn }})</div>
        <div class="stadiums-block-team-logo">
          <img
            :src="'/data/' + teamName + '/' + teamName + '.svg'"
            :alt="translateTeamName"
            height="60">
        </div>
        <div class="stadiums-block-team-title">{{ translateTeamName }}</div>
        <div class="stadiums-block-team-name">({{ team.name }})</div>
      </div>
    </div>
    <div
      v-else
      class="loading-block loading-block-stadiums-block"/>
  </transition>
</template>

<script>
import Team from '../js/team.js'
import GetData from '../js/get-data.js'

export default {
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
    getStadiumName () {
      if (!this.teamInfo) return false
      return Team.getStadiumName(this.teamInfo.stadiumEn)
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.loading-block-stadiums-block{
  height:411px;
}
.stadiums-block{
  position:relative;
  width:250px;
  max-width:100%;
  margin:auto;
  flex:auto;
  font-weight:600;
  border:5px solid #eee;
  transition:.2s;
  background:#fff;
  text-align:center;
  &:hover{
    border-color:@blue;
  }
}
.stadiums-block-link{
  position:absolute;
  top:-5px;
  right:-5px;
  bottom:-5px;
  left:-5px;
  z-index:6;
}
.stadiums-block-img{
  height:240px;
  overflow:hidden;
  position:relative;
  img{
    display:block;
    height:100%;
    position:absolute;
    left:50%;
    max-width:none;
    transform:translateX(-50%);
  }
}
.stadiums-block-content{
  padding:80px 10px 10px;
  background:linear-gradient(to bottom,rgba(255,255,255,0) 0,#fff 100px);
  margin-top:-100px;
  position:relative;
  z-index:1;
}
.stadiums-block-title{
  font-size:1.5rem;
  font-weight:600;
}
.stadiums-block-name{
  margin-bottom:10px;
}
.stadiums-block-team-logo{
  height:60px;
  margin-bottom:10px;
  display:flex;
  align-items:center;
  flex-direction:column;
  justify-content:center;
  font-size:0;
  img{
    max-height:100%;
  }
}
.stadiums-block-team-title{
  font-size:1.25rem;
  font-weight:600;
}
</style>
