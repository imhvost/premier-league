<template>
  <h1
    v-if="!tag"
    class="page-title">
    Английская Премьер Лига <span>{{ startYear }}/{{ endYear }}</span>.
    <template v-if="title">
      {{ title }}.
    </template>
  </h1>
  <div
    v-else
    class="page-title">
    Английская Премьер Лига <span>{{ startYear }}/{{ endYear }}</span>.
    <template v-if="title">
      {{ title }}.
    </template>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    season: {
      type: String,
      required: false,
      default: ''
    },
    tag: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    getSeason () {
      return this.season || this.$root.currentSeason
    },
    startYear () {
      return this.getSeason.split('/')[0]
    },
    endYear () {
      return this.getSeason.split('/')[1]
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.page-title{
  font-weight:600;
}
h1.page-title{
  font-size:1.5rem;
  margin-bottom:20px;
}
div.page-title{
  span{
    color:@red;
  }
}
</style>
