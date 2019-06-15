function sticky () {
  window.addEventListener('load', sticked, false)
  window.addEventListener('resize', sticked, false)
  window.addEventListener('scroll', sticked, false)
  function sticked () {
    const sidebar = document.querySelector('.sticky-sidebar-body')
    if (!sidebar) return
    const wrapp = document.querySelector('.sticky-sidebar-wrapp')
    const width = wrapp.offsetWidth
    const height = wrapp.offsetHeight
    const scroll = document.querySelector('html').scrollTop
    const bounding = wrapp.getBoundingClientRect()
    const left = bounding.left
    const top = bounding.top + scroll

    wrapp.style.width = width + 'px'
    wrapp.style.height = height + 'px'

    if (scroll >= top) {
      sidebar.style.position = 'fixed'
      sidebar.style.left = left + 'px'
      sidebar.style.top = 0
    } else {
      sidebar.style.position = 'static'
    }
  }
}

export default {
  sticky: sticky
}
