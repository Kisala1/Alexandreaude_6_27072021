import Image from './ImageMedia.class.js'
import Video from './VideoMedia.class.js'
/**
 * Permet de retourner une nouvelle image / vidéo si c'est une image / vidéo
 * sinon undefined pour éviter bug
 * @param {HTMLElement} media : media ciblé
 * @returns
 */
export default function factory(media) {
  if (media.image) {
    return new Image(media)
  } else if (media.video) {
    return new Video(media)
  }
  return undefined
}
