<template>
  <div class="match-date">
    <svg
      fill="#000000"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    ><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/><path
      d="M0 0h24v24H0z"
      fill="none"/></svg>
    <div class="match-date-main">
      {{ dateString }} {{ time }}
    </div>
    <div class="match-date-day">
      {{ day }}
    </div>
  </div>
</template>

<script>
import moment from 'moment'

moment.locale('ru')

export default {
  props: {
    date: {
      type: String,
      required: true
    }
  },
  computed: {
    dateString () {
      return moment(this.date).format('DD MMMM YYYY')
    },
    time () {
      return moment(this.date).format('HH:mm')
    },
    day () {
      return moment(this.date).format('dddd')
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.match-date{
  position:relative;
  margin-bottom:15px;
  font-weight:600;
  line-height:1.2;
  display:inline-block;
  text-align:left;
  padding-left:30px;
  position:relative;
  font-style:italic;
  font-size:.875rem;
  svg{
    position:absolute;
    left:0;
    top:50%;
    margin-top:-12px;
  }
}
</style>
