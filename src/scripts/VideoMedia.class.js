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
  }
}
