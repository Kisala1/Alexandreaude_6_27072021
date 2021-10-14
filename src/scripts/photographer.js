import factory from './MediaFactory.js'
import { getPhotographerId, dropDownMenu } from './functions.js'
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

  name.textContent = photographer.name
  button.textContent = 'Contactez-moi'
  button.className = 'buttonProfil'
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

  function titleModalForm() {
    const buttonProfil = document.querySelector('.buttonProfil')
    const titleModal = document.querySelector('.title-modal')
    titleModal.innerHTML = buttonProfil.textContent + '<br/>' + photographer.name
  }
  titleModalForm()

  const container = document.querySelector('.container_img')
  for (const mediaPhotograph of mediaPhotographs) {
    const media = factory(mediaPhotograph)
    if (media !== undefined) {
      media.displayInlist(container)
    }
  }

  registerModalImg(mediaPhotographs)
}

function closeLightbox() {
  const modalImg = document.getElementById('modal_img')
  const closeBtnImg = document.querySelector('.close_modal-img')

  function closeModalImg() {
    modalImg.style.display = 'none'
  }
  modalImg.addEventListener('click', (e) => {
    if (e.target === modalImg) {
      closeModalImg()
    }
  })

  closeBtnImg.addEventListener('click', closeModalImg)
}

function registerModalImg(mediaPhotographs) {
  function gotoNextMedia(step) {
    const mediaModal = document.querySelector('.img-modal')
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

  const mediaElts = document.querySelectorAll('.media')
  mediaElts.forEach((elt) => {
    elt.addEventListener('click', (e) =>
      openModalImg(e.target, mediaPhotographs)
    )
  })
}

function openModalImg(mediaEl, medias) {
  const idMedia = parseInt(mediaEl.dataset.mediaId)
  const media = medias.find((elt) => elt.id === idMedia)
  const ligthboxMedia = factory(media)
  ligthboxMedia.displayInLightbox(mediaEl)
}
