<template>
  <div class="content-text-wrapp">
    <div
      :class="{ active: isActive }"
      class="content-text-body">
      <div
        class="content-text"
        v-html="contentText"/>
    </div>
    <div class="content-text-toggle-link-wrapp">
      <a
        :class="{ active: isActive }"
        href="#"
        class="content-text-toggle-link"
        @click.stop.prevent="toggleActive()">Читать дальше</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contentText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    toggleActive () {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.content-text-body{
  @media @sm{
    position:relative;
    height:250px;
    overflow:hidden;
    &:after{
      content:'';
      position:absolute;
      height:100px;
      left:0;
      right:0;
      bottom:0;
      background-image:linear-gradient(to top,#fff,rgba(255,255,255,0));
    }
    &.active{
      height:auto;
      &:after{
        display:none;
      }
    }
  }
}
.content-text-toggle-link-wrapp{
  padding-top:20px;
  display:flex;
  flex-direction:column;
  align-items:center;
  @media @sm_{
    display:none;
  }
}
.content-text-toggle-link{
  display:inline-block;
  padding-right:20px;
  position:relative;
  color:inherit;
  text-decoration:underline;
  &:after{
    content:'';
    position:absolute;
    width:8px;
    height:8px;
    right:1px;
    top:50%;
    margin-top:-6px;
    border-right:solid 1px;
    border-bottom:solid 1px;
    transform:rotate(45deg);
    transition:.2s;
  }
  &.active{
    &:after{
      transform:rotate(225deg);
      margin-top:-1px;
    }
  }
}
</style>
