<template>
  <div class="wrapper">
    <header class="header">
      <div class="container">
        <div class="header-row flex-row">
          <div class="header-col header-col-logo flex-row-item">
            <a
              href="/"
              class="header-logo">
              <img
                src="/static/img/logo.svg"
                alt="premier-league.xyz"
                width="240">
            </a>
          </div>
          <div class="header-col header-col-content flex-row-item">
            <div class="header-widgets">
              <div class="header-widget">
                <ul class="social-list">
                  <li><span>Поделиться:</span></li>
                  <li><a
                    :href="'https://vk.com/share.php?url=' + location + '&description=' + description"
                    target="_blank"
                    class="icon-vkontakte-rect"/></li>
                  <li><a
                    :href="'https://www.facebook.com/sharer/sharer.php?u=' + location"
                    target="_blank"
                    class="icon-facebook-rect"/></li>
                  <li><a
                    :href="'https://twitter.com/intent/tweet?url=' + location + '&text=' + description"
                    target="_blank"
                    class="icon-twitter-bird"/></li>
                  <!-- <li><a
                    :href="'https://plus.google.com/share?url=' + location"
                    target="_blank"
                    class="icon-googleplus-rect"/></li> -->
                  <li><a
                    :href="'https://connect.ok.ru/dk?st.cmd=OAuth2Login&st.layout=w&st.redirect=%252Fdk%253Fcmd%253DWidgetSharePreview%2526amp%253Bst.cmd%253DWidgetSharePreview%2526amp%253Bst.shareUrl='+ location +'&st.client_id=-1'"
                    target="_blank"
                    class="icon-odnoklassniki-rect"/></li>
                </ul>
              </div>
              <div class="header-widget">
                <div class="header-time">
                  <i class="icon-clock"/>
                  {{ date }} <b>{{ time }}</b>
                </div>
              </div>
            </div>
            <div class="header-nav">
              <div class="header-menu-wrapp">
                <a
                  href="#"
                  class="header-menu-close"
                  @click.prevent="closeMenu"/>
                <div class="header-menu-body">
                  <ul class="header-menu">
                    <router-link
                      exact
                      tag="li"
                      to="/"
                      @click="closeMenu">
                      <a>Главная</a>
                    </router-link>
                    <router-link
                      tag="li"
                      to="/league-table"
                      @click="closeMenu">
                      <a>Турнирная таблица</a>
                    </router-link>
                    <router-link
                      tag="li"
                      to="/matches"
                      @click="closeMenu">
                      <a>Календарь</a>
                    </router-link>
                    <router-link
                      tag="li"
                      to="/teams"
                      @click="closeMenu">
                      <a>Команды</a>
                    </router-link>
                    <router-link
                      tag="li"
                      to="/stadiums"
                      @click="closeMenu">
                      <a>Стадионы</a>
                    </router-link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="header-col header-col-menu-open flex-row-item">
            <a
              href="#"
              class="header-menu-open"
              @click.prevent="openMenu"/>
          </div>
        </div>
      </div>
    </header>
    <div class="page">
      <div class="container">
        <transition
          name="fade"
          mode="out-in"
          appear
        >
          <router-view/>
        </transition>
      </div>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="footer-row flex-row">
          <div class="footer-col flex-row-item">
            <div class="copyright">&copy; 2016 - {{ $root.currentSeason.split('/')[1] }}</div>
          </div>
          <div class="footer-col flex-row-item">
            <ul class="footer-menu">
              <router-link
                exact
                tag="li"
                to="/rules">
                <a>Правила</a>
              </router-link>
              <router-link
                exact
                tag="li"
                to="/contacts">
                <a>Контакты</a>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('ru')

document.querySelector('body').addEventListener('click', (event) => {
  if (!document.querySelector('html').classList.contains('header-menu-opened')) return
  if (event.target.closest('.header-menu a')) {
    closeMenu()
    return
  }
  if (event.target.closest('.header-menu-open, .header-menu-close, .header-menu-body')) return
  closeMenu()
}, false)

function closeMenu () {
  document.querySelector('html').classList.remove('header-menu-is-open')
  setTimeout(() => {
    document.querySelector('html').classList.remove('header-menu-opened')
  }, 400)
}

export default {
  data () {
    return {
      date: moment(new Date()).format('DD MMM YYYY'),
      time: moment(new Date()).format('HH:mm'),
      location: location.href,
      description: 'Английская Премьер Лига ' + this.$root.currentSeason + ' - Таблица - Расписание - Результаты - Команды'
    }
  },
  methods: {
    openMenu () {
      document.querySelector('html').classList.add('header-menu-opened', 'header-menu-is-open')
    },
    closeMenu: closeMenu
  }
}
</script>

