import GlobalContext from '../../../Scripts/GlobalContext'
import type { Definition } from 'uce'
import format from '../../../Scripts/Format'
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
  formatProjectCopy: () => unknown
}

/**
 * Added Definition accessors.
 */
interface Accessors extends Definition<{}, OwnProps> {
  [x: string]: any
}

const FormatProjectModal: Accessors = {
  extends: 'div',

  bound: ['formatProjectCopy'],

  formatProjectCopy () {
    const text = this.querySelector('textarea')

    text.select()

    document.execCommand('copy')
  },

  init () {
    this.classList.add('modal-card')

    this.render()
  },

  render () {
    const { currentProject } = GlobalContext

    this.html`
      <div class="modal-card-head">
        <p class="modal-card-title">MediaWiki Format</p>
      </div>
      <div class="modal-card-body">
        <textarea class="textarea" rows="10">${format(currentProject)}</textarea>
      </div>
      <div class="modal-card-foot">
        <a class="button" onclick=${this.formatProjectCopy}>Copy to clipboard</a>
        <a class="button" href="${
          `https://wiki2.rossmanngroup.com/index.php?title=${currentProject.model.number}_${currentProject.model.year}_${currentProject.model.id.replace(/ /g, '_')}`
        }" target="_blank">Open Wiki page</a>
      </div>
    `
  }
}

export default FormatProjectModal
