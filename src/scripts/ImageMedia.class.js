import { trapModal } from './form.js'

export default class ImageMedia {
  constructor(media) {
    this.id = media.id
    this.photographerId = media.photographerId
    this.title = media.title
    this.image = media.image
    this.tags = media.tags
    this.likes = media.likes
    this.date = media.date
    this.price = media.price
  }

  /**
   * Fonction pour créer une figure avec tous les détails pour une image
   * @param {HTMLElement} container : div class container_img
   * @returns
   */
  displayInlist(container) {
    const figure = document.createElement('figure')
    const img = document.createElement('img')
    img.src = '/data/' + this.photographerId + '/' + this.image
    img.alt = this.title
    img.className = 'media'
    img.id = 'media-' + this.id
    img.dataset.mediaId = this.id
    img.dataset.date = this.date
    img.setAttribute('tabindex', 0)
    img.setAttribute('role', 'button')
    img.setAttribute('aria-label', this.title)
    const figcaption = document.createElement('figcaption')

    const titleImage = document.createElement('span')
    titleImage.textContent = this.title

    const likeMedia = document.createElement('span')
    likeMedia.setAttribute('tabindex', '0')
    likeMedia.setAttribute('role', 'button')
    likeMedia.setAttribute('aria-label', "Ajouter un j'aime à l'image")
    const heartSymbol = '<i class="fas fa-heart"></i>'
    let likes = this.likes
    likeMedia.className = 'like_media'
    likeMedia.innerHTML = likes + ' ' + heartSymbol

    likeMedia.addEventListener('click', () => {
      likeMedia.innerHTML = likes++ + ' ' + heartSymbol
    })
    likeMedia.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        likeMedia.innerHTML = likes++ + ' ' + heartSymbol
      }
    })

    container.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(figcaption)
    figcaption.appendChild(titleImage)
    figcaption.appendChild(likeMedia)

    return img
  }

  /**
   * Fonction pour faire apparaître le media agrandi
   * @param {HTMLElement} mediaEl : image ciblée
   */
  displayInLightbox(mediaEl) {
    const idMedia = parseInt(mediaEl.dataset.mediaId)

    const container = document.querySelector('.container-img-modal')
    const mediaModal = document.createElement('img')
    mediaModal.className = 'img-modal'
    mediaModal.dataset.mediaId = idMedia
    mediaModal.src = mediaEl.src
    mediaModal.alt = mediaEl.alt
    mediaModal.setAttribute('aria-label', this.title)
    document.querySelector('.modal-description').textContent = mediaEl.alt
    container.innerHTML = ''
    container.appendChild(mediaModal)
    const modalImg = document.querySelector('.modal-mask-img')
    modalImg.style.display = 'block'
    console.log(mediaEl)

    trapModal(modalImg)
  }
}
