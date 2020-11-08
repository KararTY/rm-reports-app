import { ProjectInfo } from '../../Base/Project'
import GlobalContext from '../../Scripts/GlobalContext'
import { Definition, html } from 'uce'
import { saveProjectsToStorage } from '../../Scripts/Storage'

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
  createProject: () => unknown
  renderUploadProjectModal: () => unknown
  renderDownloadProjectModal: () => unknown
  renderFormatProjectModal: () => unknown
}

/**
 * Added Definition accessors.
 */
interface Accessors extends Definition<{}, OwnProps> {
  [x: string]: any
}

const TopNavbar: Accessors = {
  extends: 'nav',

  bound: ['createProject'],

  createProject () {
    GlobalContext.projects.push(new ProjectInfo())

    saveProjectsToStorage(GlobalContext.projects)

    GlobalContext.leftMenuEl.render()
  },

  renderUploadProjectModal () {
    if (GlobalContext.currentProject !== undefined && GlobalContext.currentProject.video.id.length > 0) {
      GlobalContext.modalEl.content = html`<div is="rm-modal-upload-project"></div>`
      GlobalContext.modalEl.classList.add('is-active')
      document.documentElement.classList.add('is-clipped')
    }
  },

  renderDownloadProjectModal () {
    GlobalContext.modalEl.content = html`<div is="rm-modal-download-project"></div>`
    GlobalContext.modalEl.classList.add('is-active')
    document.documentElement.classList.add('is-clipped')
  },

  renderFormatProjectModal () {
    if (GlobalContext.currentProject !== undefined && GlobalContext.currentProject.video.id.length > 0) {
      GlobalContext.modalEl.content = html`<div is="rm-modal-format-project"></div>`
      GlobalContext.modalEl.classList.add('is-active')
      document.documentElement.classList.add('is-clipped')
    }
  },

  init () {
    this.setAttribute('class', 'navbar has-shadow')

    this.render()

    GlobalContext.topNavbarEl = this
  },

  render () {
    this.html`
      <div class="container">
        <div class="navbar-brand">
          <div class="navbar-item">
            <img src="./RG_MEDIAWIKI.png"/>
          </div>
          <div class="navbar-item has-text-weight-bold">Repair Manual Reports App</div>
        </div>
        <div class="navbar-menu is-active">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped is-grouped-centered">
                <p class="control">
                  <a class="button" title="Create project" onclick=${this.createProject}>
                    <span is="rm-icon" .props=${{ name: 'plus-square' }}></span>
                  </a>
                </p>
                <p class="control">
                  <a class="button" title="Format" onclick=${this.renderFormatProjectModal}>
                    <span is="rm-icon" .props=${{ name: 'file-text' }}>
                  </a>
                </p>
                <p class="control">
                  <a class="button" title="Load project" onclick=${this.renderDownloadProjectModal}>
                    <span is="rm-icon" .props=${{ name: 'download-cloud' }}></span>
                  </a>
                </p>
                <p class="control">
                  <a class="button" title="Upload project" onclick=${this.renderUploadProjectModal}>
                    <span is="rm-icon" .props=${{ name: 'upload-cloud' }}></span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `

    /**
     * <p class="control">
                  <a class="button" title="Settings">
                    <span is="rm-icon" .props=${{ name: 'settings' }}>
                  </a>
                </p>
     */
  }
}

export default TopNavbar
