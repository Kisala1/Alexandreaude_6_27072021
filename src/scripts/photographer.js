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
    const modalImg = document.getElementById('modal_img')
    const buttonProfil = document.querySelector('.buttonProfil')
    const closeModal = document.querySelectorAll('.cross')
    addModal(modalForm, [modalForm, modalImg], buttonProfil, [...closeModal])

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
  profilTemplatePhotographer(photographer)
  // Retourne un tableau avec les médias correspondant à l'Id à ce photographe
  const mediaPhotographs = medias.filter(
    (elt) => elt.photographerId === idPhotograph
  )

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

function addModal (modalBg, modalsBg, buttonProfil, closeBtns) {
  function launchModal () {
    modalBg.style.display = 'block'
  }
  function closeModal () {
    modalBg.style.display = 'none'
  }

  for (const modalBg of modalsBg) {
    modalBg.addEventListener('click', (e) => {
      if (e.target === modalBg) {
        closeModal()
      }
    })
  }

  buttonProfil.addEventListener('click', launchModal)

  for (const btn of closeBtns) {
    btn.addEventListener('click', closeModal)
  }
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
