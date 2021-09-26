// Permet de récupérer l'id du photographe sur son profil

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const idPhotograph = parseInt(urlParams.get('id'))

fetch('/data/fisheyeData.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status)
    }
    return response.json()
  })
  .then((data) => {
    addMediaToPhotographProfil(data.photographers, data.media)
    dropDownMenu()

    const modalForm = document.getElementById('modal_form')
    const buttonProfil = document.querySelector('.buttonProfil')
    const sendButton = document.querySelector('.btn_send')
    const crossModalTitle = document.querySelector('.cross')
    addModal(modalForm, buttonProfil, sendButton, crossModalTitle)
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
  const button = document.createElement('button')
  const name = elt.querySelector('.name')

  name.textContent = photographer.name
  button.textContent = 'Contactez-moi'
  button.className = 'buttonProfil'
  imgProfil.src = '/data/Photographers_ID_Photos/' + photographer.portrait
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
  name.appendChild(button)
  profilPhotographerList.appendChild(elt)
}

/**
 * Permet d'afficher les médias dans le profil du photographe
 *
 * @param {Array} Array : data.photographers
 * @param {Array} Array : data.medias
 */

function addMediaToPhotographProfil (photographers, medias) {
  // find renvoie le 1er élement trouvé
  // Récupère l'id associé au photographe correspondant
  const photographer = photographers.find(elt => elt.id === idPhotograph)
  profilTemplatePhotographer(photographer)
  // Retourne un tableau avec les médias correspondant à l'Id à ce photographe
  const mediaPhotographs = medias.filter(elt => elt.photographerId === idPhotograph)

  const containerImg = document.querySelector('.container_img')
  for (const mediaPhotograph of mediaPhotographs) {
    const figure = document.createElement('figure')
    const img = document.createElement('img')
    img.src = '/data/' + idPhotograph + '/' + mediaPhotograph.image
    img.alt = mediaPhotograph.title
    const figcaption = document.createElement('figcaption')

    const titleImage = document.createElement('span')
    titleImage.className = 'title_image' /* A ENLEVER SI NON UTILISE */
    titleImage.textContent = mediaPhotograph.title

    const likeImage = document.createElement('span')
    likeImage.className = 'like_image'
    likeImage.textContent = '12 '

    containerImg.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(figcaption)
    figcaption.appendChild(titleImage)
    figcaption.appendChild(likeImage)
  }
}

/**
 * Permet de dérouler le menu au clic sur la flèche
 *
 */

function dropDownMenu () {
  const arrow = document.querySelector('.arrow')
  const menuFilter = document.querySelector('.menu_filter')
  arrow.addEventListener('click', () => {
    if (menuFilter.style.maxHeight === '40px') {
      arrow.style.transform = 'rotate(180deg)'
      arrow.style.transition = 'all 0.2s linear'
      menuFilter.style.boxShadow = '0px 3px 3px 1px rgba(0,0,0,0.3)'
      menuFilter.style.transition = 'max-height 0.2s linear'
      menuFilter.style.maxHeight = '123px'
    } else {
      arrow.style.transform = 'rotate(0deg)'
      arrow.style.transition = 'all 0.2s linear'
      menuFilter.style.boxShadow = '0px 0px 0px 0px rgba(0,0,0,0)'
      menuFilter.style.transition = 'max-height 0.2s linear both'
      menuFilter.style.maxHeight = '40px'
    }
  })
}

function addModal (modalBg, buttonProfil, sendButton, crossModalTitle) {
  function launchModal () {
    modalBg.style.display = 'block'
  }
  function closeModal () {
    modalBg.style.display = 'none'
  }

  modalBg.addEventListener('click', (e) => {
    if (e.target === modalBg) {
      closeModal()
    }
  })

  buttonProfil.addEventListener('click', launchModal)
  crossModalTitle.addEventListener('click', closeModal)
  sendButton.addEventListener('click', closeModal)
}
