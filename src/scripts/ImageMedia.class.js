export default class ImageMedia {
  constructor (media) {
    this.id = media.id
    this.photographerId = media.photographerId
    this.title = media.title
    this.image = media.image
    this.tags = media.tags
    this.likes = media.likes
    this.dates = media.dates
    this.price = media.price
  }

  displayInlist (container) {
    const figure = document.createElement('figure')
    const img = document.createElement('img')
    img.src = '/data/' + this.photographerId + '/' + this.image
    img.alt = this.title
    img.className = 'media'
    const figcaption = document.createElement('figcaption')

    const titleImage = document.createElement('span')
    titleImage.className = 'title_image' /* A ENLEVER SI NON UTILISE */
    titleImage.textContent = this.title

    const likeImage = document.createElement('span')
    likeImage.className = 'like_image'
    likeImage.textContent = this.likes + ' '

    container.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(figcaption)
    figcaption.appendChild(titleImage)
    figcaption.appendChild(likeImage)
  }
}
