import { trapModal } from './form.js'

/**
 * Retourne url adéquat avec l'id
 * @returns
 */
export function getPhotographerId() {
  // Permet de récupérer l'id du photographe sur son profil
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return parseInt(urlParams.get('id'))
}

/**
 * Permet de dérouler le menu au clic sur ul
 *
 */
export function dropDownMenu() {
  const liVoid = document.querySelector('.li_void')
  const dropDownMenu = document.querySelector('#dropDownMenu')
  dropDownMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addClassDropDownMenu(dropDownMenu, e, liVoid)
    }
  })
  dropDownMenu.addEventListener('click', (e) => {
    addClassDropDownMenu(dropDownMenu, e, liVoid)
  })
}

/**
 * Enregistre la function pour ajouter les class pour dérouler / réduire dropDownMenu
 *
 * @param {HTMLElement} ul dropDownMenu
 * @param {Event} e
 * @param {HTMLElement} li liVoid
 */
function addClassDropDownMenu(dropDownMenu, e, liVoid) {
  const titleButton = document.querySelector('.title')
  const popularityButton = document.querySelector('.popularity')
  const dateButton = document.querySelector('.date')
  const arrow = document.querySelector('#arrow_dropDownMenu')
  if (dropDownMenu.className === 'dropDownMenu') {
    dropDownMenu.classList.add('dropDownMenu_active')
    arrow.classList.add('arrow_dropDownMenu_active')
    liVoid.classList.add('li_void_active')
    titleButton.setAttribute('tabindex', '0')
    popularityButton.setAttribute('tabindex', '0')
    dateButton.setAttribute('tabindex', '0')
    trapModal(dropDownMenu)
  } else {
    const arrowSymbol = `<i
      id="arrow_dropDownMenu"
      class="arrow_dropDownMenu fas fa-chevron-down"
      ></i>`
    liVoid.style.display = 'none'
    const node = e.target.nodeName === 'LI' ? e.target : e.target.parentNode
    dropDownMenu.querySelector('#arrow_dropDownMenu').remove()
    dropDownMenu.insertBefore(node, dropDownMenu.firstChild)
    dropDownMenu.firstChild.innerHTML += arrowSymbol
    dropDownMenu.classList.remove('dropDownMenu_active')
    arrow.classList.remove('arrow_dropDownMenu_active')
    titleButton.removeAttribute('tabindex')
    popularityButton.removeAttribute('tabindex')
    dateButton.removeAttribute('tabindex')
  }
}

/**
 * Enregistre les méthodes de classement les medias en cliquant sur les boutons du dropDownMenu
 *
 * @param {*} function createMedias
 */
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
/**
 * Fonction qui trie par ordre alphabétique
 * @param {*} a media
 * @param {*} b media
 * @returns
 */
function sortArrayTitle(a, b) {
  return a.title.localeCompare(b.title, 'en', {
    ignorePunctuation: true,
    sensitivity: 'base'
  })
}
/**
 * Fonction qui trie par nombre de likes
 * @param {*} a media
 * @param {*} b media
 * @returns
 */
function sortArrayPopularity(a, b) {
  return b.likes - a.likes
}
/**
 * Fonction qui trie par ordre chronologique
 * @param {*} a media
 * @param {*} b media
 * @returns
 */
function sortArrayDate(a, b) {
  return b.date.localeCompare(a.date, 'en', { ignorePunctuation: true })
}
