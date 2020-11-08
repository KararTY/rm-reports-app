import GlobalContext from '../../Scripts/GlobalContext'
import { Definition, html } from 'uce'
/**
 * Attributes passed to the component.
 * `<component></component>`
 * `<component count="10"></component>`
 */
interface Props {
  content: any
  allowClose: boolean
}

/**
 * Internal state and functions.
 */
interface OwnProps {
  content: any
  closeModal: () => unknown
}

/**
 * Added Definition accessors.
 */
interface Accessors extends Definition<Props, OwnProps> {
  [x: string]: any
}

const Modal: Accessors = {
  extends: 'div',

  bound: ['closeModal'],

  props: {
    allowClose: true,
    content: html``
  },

  closeModal () {
    if (this.props?.allowClose === false) {
      return
    }

    this.classList.remove('is-active')

    this.content = html``;

    (this.render as any)()
    document.documentElement.classList.remove('is-clipped')
  },

  init () {
    this.classList.add('modal')

    this.content = this.props.content

    this.render()

    GlobalContext.modalEl = this
  },

  render () {
    this.html`
      <div class="modal-background" onclick=${this.closeModal}></div>
      ${this.content}
      <button class="modal-close is-large" onclick=${this.closeModal}></button>
    `
  }
}

export default Modal
