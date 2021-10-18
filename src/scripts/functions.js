export function getPhotographerId() {
  // Permet de récupérer l'id du photographe sur son profil
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return parseInt(urlParams.get('id'))
}

/**
 * Permet de dérouler le menu au clic sur la flèche
 *
 */

export function dropDownMenu() {
  const arrow = document.querySelector('#arrow_dropDownMenu')
  const dropDownMenu = document.querySelector('#dropDownMenu')
  arrow.addEventListener('click', () => {
    if (dropDownMenu.className === 'dropDownMenu') {
      dropDownMenu.classList.add('dropDownMenu_active')
      arrow.classList.add('arrow_dropDownMenu_active')
    } else {
      dropDownMenu.classList.remove('dropDownMenu_active')
      arrow.classList.remove('arrow_dropDownMenu_active')
    }
  })
}
export function classifyMedia() {
  const titleButton = document.querySelector('.title')
  titleButton.addEventListener('click', () => {
    function sortArrayTitle(a, b) {
      return a.title.localeCompare(b.title, 'en', {
        ignorePunctuation: true,
        sensitivity: 'base'
      })
    }
  })
  const popularityButton = document.querySelector('.popularity')
  popularityButton.addEventListener('click', () => {
    function sortArrayTitle(a, b) {
      return b.likes - a.likes
    }
  })
  const dateButton = document.querySelector('.date')
  dateButton.addEventListener('click', () => {
    function sortArrayTitle(a, b) {
      return parseInt(b.date.localeCompare(a.date, { ignorePunctuation: true }))
    }
  })
}
