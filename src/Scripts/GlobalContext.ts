import { Octokit } from '@octokit/core'
import { ProjectInfo } from '../Base/Project'
import { loadProjects } from './Storage'

class GlobalContext {
  public projects: ProjectInfo[] = []

  public currentProject: ProjectInfo
  public currentProjectEl: any

  public leftMenuEl: any

  public modalEl: any

  public topNavbarEl: any

  public player: any
  public playerFirstState: boolean = true

  public octokit: Octokit = new Octokit()
  public githubUser: any

  constructor () {
    this.projects = loadProjects()
    this.currentProject = new ProjectInfo()
  }
}

export default new GlobalContext()
