import type { Definition } from 'uce'
/**
 * Attributes passed to the component.
 * `<component></component>`
 * `<component count="10"></component>`
 */
interface Props {
  logs: string[]
}

/**
 * Internal state and functions.
 */
interface OwnProps {
  logs: string[]
}

/**
 * Added Definition accessors.
 */
interface Accessors extends Definition<Props, OwnProps> { }

const LogModal: Accessors = {
  extends: 'div',

  props: {
    logs: []
  },

  init () {
    this.classList.add('modal-card')

    this.render()
  },

  render () {
    this.html`
      <div class="modal-card-head">
        <p class="modal-card-title">Uploading project...</p>
      </div>
      <div class="modal-card-body">
        <div class="content">
          <pre class="is-hidden">${this.logs.join('\r\n')}</pre>
        </div>
      </div>
    `
  }
}

export default LogModal
