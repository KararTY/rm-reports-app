import type { Issue, ProjectInfo } from '../../Base/Project'
import GlobalContext from '../../Scripts/GlobalContext'
import { Definition, html } from 'uce'
import { saveProjectsToStorage } from '../../Scripts/Storage'
import { set } from '../../Base/Helpers'

/**
 * Attributes passed to the component.
 * `<component></component>`
 * `<component count="10"></component>`
 */
interface Props {
  projectInternalId?: number
}

/**
 * Internal state and functions.
 */
interface OwnProps {
  projectInfo?: ProjectInfo
  projectInternalId: number
  projectId: number
  deleted: boolean

  renderIssues: (arg: Issue[]) => unknown
  createIssue: () => unknown
  deleteIssue: (arg: InputEvent) => unknown
  saveProject: () => unknown
  deleteProject: (arg: InputEvent) => unknown
  setProjectVariable: (arg: InputEvent) => unknown
  setVideo: (arg: InputEvent) => unknown
}

/**
 * Added Definition accessors.
 */
export interface Accessors extends Definition<Props, OwnProps> {
  [x: string]: any

  projectId: number

  renderIssues: (arg: Issue[]) => unknown
  deleteIssue: (arg: InputEvent) => unknown
  deleteProject: (arg: InputEvent) => unknown
  setProjectVariable: (arg: InputEvent) => unknown
  setVideo: (arg: InputEvent) => unknown
}

const Project: Accessors = {
  extends: 'div',

  bound: ['createIssue', 'deleteIssue', 'saveProject', 'deleteProject', 'setProjectVariable', 'setVideo'],

  get projectId () {
    return this.projectInternalId
  },

  set projectId (value: number) {
    this.projectInfo = GlobalContext.projects[value]
    this.projectInternalId = value

    GlobalContext.currentProject = this.projectInfo;

    (this.init as any)()
  },

  createIssue () {
    this.projectInfo.issues.push({
      symptom: '',
      cause: '',
      solution: ''
    });

    (this.render as any)()

    document.body.scrollIntoView(false)
  },

  deleteIssue (event) {
    this.projectInfo.issues.splice(Number((event.currentTarget as any).dataset.index), 1);

    (this.render as any)()
  },

  saveProject () {
    GlobalContext.currentProject = this.projectInfo

    if (this.deleted === false) {
      GlobalContext.projects[this.projectInternalId] = GlobalContext.currentProject
    } else {
      GlobalContext.projects.push(GlobalContext.currentProject)

      this.deleted = false

      GlobalContext.leftMenuEl.render();

      (this.render as any)()
    }

    saveProjectsToStorage(GlobalContext.projects)
  },

  deleteProject () {
    if (this.deleted !== true) {
      GlobalContext.projects.splice(this.projectInternalId, 1)

      saveProjectsToStorage(GlobalContext.projects)

      GlobalContext.leftMenuEl.render()

      this.deleted = true;

      (this.render as any)()
    }
  },

  // The magic happens here.
  setProjectVariable (event) {
    const location = (event.target as HTMLInputElement).dataset.project
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    let value = (event.target as HTMLInputElement).value || (event.target as HTMLTextAreaElement).innerText

    if (location === 'model.id') {
      value = value.replace(/["”]/g, '″') // Double prime used for inches.
    }

    if (location !== undefined) {
      // https://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
      set(this.projectInfo, location, value)
    }

    this.saveProject()
  },

  async setVideo (event) {
    let value = (event.target as HTMLInputElement).value

    const youtubeURL = new URL(value)
    const videoId = youtubeURL.searchParams.get('v')

    if (videoId !== null) {
      const res = await fetch(`https://www.alremahy.com/api/youtube/get_oembed?url=${value}`, { method: 'POST' })
      const json = await res.json()

      this.projectInfo.video.title = json.title

      value = videoId
    }

    this.projectInfo.video.id = value

    GlobalContext.leftMenuEl.render();

    (this.render as any)()
  },

  renderIssues (issues) {
    return html`
      ${issues.map((issue, index) => html.for(issue, String(index))`
        <div class="column is-6">
          <div
            is="rm-project-issue"
            .issue=${issue}
            .setProjectVariable=${this.setProjectVariable}
            .index="${index}"
            .deleteIssue=${this.deleteIssue}
          ></div>
        </div>
      `)}
    `
  },

  init () {
    this.deleted = false

    this.render()

    GlobalContext.currentProjectEl = this
  },

  render () {
    if (this.projectInfo === undefined) {
      return this.html`
        <div class="container">
          <strong class="has-text-centered">Select an existing project on the left or create a new one using the buttons above.</strong>
        </div>
      `
    }

    const { video, model, logicBoardPartNumber, issues, comment, videoStartAt } = this.projectInfo

    this.html`
      <div class="container">
        <div class="form">
          <div is="rm-field-input"
            onchange=${this.setVideo}
            .props=${{ label: 'Video URL' }}
            .value=${`https://www.youtube.com/watch?v=${video.id}`}
          ></div>
          <hr/>
          <div class="columns is-multiline">
            <div class="column is-12">
              <div class="card">
                <div class="card-header">
                  <p class="card-header-title">${video.title.length > 0 ? video.title : 'No video defined.'}</p>
                </div>
                <div class="card-image">
                  <figure class="image is-16by9">
                    <div is="rm-youtube-video" .url=${video.id} .start=${videoStartAt}></div>
                  </figure>
                </div>
              </div>
            </div>
            <div class="column is-6">
              <div class="card">
                <div class="card-content">
                  <div is="rm-field-textarea" 
                    onchange="${this.setProjectVariable}"
                    .props=${{ label: 'Comment', attributes: { 'data-project': 'comment', rows: 11 } }}
                    .value=${comment}
                  ></div>
                </div>
              </div>
            </div>
            <div class="column is-6">
              <div class="card">
                <div class="card-content">
                  <div is="rm-field-input"
                    onchange=${this.setProjectVariable}
                    .props=${{ label: 'Model id', attributes: { 'data-project': 'model.id', placeholder: '...″ MacBook ...' } }}
                    .value=${model.id}
                  ></div>
                  <div is="rm-field-input"
                    onchange=${this.setProjectVariable}
                    .props=${{ label: 'Model number', attributes: { 'data-project': 'model.number' } }}
                    .value=${model.number}
                  ></div>
                  <div is="rm-field-input"
                    onchange=${this.setProjectVariable}
                    .props=${{ label: 'Model year', attributes: { min: 0, 'data-project': 'model.year' } }}
                    .value=${model.year}
                  ></div>
                  <div is="rm-field-input"
                    onchange=${this.setProjectVariable}
                    .props=${{ label: 'Logic board part number', attributes: { 'data-project': 'logicBoardPartNumber' } }}
                    .value=${logicBoardPartNumber}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns is-vcentered is-multiline">
            ${this.renderIssues(issues)}
            <div class="column has-text-centered">
              <a class="button" onclick=${this.createIssue}>Add issue</a>
            </div>
          </div>
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-success" onclick=${this.saveProject}>${this.deleted ? 'Restore project' : 'Save project'}</a>
            </p>
            <p class="control">
              <a class="button is-danger" onclick=${this.deleteProject} title="You can restore project by clicking on 'Restore project'.">Delete project</a>
            </p>
          </div>
        </div>
      </div>
    `
  }
}

export default Project
