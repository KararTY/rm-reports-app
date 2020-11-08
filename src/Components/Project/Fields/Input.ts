import type { Definition } from 'uce'
/**
 * Attributes passed to the component.
 * `<component></component>`
 * `<component count="10"></component>`
 */
interface Props {
  label: string
  value: string
  attributes: any
}

/**
 * Internal state and functions.
 */
interface OwnProps {
  label: string
  value: string
}

/**
 * Added Definition accessors.
 */
interface Accessors extends Definition<Props, OwnProps> {
}

const InputText: Accessors = {
  extends: 'div',

  props: {
    label: '',
    value: '',
    attributes: {
      type: 'text'
    }
  },

  init () {
    this.classList.add('field')

    this.label = this.props.label !== undefined ? this.props.label : 'Text input'

    this.render()

    if (this.props.attributes !== undefined) {
      for (const [key, value] of Object.entries(this.props.attributes)) {
        this.querySelector('input.input')?.setAttribute(key, String(value))
      }
    }
  },

  render () {
    this.html`
      <p class="control">
        <label class="label">${this.label}</label>
        <input class="input">
      </p>
    `;

    (this.querySelector('input.input') as HTMLInputElement).value = this.value
  }
}

export default InputText
