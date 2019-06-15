<template>
  <div class="team-list-item">
    <a
      :href="'/teams/team/' + teamName"
      class="team-list-item-link"/>
    <div class="team-list-item-imgs-wrapp">
      <div class="team-list-item-imgs">
        <div class="team-list-item-img team-list-item-logo">
          <img
            :src="'/data/'+ teamName +'/' + teamName + '.svg'"
            :alt="translateTeamName"
            width="150">
        </div>
        <div class="team-list-item-img team-list-item-kit">
          <img
            v-if="!awayKit"
            :src="'/data/'+ teamName +'/home-kit.png'"
            :alt="translateTeamName + ' - форма'">
          <img
            v-else
            :src="'/data/'+ teamName +'/away-kit.png'"
            :alt="translateTeamName + ' - форма'">
        </div>
      </div>
    </div>
    <template v-if="!isMatch">
      <div class="team-list-item-title">{{ translateTeamName }}</div>
      <div class="team-list-item-name">{{ team.name }}</div>
    </template>
  </div>
</template>

<script>
import Team from '../js/team.js'

export default {
  props: {
    team: {
      type: Object,
      required: true
    },
    isMatch: {
      type: Boolean,
      required: false,
      default: false
    },
    awayKit: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    teamName () {
      return Team.getTeamName(this.team.name)
    },
    translateTeamName () {
      return Team.translateTeamName(this.team.name)
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.team-list-item{
  position:relative;
  width:150px;
  margin:auto;
  text-align:center;
  &:hover{
    .team-list-item-imgs{
      transform:translateZ(-85px) rotateX(90deg);
      -ms-transform:none;
    }
    .team-list-item-img{
      &:after{
        background-color:@link;
      }
    }
  }
}
.team-list-item-link{
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  z-index:1;
}
.team-list-item-imgs-wrapp{
  height:170px;
  display:block;
  perspective:500px;
}
.team-list-item-imgs{
  transform-style:preserve-3d;
  transform:translateZ(-85px);
  -ms-transform:none;
  position:relative;
  display:block;
  height:100%;
  transition:.4s;
}
.team-list-item-img{
  top:0;
  right:0;
  bottom:0;
  left:0;
  display:flex;
  position:absolute;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  transform:translateZ(85px);
  -ms-transform:none;
  backface-visibility:hidden;
  padding-bottom:20px;
  font-size:0;
  &:after{
    content:'';
    position:absolute;
    width:80px;
    height:2px;
    left:50%;
    margin-left:-40px;
    bottom:0;
    background:@blue;
  }
  img{
    max-height:100%;
  }
}
.team-list-item-kit{
  transform:rotateX(-90deg) translateZ(85px);
}
.team-list-item-title{
  font-size:1.5rem;
  margin:10px 0 5px;
  line-height:1.2;
  font-weight:700;
}
.team-list-item-name{
  font-style:italic;
  font-weight:700;
  text-decoration:underline;
}
</style>
