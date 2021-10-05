import factory from './MediaFactory.js'

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
    openModalImg()
    const modalForm = document.getElementById('modal_form')
    // const modalImg = document.getElementById('modal_img') Valeur null en dehors
    // de l'autre template
    const buttonProfil = document.querySelector('.buttonProfil')
    const closeModalForm = document.querySelector('.close_modal-form')
    const closeModalImg = document.querySelector('.close_modal-img')
    addModal(modalForm, buttonProfil, closeModalForm, closeModalImg)

    // Définition des inputs
    const form = document.querySelector('#form')
    addFormValidation(form, [
      {
        input: form.elements.firstname,
        validateFn: validateName
      },
      {
        input: form.elements.lastname,
        validateFn: validateName
      },
      {
        input: form.elements.email,
        validateFn: validateEmail
      },
      {
        input: form.elements.message,
        validateFn: validateMessage
      }
    ])
  })
  .catch((error) => {
    console.error(error)
  })

// =========================================================
// Fonction modèle-type page de profil d'un photogrgaphe
// =========================================================

function profilTemplatePhotographer (photographer) {
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
  const photographer = photographers.find((elt) => elt.id === idPhotograph)
  // Exécute la fonction avec les infos de photographer
  profilTemplatePhotographer(photographer)
  // Retourne un tableau avec les médias correspondant à l'Id à ce photographe
  const mediaPhotographs = medias.filter(
    (elt) => elt.photographerId === idPhotograph
  )

  function titleModalForm () {
    const buttonProfil = document.querySelector('.buttonProfil')
    const titleModal = document.querySelector('.title-modal')
    titleModal.textContent = buttonProfil.textContent + '\n' + photographer.name
    console.log(titleModal.textContent)
  }
  titleModalForm()

  const container = document.querySelector('.container_img')
  for (const mediaPhotograph of mediaPhotographs) {
    const media = factory(mediaPhotograph)
    if (media !== undefined) {
      media.displayInlist(container)
    }
  }
}

function openModalImg () {
  const mediaElts = document.querySelectorAll('.media')
  mediaElts.forEach((elt) => {
    elt.addEventListener('click', (e) => {
      const media = e.target
      const mediaSource = e.target.src

      const modalImg = document.querySelector('.modal-mask-img')
      const imgModal = document.querySelector('.img-modal')
      modalImg.style.display = 'block'
      imgModal.src = mediaSource
      document.querySelector('.modal-description').textContent = media.alt
    })
  })
}

/**
 * Permet de dérouler le menu au clic sur la flèche
 *
 */

function dropDownMenu () {
  const arrow = document.querySelector('.arrow')
  const menuClassify = document.querySelector('.menu_classify')
  arrow.addEventListener('click', () => {
    if (menuClassify.style.maxHeight === '40px') {
      arrow.style.transform = 'rotate(180deg)'
      arrow.style.transition = 'all 0.2s linear'
      menuClassify.style.boxShadow = '0px 3px 3px 1px rgba(0,0,0,0.3)'
      menuClassify.style.transition = 'max-height 0.2s linear'
      menuClassify.style.maxHeight = '123px'
    } else {
      arrow.style.transform = 'rotate(0deg)'
      arrow.style.transition = 'all 0.2s linear'
      menuClassify.style.boxShadow = '0px 0px 0px 0px rgba(0,0,0,0)'
      menuClassify.style.transition = 'max-height 0.2s linear both'
      menuClassify.style.maxHeight = '40px'
    }
  })
}

// =========================================================
// Modal
// =========================================================

/**
 * Permet d'ouvrir et de fermer la modal
 *
 * @param {HTMLDivElement} modalBg div modal_form
 * @param {HTMLButtonElement} buttonProfil button class= "buttonProfil"
 * @param {HTMLButtonElement} sendButton button class= "btn_send"
 * @param {HTMLElement} crossModalTitle <i class="cross">
 */

