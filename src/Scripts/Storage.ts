import { ProjectInfo } from '../Base/Project'

export function loadProjects (): ProjectInfo[] {
  let projectsLocalStorage = window.localStorage.getItem('projects')

  // If there are no projects in storage, define one default "demo" project.
  if (projectsLocalStorage === null) {
    const defaultProjects = JSON.stringify([new ProjectInfo()])
    window.localStorage.setItem('projects', defaultProjects)
    projectsLocalStorage = defaultProjects
  }

  try {
    const json = JSON.parse(projectsLocalStorage)
    const projects = []

    for (let index = 0; index < json.length; index++) {
      const project = json[index]
      projects.push(new ProjectInfo(project))
    }

    return projects
  } catch (error) {
    console.error(error)
    return []
  }
}

export function saveProjectsToStorage (projects: ProjectInfo[]): void {
  window.localStorage.setItem('projects', JSON.stringify(projects))
}

export function savePersonalAPIToken (token: string): void {
  window.localStorage.setItem('pat', btoa(token))
}

export function getPersonalAPIToken (): string | false {
  const personalAPITokenStorage = window.localStorage.getItem('pat')
  if (personalAPITokenStorage === null) {
    return false
  }

  return atob(personalAPITokenStorage)
}
