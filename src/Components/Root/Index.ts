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
// interface OwnProps { }

/**
 * Added Definition accessors.
 */
interface Accessors extends Definition/* <Props, OwnProps> */ { }

const Root: Accessors = {
  extends: 'div',

  render () {
    this.html`
      <nav is="rm-top-navbar"></nav>
      <div class="container">
        <div class="columns is-marginless">
          <div is="rm-left-menu"></div>
          <div is="rm-project" class="column"></div>
        </div>
      </div>
      <div is="rm-modal"></div>
    `
  }
}

export default Root
