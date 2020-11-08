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

const Textarea: Accessors = {
  extends: 'div',

  props: {
    label: '',
    value: '',
    attributes: {}
  },

  init () {
    this.classList.add('field')

    this.label = this.props.label !== undefined ? this.props.label : 'Textarea'

    this.render()

    if (this.props.attributes !== undefined) {
      for (const [key, value] of Object.entries(this.props.attributes)) {
        this.querySelector('textarea.textarea')?.setAttribute(key, String(value))
      }
    }
  },

  render () {
    this.html`
      <p class="control">
        <label class="label">${this.label}</label>
        <textarea class="textarea"></textarea>
      </p>
    `;

    (this.querySelector('textarea.textarea') as HTMLTextAreaElement).value = this.value
  }
}

export default Textarea
