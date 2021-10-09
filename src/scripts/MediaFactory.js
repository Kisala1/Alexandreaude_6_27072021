import Image from './ImageMedia.class.js'
import Video from './VideoMedia.class.js'

export default function factory(media) {
  if (media.image) {
    return new Image(media)
  } else if (media.video) {
    return new Video(media)
  }
  return undefined
}
