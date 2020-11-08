import GlobalContext from '../../../Scripts/GlobalContext'
import { Definition, html } from 'uce'
import { createCommit, createPullRequest, loginToOctoKit, updateOrCreateBranch, updateOrCreateFork } from '../../../Scripts/Github'
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
  uploadProject: () => unknown
  toggleDebug: (this: HTMLAnchorElement) => unknown
  renderSettingsModal: () => unknown
}

/**
 * Added Definition accessors.
 */
interface Accessors extends Definition<{}, OwnProps> {
  [x: string]: any

  toggleDebug: (this: HTMLAnchorElement) => unknown
}

const UploadProjectModal: Accessors = {
  extends: 'div',

  bound: ['uploadProject'],

  async uploadProject () {
    GlobalContext.modalEl.props.allowClose = false
    this.querySelector('a.button.is-success').disabled = 'disabled'
    this.querySelector('a.button.is-success').classList.add('is-loading')

    let loggedIn

    if (GlobalContext.githubUser === undefined) {
      loggedIn = await loginToOctoKit()
    } else {
      loggedIn = true
    }

    if (loggedIn) {
      await updateOrCreateFork() // UpdateOrCreate fork of "repair-manual/forms".

      const branchData = await updateOrCreateBranch() // Create a separate branch (or look for branch with same video id name).

      await createCommit(branchData.commit !== undefined ? branchData.commit.sha : branchData.object.sha) // Upload current project to the branch in repository.

      await createPullRequest(branchData) // Create a PR from branch to upstream.
    }

    this.querySelector('a.button.is-success').removeAttribute('disabled')
    this.querySelector('a.button.is-success').classList.remove('is-loading')
    GlobalContext.modalEl.props.allowClose = true
    GlobalContext.modalEl.closeModal()
  },

  renderSettingsModal () {
    GlobalContext.modalEl.content = html`<div
      is="rm-modal-settings"
      .props="${{ returnToText: 'upload project' }}"
      .returnToFunction=${GlobalContext.topNavbarEl.renderUploadProjectModal}
    ></div>`
  },

  toggleDebug () {
    const classList = this.parentElement?.querySelector('pre')?.classList as DOMTokenList
    classList.toggle('is-hidden')

    if (classList.contains('is-hidden')) {
      this.innerText = 'Show project data.'
      return
    }

    this.innerText = 'Hide project data.'
  },

  init () {
    this.classList.add('modal-card')

    this.render()
  },

  render () {
    const { video } = GlobalContext.currentProject

    const cleanedProject = { ...GlobalContext.currentProject }
    delete cleanedProject.videoStartAt

    this.html`
      <div class="modal-card-head">
        <p class="modal-card-title">Upload project to Github...</p>
      </div>
      <div class="modal-card-body">
        <div class="content">
          <h3 class="subtitle">${video.title}</h3>
          <a onclick=${this.toggleDebug}>Show project data.</a>
          <pre class="is-hidden">${JSON.stringify(cleanedProject, null, 2)}</pre>
        </div>
      </div>
      <div class="modal-card-foot">
        <a class="button is-success" onclick=${this.uploadProject}>Upload project</a>
        <a class="button is-text" onclick=${this.renderSettingsModal}>Edit Personal Access Token</a>
      </div>
    `
  }
}

export default UploadProjectModal
