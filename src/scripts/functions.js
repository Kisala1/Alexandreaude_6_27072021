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
  const arrow = document.querySelector('#arrow_dropDownMenu')
  // document.addEventListener('keyup', e => {
  //   if (e.key === 'Enter')
  // })
  dropDownMenu.addEventListener('click', (e) => {
    if (dropDownMenu.className === 'dropDownMenu') {
      dropDownMenu.classList.add('dropDownMenu_active')
      arrow.classList.add('arrow_dropDownMenu_active')
    } else {
      const arrowSymbol = `<i
      id="arrow_dropDownMenu"
      class="arrow_dropDownMenu fas fa-chevron-down"
      tabindex="0"
      role="button"
      ></i>`

      dropDownMenu.querySelector('#arrow_dropDownMenu').remove()
      dropDownMenu.insertBefore(e.target, dropDownMenu.firstChild)
      dropDownMenu.firstChild.innerHTML += arrowSymbol
      dropDownMenu.classList.remove('dropDownMenu_active')
      arrow.classList.remove('arrow_dropDownMenu_active')
    }
  })
}

export function registerClassifyMedia({ createMedias }) {
  const titleButton = document.querySelector('.title')
  titleButton.addEventListener('click', () => {
    function sortArrayTitle(a, b) {
      return a.title.localeCompare(b.title, 'en', {
        ignorePunctuation: true,
        sensitivity: 'base'
      })
    }
    createMedias((medias) => {
      return [...medias].sort(sortArrayTitle)
    })
  })
  const popularityButton = document.querySelector('.popularity')
  popularityButton.addEventListener('click', () => {
    function sortArrayPopularity(a, b) {
      return b.likes - a.likes
    }
    createMedias((medias) => {
      return [...medias].sort(sortArrayPopularity)
    })
  })
  const dateButton = document.querySelector('.date')
  dateButton.addEventListener('click', () => {
    function sortArrayDate(a, b) {
      return b.date.localeCompare(a.date, 'en', { ignorePunctuation: true })
    }
    createMedias((medias) => {
      return [...medias].sort(sortArrayDate)
    })
  })
}
