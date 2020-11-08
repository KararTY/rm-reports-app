import GlobalContext from './GlobalContext'
import { Octokit } from '@octokit/core'
import { getPersonalAPIToken } from './Storage'

export async function loginToOctoKit (): Promise<boolean> {
  GlobalContext.octokit = new Octokit({ auth: getPersonalAPIToken() })
  try {
    const res = await GlobalContext.octokit.request('GET /user')

    GlobalContext.githubUser = res.data

    return true
  } catch (error) {
    console.error(error)
    // TODO: POPUP ERROR MODAL.
    return false
  }
}

export async function updateOrCreateFork (): Promise<void> {
  const { githubUser, octokit } = GlobalContext

  try {
    await octokit.request('GET /repos/:owner/:repo', {
      owner: githubUser.login,
      repo: 'rm-reports'
    })

    return
  } catch (error) {
    console.error(error)
    // TODO: POPUP ERROR MODAL.
    if (error.status === 404) {
      // Create fork.
      await octokit.request('POST /repos/:owner/:repo/forks', {
        owner: 'repair-manual',
        repo: 'rm-reports'
      })
    }
  }
}

export async function updateOrCreateBranch (): Promise<any> {
  const { githubUser, currentProject, octokit } = GlobalContext

  try {
    const res = await octokit.request('GET /repos/:owner/:repo/branches/:branch', {
      owner: githubUser.login,
      repo: 'rm-reports',
      branch: currentProject.video.id
    })

    return res.data
  } catch (error) {
    console.error(error)
    // TODO: POPUP ERROR MODAL.

    if (error.status === 404) {
      // Create branch.
      const res = await octokit.request('GET /repos/:owner/:repo/git/refs/head', {
        owner: 'repair-manual',
        repo: 'rm-reports'
      })

      const mainHead = res.data.find((branch: any) => branch.ref === 'refs/heads/main')

      const newBranch = await octokit.request('POST /repos/:owner/:repo/git/refs', {
        owner: githubUser.login,
        repo: 'rm-reports',
        ref: `refs/heads/${currentProject.video.id}`,
        sha: mainHead.object.sha
      })

      return newBranch.data
    }
  }
}

export async function createCommit (branchSHA: string): Promise<any> {
  try {
    const { githubUser, currentProject, octokit } = GlobalContext

    const res = await octokit.request('GET /repos/:owner/:repo/git/commits/:commit_sha', {
      owner: githubUser.login,
      repo: 'rm-reports',
      commit_sha: branchSHA
    })

    const cleanedProject = { ...currentProject }
    delete cleanedProject.videoStartAt

    const treeSHA = res.data.tree.sha

    const treesRes = await octokit.request('POST /repos/:owner/:repo/git/trees', {
      owner: githubUser.login,
      repo: 'rm-reports',
      base_tree: treeSHA,
      tree: [
        {
          path: `reports/${cleanedProject.video.id}.json`,
          type: 'blob',
          mode: '100644',
          content: JSON.stringify(cleanedProject, null, 2)
        }
      ]
    })

    const newTreeSHA = treesRes.data.sha

    const newCommit = await octokit.request('POST /repos/:owner/:repo/git/commits', {
      owner: githubUser.login,
      repo: 'rm-reports',
      parents: [branchSHA],
      message: `upload: ${cleanedProject.video.id}\nUploaded via Repair Manual Reports App.`,
      tree: newTreeSHA
    })

    const newCommitSHA = newCommit.data.sha

    const pushToHead = await octokit.request('PATCH /repos/:owner/:repo/git/refs/:ref', {
      owner: githubUser.login,
      repo: 'rm-reports',
      ref: `heads/${currentProject.video.id}`,
      sha: newCommitSHA
    })

    return pushToHead.data
  } catch (error) {
    console.error(error)
    // TODO: POPUP ERROR MODAL.
  }
}

export async function createPullRequest (branchData: any): Promise<any> {
  const { githubUser, currentProject, octokit } = GlobalContext

  try {
    const res = await octokit.request('POST /repos/:owner/:repo/pulls', {
      owner: 'repair-manual',
      repo: 'rm-reports',
      head: `${githubUser.login as string}:${currentProject.video.id}`,
      base: 'main',
      title: `Update ${currentProject.video.id}`,
      body: `**This change was uploaded via the Repair Manual Reports App.**\n[This is the related video.](https://youtu.be/${currentProject.video.id})\nPlease check me for errors.`
    })

    window.open(res.data.html_url, '_blank')

    return res.data
  } catch (error) {
    console.error(error)
    // TODO: POPUP ERROR MODAL.
    window.open('https://www.github.com/repair-manual/rm-reports/pulls', '_blank')
  }
}

export async function getProjects (): Promise<any> {
  try {
    const res = await GlobalContext.octokit.request('GET /repos/:owner/:repo/contents/:path', {
      owner: 'repair-manual',
      repo: 'rm-reports',
      path: 'reports'
    })

    return res.data
  } catch (error) {
    console.error(error)
    // TODO: POPUP ERROR MODAL.
    return false
  }
}

export async function getFileContent (sha: string): Promise<any> {
  try {
    const res = await GlobalContext.octokit.request('GET /repos/:owner/:repo/git/blobs/:file_sha', {
      owner: 'repair-manual',
      repo: 'rm-reports',
      file_sha: sha
    })

    return res.data
  } catch (error) {
    console.error(error)
    throw error
    // TODO: POPUP ERROR MODAL.
  }
}
