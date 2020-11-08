import Icons from '../../Base/Icons'
import type { Definition } from 'uce'
/**
 * Attributes passed to the component.
 * `<component></component>`
 * `<component count="10"></component>`
 */
interface Props {
  name: string
  alt: string
}

/**
 * Internal state and functions.
 */
interface OwnProps {
  name: string
  alt: string

  iconName: string
}

/**
 * Added Definition accessors.
 */
interface Accessors extends Definition<Props, OwnProps> {
  [x: string]: any
}

const Icon: Accessors = {
  extends: 'span',

  props: {
    name: '',
    alt: ''
  },

  get iconName () {
    return this.name
  },

  set iconName (value) {
    this.name = value;

    (this.render as any)()
  },

  init () {
    this.classList.add('icon')

    this.alt = this.props.alt
    this.name = this.props.name

    this.setAttribute('alt', this.alt)

    this.render()
  },

  render () {
    this.html`${(Icons as any)[this.name]}`
  }
}

export default Icon
