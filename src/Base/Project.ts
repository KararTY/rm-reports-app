interface Video {
  id: string
  title: string
}

export interface Issue {
  symptom: string
  cause: string
  solution: string
}

interface Model {
  id: string
  number: string
  year: string
}

export class ProjectInfo {
  public video: Video = {
    id: '',
    title: ''
  }

  public model: Model = {
    id: '',
    number: '',
    year: ''
  }

  public logicBoardPartNumber: string = ''

  public issues: Issue[] = []

  public comment: string = ''

  public videoStartAt?: number = 0

  constructor (project?: ProjectInfo) {
    if (project === undefined) return

    Object.assign(this, project)
  }
}
