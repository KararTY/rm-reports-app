import type { ProjectInfo } from '../../Base/Project'
import GlobalContext from '../../Scripts/GlobalContext'
import type { Definition } from 'uce'

/**
 * Attributes passed to the component.
 * `<component></component>`
 * `<component count="10"></component>`
 */
interface Props {
  projectInternalId: number
}

/**
 * Internal state and functions.
 */
interface OwnProps {
  project: ProjectInfo
  setCurrentProject: () => unknown
}

/**
 * Added Definition accessors.
 */
interface Accessors extends Definition<Props, OwnProps> {
  [x: string]: any
}

const ProjectItemList: Accessors = {
  extends: 'li',

  bound: ['setCurrentProject'],

  props: {
    projectInternalId: 0
  },

  setCurrentProject () {
    GlobalContext.currentProjectEl.projectId = this.props?.projectInternalId
  },

  init () {
    this.project = GlobalContext.projects[this.props.projectInternalId]

    this.render()
  },

  render () {
    this.html`
      <a onclick=${this.setCurrentProject} title="${this.project.video.title}">
        <span is="rm-icon" .props=${{ name: 'file' }}></span>
        <span>${this.project.video.id.length > 0 ? this.project.video.id : 'No video defined.'}</span>
      </a>
    `
  }
}

export default ProjectItemList
