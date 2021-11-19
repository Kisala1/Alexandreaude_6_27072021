// =========================================================
// Modal Form
// =========================================================

/**
 * Permet d'ouvrir et de fermer la modal form
 *
 * @param {HTMLDivElement} modalForm div modal_form
 * @param {HTMLButtonElement} buttonProfil button class= "buttonProfil"
 * @param {HTMLButtonElement} sendButton button class= "btn_send"
 * @param {HTMLElement} crossModalTitle <i class="cross">
 */

export function addModalForm() {
  const mainWrapper = document.querySelector('#main-wrapper')
  const body = document.querySelector('.body_photographer')
  const modalForm = document.querySelector('#modal_form')
  const buttonProfil = document.querySelector('.buttonProfil')
  const closeBtnForm = document.querySelector('.close_modal-form')

  function launchModalForm() {
    mainWrapper.setAttribute('aria-hidden', 'true')
    modalForm.setAttribute('aria-hidden', 'false')
    body.style.overflow = 'hidden'
    modalForm.style.display = 'block'
    closeBtnForm.focus()
    trapModal(modalForm)
  }

  function closeModalForm() {
    mainWrapper.setAttribute('aria-hidden', 'false')
    modalForm.setAttribute('aria-hidden', 'true')
    body.style.overflow = 'auto'
    modalForm.style.display = 'none'
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModalForm()
    }
  })

  modalForm.addEventListener('click', (e) => {
    if (e.target === modalForm) {
      closeModalForm()
    }
  })
  buttonProfil.addEventListener('click', launchModalForm)
  closeBtnForm.addEventListener('click', closeModalForm)
}

export function trapModal(modalForm) {
  /* Source : https://codepen.io/myogeshchavan97/pen/zYGVbxN?editors=0010 */

  const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video'

  const focusableContent = modalForm.querySelectorAll(focusableElements)
  const firstFocusableElement = modalForm.querySelectorAll(focusableElements)[0]
  const lastFocusableElement = focusableContent[focusableContent.length - 1]

  document.addEventListener('keydown', function (e) {
    const isTabPressed = e.key === 'Tab' || e.keyCode === 9
    if (!isTabPressed) {
      return
    }

    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus() // add focus for the last focusable element
        e.preventDefault()
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocusableElement) {
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus() // add focus for the first focusable element
        e.preventDefault()
      }
    }
  })
  firstFocusableElement.focus()
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
function validateName(input) {
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
function validateEmail(input) {
  const value = input.value
  const emailRegExp = /^[^@]+@[^@]+\.[^@]+$/

  if (!emailRegExp.test(value)) {
    return 'Veuillez entrez un email valide.'
  }
  return ''
}

function validateMessage(input) {
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

function inputToArray(input) {
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

function setErrorMessage(input, error) {
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

export function addFormValidation(form, formInputs) {
  // Ajouter la validation dynamique pour chaque input
  for (const { input, validateFn } of formInputs) {
    inputToArray(input).forEach(function (i) {
      i.addEventListener('change', function () {
        setErrorMessage(input, getValidateFunction(validateFn)(input))
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
      const error = getValidateFunction(validateFn)(input)
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

/**
 * Fonction pour faire apparaître message à la fin du formulaire
 */

function messageAppearance() {
  document.querySelector('.title-modal').style.display = 'none'
  document.querySelector('.photograph-name').style.display = 'none'
  const successMessage = document.querySelector('.formSuccessMessage')
  successMessage.style.display = 'block'
  successMessage.setAttribute('aria-label', successMessage.textContent)
  const containerModalTitle = document.querySelector('.modal-title')
  containerModalTitle.style.justifyContent = 'end'
}

/**
 * Permet de retourner la fonction de validation correspondante
 * @param {Function} name fonction
 * @returns
 */

function getValidateFunction(name) {
  switch (name) {
    case 'validateName':
      return validateName
    case 'validateEmail':
      return validateEmail
    case 'validateMessage':
      return validateMessage
  }
}
