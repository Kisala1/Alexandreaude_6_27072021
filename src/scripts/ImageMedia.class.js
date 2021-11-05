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

    const likeImage = document.createElement('span')
    likeImage.className = 'like_image'
    likeImage.textContent = this.likes + ' '

    container.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(figcaption)
    figcaption.appendChild(titleImage)
    figcaption.appendChild(likeImage)

    return img
  }

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

    trapModal(modalImg)
  }
}
