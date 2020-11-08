import type { Definition } from 'uce'
import { getPersonalAPIToken, savePersonalAPIToken } from '../../../Scripts/Storage'
/**
 * Attributes passed to the component.
 * `<component></component>`
 * `<component count="10"></component>`
 */
interface Props {
  returnToText: string
}

/**
 * Internal state and functions.
 */
interface OwnProps {
  saveSettings: () => unknown
  returnToFunction: () => unknown
}

/**
 * Added Definition accessors.
 */
interface Accessors extends Definition<Props, OwnProps> {
  [x: string]: any
}

const SettingsModal: Accessors = {
  extends: 'div',

  bound: ['saveSettings'],

  props: {
    returnToText: ''
  },

  async saveSettings () {
    const pat = this.querySelector('input[name="pat"]')

    if (pat.value.length > 0) {
      this.querySelector('a.button.is-success').disabled = 'disabled'
      this.querySelector('a.button.is-success').classList.add('is-loading')

      savePersonalAPIToken(pat.value)

      this.returnToFunction()
    }
  },

  init () {
    this.classList.add('modal-card')

    this.render()
  },

  render () {
    this.html`
      <div class="modal-card-head">
        <p class="modal-card-title">Settings</p>
      </div>
      <div class="modal-card-body">
        <div class="content">
          <form name="personalaccesstoken">
            <div is="rm-field-input"
              .props=${{ label: 'Github Personal Access Token', attributes: { type: 'password', name: 'pat' } }}
              .value=${getPersonalAPIToken()}
            ></div>
          </form>
        </div>
      </div>
      <div class="modal-card-foot">
        <a class="button is-success" onclick=${this.saveSettings}>Save settings</a>
        <a class="button is-text" onclick=${this.returnToFunction}>Return to ${this.props.returnToText}</a>
      </div>
    `
  }
}

export default SettingsModal
