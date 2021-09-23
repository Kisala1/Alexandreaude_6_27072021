
// Permet de récupérer l'id du photographe sur son profil

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const idPhotograph = parseInt(urlParams.get('id'))

fetch('../../data/fisheyeData.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status)
    }
    return response.json()
  })
  .then((data) => {
    // find renvoie le 1er élement trouvé
    // Récupère l'id associé au photographe correspondant
    const photographer = data.photographers.find(elt => elt.id === idPhotograph)
    // console.log(photographer)
    profilTemplatePhotographer(photographer)
    dropDownMenu()
  })
  .catch((error) => {
    console.error(error)
  })

// =========================================================
// Fonction modèle-type page de profil d'un photogrgaphe
// =========================================================

function profilTemplatePhotographer (photographer) {
  const profilPhotographerList = document.getElementById('details_profil_photographer')
  const profilPhotographerElementTemplate = document.getElementById('details_profil_photographer_element')
  const elt = document.importNode(profilPhotographerElementTemplate.content, true)
  const imgProfil = elt.querySelector('.portrait')

  elt.querySelector('.name').textContent = photographer.name
  imgProfil.src = '../../data/Portraits/' + photographer.portrait
  imgProfil.alt = photographer.name
  elt.querySelector('.lieu').textContent = photographer.city + ', ' + photographer.country
  elt.querySelector('.tagline').textContent = photographer.tagline

  const tags = elt.querySelector('.tags')
  for (let i = 0; i < photographer.tags.length; i++) {
    const tag = document.createElement('span')
    tag.textContent = '#' + photographer.tags[i]
    tags.appendChild(tag)
  }

  elt.querySelector('.price').textContent = photographer.price + '€ / jour'
  profilPhotographerList.appendChild(elt)
}

/**
 * Permet de dérouler le menu au clic sur la flèche
 */

function dropDownMenu () {
  const arrow = document.querySelector('.arrow')
  const menuFilter = document.querySelector('.menu_filter')
  arrow.addEventListener('click', () => {
    arrow.style.transform = 'rotate(180deg)'
    arrow.style.transition = 'all 0.2s linear'
    menuFilter.style.boxShadow = '0px 3px 3px 1px rgba(0,0,0,0.3)'
    menuFilter.style.transition = 'max-height 0.2s linear'
    menuFilter.style.maxHeight = '123px'
  })
}
