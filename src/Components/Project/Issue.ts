import type { Issue } from 'src/Base/Project'
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
interface OwnProps {
  index: number
  issue: Issue
  setProjectVariable: () => unknown
  deleteIssue: () => unknown

  toggleHide: (arg: InputEvent) => unknown
}

/**
 * Added Definition accessors.
 */
interface Accessors extends Definition<{}, OwnProps> {
  [x: string]: any
  toggleHide: (arg: InputEvent) => unknown
}

const IssueElement: Accessors = {
  extends: 'div',

  bound: ['toggleHide'],

  toggleHide (event) {
    event.stopPropagation()

    const classList = this.querySelector('.card-content').classList
    if (classList.contains('is-hidden') === true) {
      classList.remove('is-hidden');

      (event.currentTarget as any).querySelector('span').iconName = 'chevrons-up'
    } else {
      classList.add('is-hidden');

      (event.currentTarget as any).querySelector('span').iconName = 'chevrons-down'
    }
  },

  init () {
    this.classList.add('card')

    this.render()
  },

  render () {
    this.html`
      <div class="card-header">
        <div class="card-header-title level is-mobile">
          <div class="level-left">
              <p class="level-item">Issue #${this.index + 1}</p>
          </div>
          <a class="level-item" onclick=${this.toggleHide}>
            <span is="rm-icon" .props=${{ name: 'chevrons-up', alt: 'Hide' }}></span>
          </a>
          <div class="level-right">
            <a class="level-item" data-index="${this.index}" onclick=${this.deleteIssue}>
              <span is="rm-icon" .props=${{ name: 'trash', alt: 'Delete' }}></span>
            </a>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div is="rm-field-textarea"
          onchange=${this.setProjectVariable}
          .props=${{ label: 'Symptom', attributes: { 'data-project': `issues[${this.index}].symptom` } }}
          .value=${this.issue.symptom}
        ></div>
        <div is="rm-field-textarea"
          onchange=${this.setProjectVariable}
          .props=${{ label: 'Cause', attributes: { 'data-project': `issues[${this.index}].cause` } }}
          .value=${this.issue.cause}
        ></div>
        <div is="rm-field-textarea"
          onchange=${this.setProjectVariable}
          .props=${{ label: 'Solution', attributes: { 'data-project': `issues[${this.index}].solution` } }}
          .value=${this.issue.solution}
        ></div>
      </div>
    `
  }
}

export default IssueElement
