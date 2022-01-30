
function getDataApi (name, foldel, url, time = 120) {
  // localStorage.clear()
  let json = localStorage.getItem(name)
  json = JSON.parse(json)
  if (json && new Date() - new Date(json.time) < time * 1000) {
    return new Promise(function (resolve, reject) {
      resolve(json.data)
    })
  }

  // const token = '5ea50d419a36495c8bdddfa4b027c982'
  // const option = {
  //   headers: { 'X-Auth-Token': token },
  //   method: 'GET'
  // }
  // let f = fetch(url, option)

  let body = new FormData()
  body.append('name', name)
  body.append('url', url)
  body.append('time', time)
  body.append('foldel', foldel)

  const option = {
    method: 'POST',
    body: body
  }
  // let f = fetch('http://localhost/work/pl_new/src/static/php/functions.php', option)
  let f = fetch('https://premier-league.imhvost.top/static/php/functions.php', option)

  return f.then((response) => {
    return response.json()
  })
    .then((data) => {
      let json = {
        'time': new Date(),
        'data': data
      }
      localStorage.setItem(name, JSON.stringify(json))
      return json.data
    })
    .catch((error) => {
      console.log(error)
      return null
    })
}

function getDataTeam (team, time = 120) {
  let json = localStorage.getItem(team)
  json = JSON.parse(json)
  if (json && new Date() - new Date(json.time) < time * 1000) {
    return new Promise(function (resolve, reject) {
      resolve(json.data)
    })
  }
  const option = {
    method: 'GET'
  }
  let f = fetch('/data/' + team + '/info.json', option)

  return f.then((response) => {
    return response.json()
  })
    .then((data) => {
      let json = {
        'time': new Date(),
        'data': data
      }
      localStorage.setItem(team, JSON.stringify(json))
      return json.data
    })
    .catch((error) => {
      console.log(error)
      return null
    })
}

function getDataStadium (team, stadium, time = 120) {
  let json = localStorage.getItem(stadium)
  json = JSON.parse(json)
  if (json && new Date() - new Date(json.time) < time * 1000) {
    return new Promise(function (resolve, reject) {
      resolve(json.data)
    })
  }
  const option = {
    method: 'GET'
  }
  let f = fetch('/data/' + team + '/' + stadium + '.json', option)

  return f.then((response) => {
    return response.json()
  })
    .then((data) => {
      let json = {
        'time': new Date(),
        'data': data
      }
      localStorage.setItem(stadium, JSON.stringify(json))
      return json.data
    })
    .catch((error) => {
      console.log(error)
      return null
    })
}

export default {
  api: getDataApi,
  teamInfo: getDataTeam,
  stadiumInfo: getDataStadium
}
