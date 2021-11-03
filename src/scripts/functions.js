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
  const dropDownMenu = document.querySelector('#dropDownMenu')
  dropDownMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addClassDropDownMenu(dropDownMenu, e)
    }
  })
  dropDownMenu.addEventListener('click', (e) => {
    addClassDropDownMenu(dropDownMenu, e)
  })
}

function addClassDropDownMenu(dropDownMenu, e) {
  const arrow = document.querySelector('#arrow_dropDownMenu')
  if (dropDownMenu.className === 'dropDownMenu') {
    dropDownMenu.classList.add('dropDownMenu_active')
    arrow.classList.add('arrow_dropDownMenu_active')
  } else {
    const arrowSymbol = `<i
      id="arrow_dropDownMenu"
      class="arrow_dropDownMenu fas fa-chevron-down"
      ></i>`

    const node = e.target.nodeName === 'LI' ? e.target : e.target.parentNode
    dropDownMenu.querySelector('#arrow_dropDownMenu').remove()
    dropDownMenu.insertBefore(node, dropDownMenu.firstChild)
    dropDownMenu.firstChild.innerHTML += arrowSymbol
    dropDownMenu.classList.remove('dropDownMenu_active')
    arrow.classList.remove('arrow_dropDownMenu_active')
  }
}

export function registerClassifyMedia({ createMedias }) {
  const titleButton = document.querySelector('.title')
  titleButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      createMedias((medias) => {
        return [...medias].sort(sortArrayTitle)
      })
    }
  })
  titleButton.addEventListener('click', () => {
    createMedias((medias) => {
      return [...medias].sort(sortArrayTitle)
    })
  })
  const popularityButton = document.querySelector('.popularity')
  popularityButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      createMedias((medias) => {
        return [...medias].sort(sortArrayPopularity)
      })
    }
  })
  popularityButton.addEventListener('click', () => {
    createMedias((medias) => {
      return [...medias].sort(sortArrayPopularity)
    })
  })
  const dateButton = document.querySelector('.date')
  dateButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      createMedias((medias) => {
        return [...medias].sort(sortArrayDate)
      })
    }
  })
  dateButton.addEventListener('click', () => {
    createMedias((medias) => {
      return [...medias].sort(sortArrayDate)
    })
  })
}

function sortArrayTitle(a, b) {
  return a.title.localeCompare(b.title, 'en', {
    ignorePunctuation: true,
    sensitivity: 'base'
  })
}
function sortArrayPopularity(a, b) {
  return b.likes - a.likes
}
function sortArrayDate(a, b) {
  return b.date.localeCompare(a.date, 'en', { ignorePunctuation: true })
}
