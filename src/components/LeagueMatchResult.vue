<template>
  <div class="league-match-result">
    <div
      v-if="score.winner"
      class="league-match-result-full">
      <b v-if="score.winner === 'HOME_TEAM'">{{ score.fullTime.homeTeam }}</b>
      <span v-else>{{ score.fullTime.homeTeam }}</span>
      <span>-</span>
      <b v-if="score.winner === 'AWAY_TEAM'">{{ score.fullTime.awayTeam }}</b>
      <span v-else>{{ score.fullTime.awayTeam }}</span>
    </div>
    <div
      v-if="score.extraTime.homeTeam || score.extraTime.awayTeam"
      class="league-match-result-extra">
      ДВ
    </div>
    <div
      v-if="score.penalties.homeTeam || score.penalties.awayTeam"
      class="league-match-result-extra">
      ({{ score.penalties.homeTeam }}:{{ score.penalties.awayTeam }})
    </div>
    <div
      v-if="inPlay"
      class="league-match-in-play-info"
      title="Идет игра"/>
    <div
      v-if="inPaused"
      class="league-match-in-paused-info"
      title="Перерыв"/>
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Object,
      required: true
    },
    inPlay: {
      type: Boolean,
      required: false,
      default: false
    },
    inPaused: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.league-match-result{
  display:flex;
  white-space:nowrap;
  align-items:center;
  @media @xs{
    justify-content:center;
  }
}
.league-match-in-play-info,
.league-match-in-paused-info{
  width:5px;
  height:5px;
  min-width:5px;
  margin:0 -15px 0 10px;
  border-radius:50%;
  border:solid 1px;

  position:relative;
  background-color:currentColor;
  &:before,
  &:after{
    content:'';
    position:absolute;
    left:-1px;
    right:-1px;
    top:-1px;
    bottom:-1px;
    border-radius:50%;
    border:solid 1px;
  }
  &:before{
    animation:in-play 4s infinite;

  }
  &:after{
    animation:in-play 4s 2s infinite;
  }
}
.league-match-in-play-info{
  color:@green;
}
.league-match-in-paused-info{
  color:@yellow;
}
@keyframes in-play{
  0%{
    transform:scale(1);
    opacity:1;
  }
  100%{
    transform:scale(4);
    opacity:0;
  }
}
.league-match-result-extra{
  font-size:.75rem;
  color:@placeholder;
  margin-left:2px;
}
</style>
