<template>
  <div
    v-if="list.length > 1"
    class="matches-select-block">
    <div class="matches-select-block-title">{{ title }}</div>
    <div class="matches-select">
      <div class="matches-select-title">{{ selected ? getSelectedText(selected) : 'Все' }}</div>
      <select
        v-model="selected"
        @change="getFilter(selected)">
        <option
          value="">Все</option>
        <option
          v-for="(item, index) in list"
          :key="index"
          :value="item.value">
          {{ item.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selected: ''
    }
  },
  methods: {
    getSelectedText (value) {
      for (let i = 0; i < this.list.length; i++) {
        const element = this.list[i]
        if (element.value === value) return element.name
      }
    },
    getFilter (value) {
      this.$emit('filter', value)
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.matches-select-block{
  @media @md_{
    display:flex;
    align-items:center;
  }
}
.matches-select-block-title{
  margin-bottom:5px;
  font-weight:700;
  flex:auto;
  min-width:1px;
  @media @md_{
    text-align:right;
    margin:0 10px 0 0;
  }
}
.matches-select{
  width:200px;
  min-width:200px;
  position:relative;
  background-color:#fff;
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding:0 25px 0 12px;
  height:35px;
  color:@text;
  @media @sm{
    width:100%;
    min-width:auto;
  }
  select{
    position:absolute;
    left:0;
    top:0;
    opacity:0;
    cursor:pointer;
    width:100%;
    height:100%;
  }
  &:after{
    content:'';
    position:absolute;
    right:12px;
    top:50%;
    margin-top:-5px;
    width:6px;
    height:6px;
    border-right:solid 1px;
    border-bottom:solid 1px;
    transform:rotate(45deg);
  }
}
.matches-select-title{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
</style>
