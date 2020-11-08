import type { ProjectInfo } from '../Base/Project'

export default function format (project: ProjectInfo): string {
  return `{|class="wikitable"
! style="text-align:left;"| Symptom
! Cause
! Solution
${project.issues.map(issue => `|-
|${issue.symptom}
|${issue.cause}
|${issue.solution}`).join('\n')}
|}`
}
