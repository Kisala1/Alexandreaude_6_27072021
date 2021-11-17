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

  /**
   * Fonction pour créer une figure avec tous les détails pour une vidéo
   * @param {HTMLElement} container : div class container_img
   * @returns
   */
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
    titleImage.textContent = this.title

    const likeMedia = document.createElement('span')
    likeMedia.setAttribute('tabindex', '0')
    likeMedia.setAttribute('role', 'button')
    likeMedia.setAttribute('aria-label', "Ajouter un j'aime à l'image")
    const heartSymbol =
      '<i class="fas fa-heart" tabindex="0" role="button" aria-label="Ajouter un j\'aime à l\'image"></i>'
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
    figure.appendChild(video)
    video.appendChild(source)
    figure.appendChild(figcaption)
    figcaption.appendChild(titleImage)
    figcaption.appendChild(likeMedia)

    return video
  }

  /**
   * Fonction pour faire apparaître le media agrandi
   * @param {HTMLElement} mediaEl : vidéo ciblée
   */
  displayInLightbox(mediaEl) {
    const idMedia = parseInt(mediaEl.dataset.mediaId)

    const container = document.querySelector('.container-img-modal')
    const mediaModal = document.createElement('video')
    const mediaSourceModal = document.createElement('source')
    mediaModal.className = 'img-modal'
    mediaModal.dataset.mediaId = idMedia
    mediaSourceModal.src = mediaEl.querySelector('source').src
    mediaModal.controls = mediaEl.controls
    mediaModal.setAttribute('aria-label', this.title)
    document.querySelector('.modal-description').textContent = mediaEl.title
    container.innerHTML = ''
    container.appendChild(mediaModal)
    mediaModal.appendChild(mediaSourceModal)
    const modalImg = document.querySelector('.modal-mask-img')
    modalImg.style.display = 'block'

    trapModal(modalImg)
  }
}
