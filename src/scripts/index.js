fetch('./../../data/fisheyeData.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status)
    }
    return response.json()
  })
  .then((data) => {
    // Pour chaque photographe dans photographers
    // Cela créer un nouveau profil
    for (const photographer of data.photographers) {
      displayPhotographer(photographer)
    }
    displayTagsMenu(data.photographers)
    addListenersToKeyboardAndTags(data.photographers)
  })
  .catch((error) => {
    console.error(error)
  })

/**
 * Permet d'ajouter chaque tags dans .tagsMenu
 * @param {Array} Array photographers
 */

//  Ajoute les tags dans le menu
function displayTagsMenu(photographers) {
  const tags = []
  for (const photographer of photographers) {
    for (const tag of photographer.tags) {
      //  Vérifie  si le tag a déjà été ajouter
      if (!tags.includes(tag)) {
        // Si n'est pas déjà ajouté, ça l'ajoute
        tags.push(tag)
      }
    }
  }

  // Permet d'ajouter '#'
  // Et de mettre la 1ère lettre du tag en majuscule.

  const tagsMenu = document.querySelector('.tagsMenu')
  for (const [index, tag] of tags.entries()) {
    const tags = document.createElement('span')
    tags.setAttribute('tabindex', 0)
    tags.setAttribute('role', 'button')
    if (index === 0) {
      tags.setAttribute('aria-label', 'Trier les photographes par tag ' + tag)
    } else {
      tags.setAttribute('aria-label', tag)
    }
    tags.textContent = '#' + tag[0].toUpperCase() + tag.slice(1)
    tags.className = 'ui_tags'
    tagsMenu.appendChild(tags)
  }
}

/**
 * Permet de filtrer au clic les photographes grâce aux tags
 *
 * @param {Array} Array photographers
 */

function addListenersToKeyboardAndTags(photographers) {
  document.addEventListener('keyup', (e) => {
    if (
      e.key === 'Enter' &&
      document.activeElement.classList.contains('ui_tags')
    ) {
      const tagElt = document.activeElement
      registerFilterWithTags(tagElt, photographers)
    }
  })

  const tagsElts = document.querySelectorAll('.ui_tags')
  tagsElts.forEach((elt) => {
    elt.addEventListener('click', (e) => {
      const target = e.target
      registerFilterWithTags(target, photographers)
    })
  })
}

/**
 * Enregistre la fonction qui permet de filtrer les photographes par tag
 * @param {HTMLElement} target : span tag ciblé
 * @param {Array} photographers : array des photographes
 */
function registerFilterWithTags(target, photographers) {
  // Cible tag au clic et retourne ce même tag
  // sans ' # ' et sans majuscule
  const tag = target.textContent.slice(1).toLowerCase()

  // Retourne un nouveau tableau avec tous les éléments
  // qui remplissent la condition déterminée par la fonction
  const photographersWithTag = photographers.filter((elt) =>
    elt.tags.includes(tag)
  )

  // Créer un nouveau tableau avec les résultats de l'appel de la fonction
  // fournie sur chaque élément du tableau
  const ids = photographersWithTag.map((elt) => elt.id)

  document.querySelectorAll('figure').forEach((photographer) => {
    // Si le tableau ids contient l'Id du photographe (en nombre)
    if (ids.includes(parseInt(photographer.dataset.photographerId))) {
      photographer.style.display = 'block'
    } else {
      photographer.style.display = 'none'
    }
  })
}

/**
 * Permet de créer un modèle-type de profil pour un photographe.
 *
 * @param {Array} Array photographer
 */

function displayPhotographer(photographer) {
  const profilList = document.getElementById('profil_photographer')
  const profilElementTemplate = document.getElementById(
    'profil_photographer_element'
  )
  const el = document.importNode(profilElementTemplate.content, true)
  const imgSelector = el.querySelector('.portrait')

  el.querySelector('figure').dataset.photographerId = photographer.id
  el.querySelector('a').href = 'photographer.html?id=' + photographer.id
  el.querySelector('a').setAttribute('aria-label', 'Profil photographe')

  const name = el.querySelector('.name')
  name.textContent = photographer.name
  name.setAttribute('aria-label', name.textContent)

  imgSelector.alt = photographer.name
  imgSelector.src =
    '../../data/Photographers_ID_Photos/' + photographer.portrait

  const lieu = el.querySelector('.lieu')
  lieu.textContent = photographer.city + ', ' + photographer.country
  lieu.setAttribute('aria-label', lieu.textContent)

  const tagline = el.querySelector('.tagline')
  tagline.textContent = photographer.tagline
  tagline.setAttribute('aria-label', tagline.textContent)

  const price = el.querySelector('.price')
  price.textContent = photographer.price + '€/jour'
  price.setAttribute('aria-label', photographer.price + '€ par jour')

  const tags = el.querySelector('.tagsProfil')
  for (let i = 0; i < photographer.tags.length; i++) {
    const tag = document.createElement('span')
    tag.className = 'ui_tags'
    tag.textContent = '#' + photographer.tags[i]
    tag.setAttribute('aria-label', photographer.tags[i])
    tags.appendChild(tag)
  }
  profilList.appendChild(el)
}