<style lang="less" scoped>
@import (less) './less/variables.less';
.wrapper{
  display:flex;
  flex-direction:column;
  flex:auto;
}
.header{
  padding:10px 0;
  position:relative;
  z-index:666;
  @media @sm{
    border-bottom:solid 5px @link;
  }
}
.header-row{
  align-items:flex-end;
  @media @sm{
    align-items:center;
  }
}
.header-logo{
  display:block;
  @media @md{
    width:180px;
  }
  @media @xs{
    width:120px;
  }
  img{
    display:block;
  }
}
.header-col-content{
  flex:auto;
  min-width:1px;
}
.header-nav{
  position:relative;
  background-color:@link;
  @media @sm_{
    margin-bottom:15px;
    &:after{
      content:'';
      left:100%;
      top:0;
      bottom:0;
      width:1000000px;
      background-color:@red;
    }
  }
  &:after{
    content:'';
    position:absolute;
    left:100%;
    top:0;
    bottom:0;
    background-color:@link;
  }
}
.header-menu-wrapp{
  @media @sm{
    position:fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    z-index:666;
    background-color:rgba(255,255,255,.9);
    opacity:0;
    visibility:hidden;
  }
}
.header-menu-body{
  @media @sm{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    width:260px;
    background-color:@link;
    overflow:hidden;
    overflow-y:auto;
    padding:20px 0;
    transform:translateX(-100%);
  }
}
.header-menu{
  color:#fff;
  @media @sm_{
    display:flex;
  }
  &>li{
    &>a{
      display:block;
      color:inherit;
      padding:5px 15px;
      transition:.2s;
      @media @sm{
        padding:7px 20px;
      }
      &:hover{
        background-color:@linkHover;
      }
    }
    &.router-link-active{
      background-color:@linkHover;
    }
  }
}
.header-widgets{
  display:flex;
  flex-direction:column;
  align-items:flex-end;
  @media @sm_{
    margin-bottom:10px;
  }
}
.header-widget{
  margin-bottom:5px;
  &:last-child{
    margin-bottom:0;
  }
}
.social-list{
  display:flex;
  margin:0 -4px -5px;
  font-size:1.125rem;
  align-items:center;
  li{
    padding:0 5px 5px;
    &:first-child{
      @media @xs{
        display:none;
      }
    }
  }
  a{
    display:block;
    color:@blue;
    transform-origin:center bottom;
    &:hover{
      animation:social-list .4s;
    }
    &:before{
      width:auto;
      margin:0;
    }
    &.icon-twitter-bird{
      font-size:.9em;
    }
  }
  span{
    font-size:.875rem;
    display:block;
    line-height:1;
  }
}
@keyframes social-list{
  20%{
    transform:rotate(8deg);
  }
  40%{
    transform:rotate(-6deg);
  }
  60%{
    transform:rotate(4deg);
  }
  80%{
    transform:rotate(-2deg);
  }
  100%{
    transform:rotate(0);
  }
}
.header-time{
  font-size:.875rem;
  white-space:nowrap;
  b{
    font-size:1.1em;
  }
}
.header-col-menu-open{
  @media @sm_{
    display:none;
  }
}
.header-menu-open{
  display:block;
  width:26px;
  height:16px;
  color:@text;
  border-top:solid 2px;
  border-bottom:solid 2px;
  position:relative;
  &:after{
    content:'';
    position:absolute;
    left:0;
    right:0;
    top:50%;
    margin-top:-1px;
    height:2px;
    background-color:currentColor;
  }
}
.header-menu-close{
  position:absolute;
  top:25px;
  left:287px;
  width:20px;
  height:20px;
  color:@text;
  @media @sm_{
    display:none;
  }
  &:before,
  &:after{
    content:'';
    position:absolute;
    height:2px;
    left:0;
    right:0;
    top:50%;
    margin-top:-1px;
    background-color:currentColor;
  }
  &:before{
    transform:rotate(45deg);
  }
  &:after{
    transform:rotate(-45deg);
  }
}
.header-menu-opened{
  @media @lg{
    .header-menu-wrapp{
      transition:opacity .4s, visibility .4s;
    }
    .header-menu-body{
      transition:.4s;
    }
  }
}
.header-menu-is-open{
  @media @lg{
    overflow-y:hidden;
    .header-menu-wrapp{
      visibility:visible;
      opacity:1;
    }
    .header-menu-body{
      transform:translateX(0);
    }
  }
}
.footer{
  padding:10px 0;
  background-color:@text;
  margin-top:auto;
  color:@placeholder;
}
.footer-menu{
  display:flex;
  line-height:1;
  li{
    &:not(:last-child){
      margin-right:10px;
      padding-right:10px;
      border-right:solid 1px;
    }
  }
  a{
    color:inherit;
    transition:.2s;
    display:block;
    padding:5px;
    margin:-5px;
    &:hover{
      color:#fff;
    }
  }
}
</style>
