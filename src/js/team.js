function translateTeamName (teamName) {
  teamName = teamName.toLowerCase()
  switch (teamName) {
    case 'chelsea fc': return 'Челси'
    case 'tottenham hotspur fc': return 'Тоттенхэм Хотспур'
    case 'manchester city fc': return 'Манчестер Сити'
    case 'arsenal fc': return 'Арсенал'
    case 'liverpool fc': return 'Ливерпуль'
    case 'manchester united fc': return 'Манчестер Юнайтед'
    case 'everton fc': return 'Эвертон'
    case 'west bromwich albion fc': return 'Вест Бромвич Альбион'
    case 'west ham united fc': return 'Вест Хэм Юнайтед'
    case 'watford fc': return 'Уотфорд'
    case 'stoke city fc': return 'Сток Сити'
    case 'burnley fc': return 'Бёрнли'
    case 'southampton fc': return 'Саутгемптон'
    case 'afc bournemouth': return 'Борнмут'
    case 'leicester city fc': return 'Лестер Сити'
    case 'swansea city fc': return 'Суонси Сити'
    case 'crystal palace fc': return 'Кристал Пэлас'
    case 'middlesbrough fc': return 'Мидлсбро'
    case 'hull city fc': return 'Халл Сити'
    case 'sunderland afc': return 'Сандерленд'
    case 'brighton & hove albion fc': return 'Брайтон энд Хоув Альбион'
    case 'huddersfield town afc': return 'Хаддерсфилд Таун'
    case 'newcastle united fc': return 'Ньюкасл Юнайтед'
    case 'wolverhampton wanderers fc': return 'Вулверхэмптон'
    case 'fulham fc': return 'Фулхэм'
    case 'cardiff city fc': return 'Кардифф Сити'
  }
}

function getTeamName (teamName) {
  teamName = teamName.toLowerCase()
  teamName = teamName.replace(/[^a-zA-Z ]/g, '')
  teamName = teamName.replace(/\s+/g, '-')
  return teamName
}

function getStadiumName (stadiumName) {
  stadiumName = stadiumName.toLowerCase()
  stadiumName = stadiumName.replace(/[^a-zA-Z ]/g, '')
  stadiumName = stadiumName.replace(/\s+/g, '-')
  return stadiumName
}

function getTeamNickname (nickname) {
  nickname = nickname.replace(/\(/g, '<i>(')
  nickname = nickname.replace(/\)/g, ')</i>')
  return nickname
}

function getTeamNicknameFirst (nickname) {
  return nickname.split(' (')[0] || nickname.split('(')[0]
}

function sort (teams) {
  return teams.sort(function (a, b) {
    if (translateTeamName(a.name) < translateTeamName(b.name)) return -1
    if (translateTeamName(a.name) > translateTeamName(b.name)) return 1
    return 0
  })
}

export default {
  translateTeamName: translateTeamName,
  getTeamName: getTeamName,
  getStadiumName: getStadiumName,
  getTeamNickname: getTeamNickname,
  getTeamNicknameFirst: getTeamNicknameFirst,
  sort: sort
}