function addModal (modalBg, buttonProfil, closeBtnForm, closeBtnImg) {
  function launchModalForm () {
    modalBg.style.display = 'block'
  }
  function closeModalForm () {
    modalBg.style.display = 'none'
  }

  // function closeModalImg () {
  //   modalImg.style.display = 'none'
  // }

  // Ouvrir et fermer la modal form

  modalBg.addEventListener('click', (e) => {
    if (e.target === modalBg) {
      closeModalForm()
    }
  })
  buttonProfil.addEventListener('click', launchModalForm)
  closeBtnForm.addEventListener('click', closeModalForm)

  // Ouvrir et fermer la modal img

  // modalImg.addEventListener('click', (e) => {
  //   if (e.target === modalImg) {
  //     closeModalImg()
  //   }
  // })

  // closeBtnImg.addEventListener('click', closeModalImg)
}

// =========================================================
// Fonctions de validation
// =========================================================

/**
 * Vérifie que l'input contient un prénom ou nom.
 *
 * @param {HTMLInputElement} input L'input
 * @returns {string} le message d'erreur; ou une string vide en cas de succès.
 */
function validateName (input) {
  const value = input.value
  if (value.length < 2) {
    return 'Veuillez entrer 2 caractères ou plus.'
  }
  if (value.length > 25) {
    return 'Veuillez entrer 25 caractères ou moins.'
  }
  const nameRegExp = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF '-]+$/
  if (!nameRegExp.test(value)) {
    return "Veuillez n'entrer que des lettres, apostrophes ou tirets."
  }
  return ''
}

/**
 * Vérifie que l'input contient un email.
 *
 * @param {HTMLInputElement} input L'input
 * @returns {string} le message d'erreur; ou une string vide en cas de succès.
 */
function validateEmail (input) {
  const value = input.value
  const emailRegExp = /^[^@]+@[^@]+\.[^@]+$/

  if (!emailRegExp.test(value)) {
    return 'Veuillez entrez un email valide.'
  }
  return ''
}

function validateMessage (input) {
  const value = input.value
  if (value.length < 2) {
    return 'Veuillez entrer 2 caractères ou plus.'
  }
  if (value.length > 150) {
    return 'Veuillez entrer 150 caractères ou moins.'
  }
}
// =========================================================
// Validation du formulaire
// =========================================================

/**
 * Retourne tous les inputs dans un array
 * @param {HTMLElement} L'input
 * @returns
 *
 */

function inputToArray (input) {
  if (input) {
    return [input]
  }
}
/**
 * Permet d'afficher le message d'erreur pour l'input.
 *
 * @param {HTMLInputElement} L'input
 * @param {string} Message d'erreur ou une string vide
 */

function setErrorMessage (input, error) {
  const formData = inputToArray(input)[0].closest('.formData')
  if (error) {
    formData.setAttribute('data-error', error)
    formData.setAttribute('data-error-visible', 'true')
  } else {
    formData.removeAttribute('data-error')
    formData.removeAttribute('data-error-visible')
  }
}
/**
 * Permet de faire la validation des inputs.
 *
 * @param {HTMLElement} form
 * @param {Array} formInputs Array : input, validateFn
 */

function addFormValidation (form, formInputs) {
  // Ajouter la validation dynamique pour chaque input
  for (const { input, validateFn } of formInputs) {
    inputToArray(input).forEach(function (i) {
      i.addEventListener('change', function () {
        setErrorMessage(input, validateFn(input))
      })
    })
  }

  // Écouter l'event submit du formulaire
  form.addEventListener('submit', function (e) {
  // Annuler le comportement par défaut (envoi du formulaire)
    e.preventDefault()

    // Valider les inputs et compter le nombre d'erreurs
    let errorCount = 0
    for (const { input, validateFn } of formInputs) {
      const error = validateFn(input)
      setErrorMessage(input, error)
      if (error) {
        errorCount++
      }
    }

    // Si il n'y a aucune erreur, afficher le message de succès
    if (errorCount === 0) {
      form.remove()
      messageAppearance()
    }
  })
}

function messageAppearance () {
  document.querySelector('.title-modal').style.display = 'none'
  document.querySelector('.formSuccessMessage').style.display = 'block'
  const containerModalTitle = document.querySelector('.modal-title')
  containerModalTitle.style.justifyContent = 'end'
}
