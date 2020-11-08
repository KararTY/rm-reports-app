import { ProjectInfo } from '../../../Base/Project'
import { saveProjectsToStorage } from '../../../Scripts/Storage'
import { Definition, html } from 'uce'
import { getFileContent, getProjects, loginToOctoKit } from '../../../Scripts/Github'
import GlobalContext from '../../../Scripts/GlobalContext'
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
  downloadProject: () => unknown
  showProjects: () => unknown
  renderSettingsModal: () => unknown

  selectedProject: any
}

/**
 * Added Definition accessors.
 */
interface Accessors extends Definition<{}, OwnProps> {
  [x: string]: any
}

const DownloadProjectModal: Accessors = {
  extends: 'div',

  bound: ['downloadProject', 'showProjects'],

  async downloadProject (event: any) {
    const el = event.currentTarget

    GlobalContext.modalEl.props.allowClose = false

    el.classList.add('is-active')
    el.disabled = 'disabled'

    let loggedIn

    if (GlobalContext.githubUser === undefined) {
      loggedIn = await loginToOctoKit()
    } else {
      loggedIn = true
    }

    if (loggedIn) {
      try {
        const data = await getFileContent(event.currentTarget.dataset.sha as string)

        const content = JSON.parse(atob(data.content))

        const found = GlobalContext.projects.find(project => project.video.id === content.video.id)

        if (found === undefined) {
          GlobalContext.projects.push(new ProjectInfo(content))

          saveProjectsToStorage(GlobalContext.projects)

          GlobalContext.leftMenuEl.render()

          el.innerText = `IMPORTED - ${el.innerText as string}`
        } else {
          // TODO: ALLOW MERGING OF PROJECTS.
          el.innerText = `ALREADY EXISTS - ${el.innerText as string}`
        }
      } catch (error) {
        console.error(error)
      }
    }

    el.classList.remove('is-active')

    GlobalContext.modalEl.props.allowClose = true
  },

  renderSettingsModal () {
    GlobalContext.modalEl.content = html`<div
      is="rm-modal-settings"
      .props="${{ returnToText: 'download project' }}"
      .returnToFunction=${GlobalContext.topNavbarEl.renderDownloadProjectModal}
    ></div>`
  },

  async showProjects () {
    let loggedIn

    if (GlobalContext.githubUser === undefined) {
      loggedIn = await loginToOctoKit()
    } else {
      loggedIn = true
    }

    if (!loggedIn) {
      return html`<p>Please enter a Github Personal Access Token!</p>`
    }

    const projects = await getProjects()

    return html`
      ${projects.map((project: any) => html.for(projects, String(project.sha))`
        <li>
          <a onclick=${this.downloadProject} data-sha="${project.sha}">${project.name}</a>
        </li>
      `)}
    `
  },

  init () {
    this.classList.add('modal-card')

    this.render()
  },

  async render () {
    this.html`<div class="container">
      <div class="loader"></div>
    </div>`

    const projects = await this.showProjects()

    this.html`
      <div class="modal-card-head">
        <p class="modal-card-title">Download project from Github...</p>
      </div>
      <div class="modal-card-body">
        <div class="menu">
          <ul class="menu-list">
            ${projects}
          </ul>
        </div>
      </div>
      <div class="modal-card-foot">
        <a class="button is-text" onclick=${this.renderSettingsModal}>Edit Personal Access Token</a>
      </div>
    `
  }
}

export default DownloadProjectModal
