import { waitForIframe } from '../../Scripts/Youtube'
import type { Definition } from 'uce'
/**
 * Attributes passed to the component.
 * `<component></component>`
 * `<component count="10"></component>`
 */
// interface Props { }

/**
 * Internal state and functions.
 */
interface OwnProps {
  url: string
  start: number
}

/**
 * Added Definition accessors.
 */
interface Accessors extends Definition<{}, OwnProps> { }

const Video: Accessors = {
  extends: 'div',

  props: {
    url: '',
    start: 0
  },

  render () {
    this.html`
      <iframe
        allowfullscreen
        class="has-ratio"
        id="ytplayer" type="text/html"
        frameborder="0"
        enablejsapi="true"
        src="${`https://www.youtube.com/embed/${String(this.url)}?start=${this.start}&autoplay=0&modestbranding=1&enablejsapi=1&rel=0`}"
      ></iframe>
    `

    waitForIframe()
  }
}

export default Video
