import { trapModal } from './form.js'
export default class VideoMedia {
  constructor(media) {
    this.id = media.id
    this.photographerId = media.photographerId
    this.title = media.title
    this.video = media.video
    this.tags = media.tags
    this.likes = media.likes
    this.dates = media.dates
    this.price = media.price
  }

  displayInlist(container) {
    const figure = document.createElement('figure')
    const video = document.createElement('video')
    const source = document.createElement('source')
    source.src = '/data/' + this.photographerId + '/' + this.video
    video.controls = true
    video.className = 'media'
    video.id = 'media-' + this.id
    video.dataset.mediaId = this.id
    video.dataset.date = this.date
    video.setAttribute('aria-label', this.title)
    const figcaption = document.createElement('figcaption')

    const titleImage = document.createElement('span')
    titleImage.className = 'title_image' /* A ENLEVER SI NON UTILISE */
    titleImage.textContent = this.title

    const likeImage = document.createElement('span')
    likeImage.className = 'like_image'
    likeImage.textContent = this.likes + ' '

    container.appendChild(figure)
    figure.appendChild(video)
    video.appendChild(source)
    figure.appendChild(figcaption)
    figcaption.appendChild(titleImage)
    figcaption.appendChild(likeImage)

    return video
  }

  displayInLightbox(mediaEl) {
    const idMedia = parseInt(mediaEl.dataset.mediaId)

    const container = document.querySelector('.container-img-modal')
    const mediaModal = document.createElement('video')
    const mediaSourceModal = document.createElement('source')
    mediaModal.className = 'img-modal'
    mediaModal.dataset.mediaId = idMedia
    mediaSourceModal.src = mediaEl.querySelector('source').src
    mediaModal.controls = mediaEl.controls
    document.querySelector('.modal-description').textContent = mediaEl.title
    container.innerHTML = ''
    container.appendChild(mediaModal)
    mediaModal.appendChild(mediaSourceModal)
    const modalImg = document.querySelector('.modal-mask-img')
    modalImg.style.display = 'block'
    trapModal(modalImg)

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modalImg.style.display = 'none'
      }
    })
  }
}
