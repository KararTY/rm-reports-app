// import { ProjectInfo } from '../Base/Project'
import { Definition, html } from 'uce'
import GlobalContext from '../../Scripts/GlobalContext'

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
  renderProjectsMenuList: () => unknown
}

/**
 * Added Definition accessors.
 */
interface Accessors extends Definition<{}, OwnProps> {
  [x: string]: any
}

const LeftMenu: Accessors = {
  extends: 'div',

  renderProjectsMenuList () {
    try {
      return html`${
        GlobalContext.projects.map((_, index) => html.for(_, String(_.video.id))`
          <li is="rm-project-item-list" .props=${{ projectInternalId: index }}></li>
        `)
      }`
    } catch (error) {
      console.error(error)
    }

    return html`Error loading projects.`
  },

  init () {
    this.setAttribute('class', 'column is-2')

    this.render()

    GlobalContext.leftMenuEl = this
  },

  render () {
    this.html`
      <div class="menu">
        <p class="menu-label">Projects</p>
        <ul class="menu-list is-clipped">
          ${this.renderProjectsMenuList()}
        </ul>
      </div>
    `
  }
}

export default LeftMenu
