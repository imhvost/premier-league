<template>
  <div class="page-content">
    <div class="page-main-row flex-row">
      <div class="page-main-col page-main-col-table flex-row-item">
        <page-title
          title="Турнирная таблица"
        />
        <div class="league-table-wrapp">
          <div class="league-table-body">
            <league-table-main/>
          </div>
        </div>
        <div class="read-more-link-wrapp">
          <a
            href="/league-table"
            class="read-more-link">Полная таблица</a>
        </div>
      </div>
      <div class="page-main-col page-main-col-matches flex-row-item">
        <league-matches-main/>
        <div class="read-more-link-wrapp">
          <a
            href="/matches"
            class="read-more-link">Весь календарь Лиги</a>
        </div>
      </div>
    </div>
    <div class="main-page-content-text">
      <page-content-text
        :content-text="contentText"
        class="page-content-text"
      />
    </div>
  </div>
</template>

<script>
import LeagueTableMain from '../components/LeagueTableMain.vue'
import LeagueMatchesMain from '../components/LeagueMatchesMain.vue'
import PageContentText from '../components/PageContentText.vue'
import PageTitle from '../components/PageTitle.vue'

export default {
  components: {
    LeagueTableMain,
    LeagueMatchesMain,
    PageContentText,
    PageTitle
  },
  data () {
    return {
      contentText: `
        <p>«Премьер-лига» — наиболее известный национальный чемпионат по игре в футбол. Является высшим дивизионом в системе британских лиг. За вожделенный трофей состязаются 20 клубов Англии, однако коллективам из Уэльса также разрешено принимать участие в этой борьбе.
        <p>Предпосылкой к основанию Премьер-лиги стало существенное ослабление в этом виде спорта. Большинство стадионов пребывали в плачевном состоянии и требовали немедленной реконструкции, участились случаи хулиганства и массовых давок во время матчей, существенно снизился уровень доходов клубов, что вынуждало ведущих спортсменов играть за пределами страны.
        <p>К концу 1991 г. спортивные клубы — участники Первого дивизиона достигли соглашения о выходе из Футбольной лиги и основании нового первенства для привлечения притока денежных средств в футбол. Так, новообразованная Премьер-лига получила материальную обособленность и ушла от влияния управляющей организации — Футбольной ассоциации. Это дало возможность самостоятельно заключать контракты со спонсорами и продавать права на телевизионные трансляции матчей.
        <p>В число основателей высшего футбольного дивизиона страны вошли такие известный клубы, как «Челси», «Манчестер Юнайтед», «Эвертон», «Мидлсбро», «Ливерпуль» и т.д., всего — 22 команды. Однако, по настоятельной рекомендации ФИФА в 1995 г., число участников было сокращено до 20. Дальнейшее требование о сокращении количества клубов руководством турнира было проигнорировано.
        <p>Жизнедеятельность Премьер-лиги осуществляется в форме корпорации, с равной долей акций у каждой из 20 команд-учредителей. Все клубы наделены 1 голосом при решении ключевых организационных вопросов, таких как смена правил первенства, проведение переговоров и подписание соглашений с финансирующими компаниями. Управление поручено председателю, совету директоров и исполнительному директору.
        <p>Чемпионат проходит ежегодно с августа по май. Согласно правилам, участник должен сыграть по 38 матчей. С каждым из 19 соперников клуб встречается дважды: сначала на своей домашней арене, потом — на поле противника.
      `
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) '../less/variables.less';
.page-main-row{
  flex-wrap:wrap;
}
.page-main-col{
  width:100%;
}
.page-main-col-table{
  width:55%;
  @media @lg{
    width:60%;
  }
  @media @md{
    width:100%;
  }
}
.page-main-col-matches{
  width:45%;
  @media @lg{
    width:40%;
  }
  @media @md{
    width:100%;
  }
}
.main-page-content-text{
  margin-top:40px;
}
</style>
