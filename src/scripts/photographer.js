import factory from './MediaFactory.js'
import {
  getPhotographerId,
  dropDownMenu,
  registerClassifyMedia
} from './functions.js'
import { addFormValidation, addModalForm } from './form.js'

const idPhotograph = getPhotographerId()

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
    closeLightbox()
    addModalForm()

    // Définition des inputs
    const form = document.querySelector('#form')

    addFormValidation(form, [
      {
        input: form.elements.firstname,
        validateFn: 'validateName'
      },
      {
        input: form.elements.lastname,
        validateFn: 'validateName'
      },
      {
        input: form.elements.email,
        validateFn: 'validateEmail'
      },
      {
        input: form.elements.message,
        validateFn: 'validateMessage'
      }
    ])
  })
  .catch((error) => {
    console.error(error)
  })

// =========================================================
// Fonction modèle-type page de profil d'un photogrgaphe
// =========================================================

function profilTemplatePhotographer(photographer) {
  const profilPhotographerList = document.getElementById(
    'details_profil_photographer'
  )
  const profilPhotographerElementTemplate = document.getElementById(
    'details_profil_photographer_element'
  )
  const elt = document.importNode(
    profilPhotographerElementTemplate.content,
    true
  )
  const imgProfil = elt.querySelector('.portrait')
  const button = document.createElement('button')
  const name = elt.querySelector('.name')
  document.title += ` ${photographer.name}` /* + ' ' + photographer.name */
  name.textContent = photographer.name
  button.textContent = 'Contactez-moi'
  button.className = 'buttonProfil'
  button.setAttribute('aria-label', 'Contactez-moi')
  imgProfil.src = '/data/Photographers_ID_Photos/' + photographer.portrait
  imgProfil.alt = photographer.name
  elt.querySelector('.lieu').textContent =
    photographer.city + ', ' + photographer.country
  elt.querySelector('.tagline').textContent = photographer.tagline

  const tags = elt.querySelector('.tagsPhotographer')
  for (let i = 0; i < photographer.tags.length; i++) {
    const tag = document.createElement('span')
    tag.className = 'ui_tags tagProfil'
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

function addMediaToPhotographProfil(photographers, medias) {
  // find renvoie le 1er élement trouvé
  // Récupère l'id associé au photographe correspondant
  const photographer = photographers.find((elt) => elt.id === idPhotograph)
  // Exécute la fonction avec les infos de photographer
  profilTemplatePhotographer(photographer)
  // Retourne un tableau avec les médias correspondant à l'Id à ce photographe
  const mediaPhotographs = medias.filter(
    (elt) => elt.photographerId === idPhotograph
  )

  const buttonProfil = document.querySelector('.buttonProfil')
  const titleModal = document.querySelector('.title-modal')
  const photographName = document.querySelector('.photograph-name')
  titleModal.textContent = buttonProfil.textContent
  photographName.textContent = photographer.name
  const container = document.querySelector('.container_medias')
  const createMedias = (mapper) => {
    const mappedMediaPhotographs = mapper
      ? mapper(mediaPhotographs)
      : mediaPhotographs
    container.innerHTML = ''
    let totalLikes = 0
    for (const mediaPhotograph of mappedMediaPhotographs) {
      const media = factory(mediaPhotograph)
      totalLikes += media.likes
      if (media !== undefined) {
        media
          .displayInlist(container)
          .addEventListener('click', (e) =>
            openModalImg(e.target, mediaPhotographs)
          )
      }
    }
    const likesMediasPhotographs = document.querySelector('.like')
    likesMediasPhotographs.textContent = totalLikes
  }
  createMedias()

  registerClassifyMedia({ createMedias })
  registerModalImg(mediaPhotographs)
}

/**
 * Fonction pour fermer lightbox
 */
function closeLightbox() {
  const modalImg = document.getElementById('modal_media')
  const closeBtnImg = document.querySelector('.close_modal-media')

  const closeModalImg = () => {
    modalImg.style.display = 'none'
  }
  modalImg.addEventListener('click', (e) => {
    if (e.target === modalImg) {
      closeModalImg()
    }
  })
  modalImg.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalImg.style.display = 'none'
    }
  })

  closeBtnImg.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      closeModalImg()
    }
  })
  closeBtnImg.addEventListener('click', closeModalImg)
}
/**
 * Permet d'afficher le media suivant ou précédent en cliquant sur les flèches
 * @param {Array} mediaPhotographs : array des medias du photographe
 */

function registerModalImg(mediaPhotographs) {
  function gotoNextMedia(step) {
    const mediaModal = document.querySelector('.media-modal')
    const mediaId = parseInt(mediaModal.dataset.mediaId)
    const mediaIndex = mediaPhotographs.indexOf(
      mediaPhotographs.find((e) => e.id === mediaId)
    )
    let nextMediaIndex = mediaIndex + step
    if (nextMediaIndex < 0) {
      nextMediaIndex = mediaPhotographs.length - 1
    } else if (nextMediaIndex >= mediaPhotographs.length) {
      nextMediaIndex = 0
    }
    const nextMediaId = mediaPhotographs[nextMediaIndex].id
    const nextMediaEl = document.getElementById('media-' + nextMediaId)
    openModalImg(nextMediaEl, mediaPhotographs)
  }
  const left = document.querySelector('.arrow-left')
  const right = document.querySelector('.arrow-right')
  left.addEventListener('click', () => gotoNextMedia(-1))
  right.addEventListener('click', () => gotoNextMedia(1))
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      gotoNextMedia(-1)
      left.focus()
    }
    if (e.key === 'ArrowRight') {
      gotoNextMedia(1)
      right.focus()
    }
  })
  left.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      gotoNextMedia(-1)
      left.focus()
    }
  })
  right.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      gotoNextMedia(1)
      right.focus()
    }
  })
}
/**
 * Permet d'afficher en grand le media ciblé
 * @param {*} mediaEl : media ciblé
 * @param {Array} medias : array des medias du photographe
 */
function openModalImg(mediaEl, medias) {
  const idMedia = parseInt(mediaEl.dataset.mediaId)
  const media = medias.find((elt) => elt.id === idMedia)
  const ligthboxMedia = factory(media)
  ligthboxMedia.displayInLightbox(mediaEl)
}
