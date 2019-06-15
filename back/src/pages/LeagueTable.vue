<template>
  <div class="page-content">
    <page-title
      title="Турнирная таблица"
    />
    <ul class="league-table-nav tabs-nav">
      <router-link
        tag="li"
        to="/league-table/total"
      >
        <a>
          <b>Полная</b>
        </a>
      </router-link>
      <router-link
        tag="li"
        to="/league-table/home"
      >
        <a>
          <b>Дома</b>
        </a>
      </router-link>
      <router-link
        tag="li"
        to="/league-table/away"
      >
        <a>
          <b>В гостях</b>
        </a>
      </router-link>
    </ul>
    <transition
      name="fade"
      mode="out-in"
      appear
    >
      <router-view/>
    </transition>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'

export default {
  components: {
    PageTitle
  }
}
</script>

<style lang="less" scoped>
.league-table-nav{
  max-width:400px;
}
</style>
