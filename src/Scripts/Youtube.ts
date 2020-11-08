import GlobalContext from './GlobalContext'

// This code loads the IFrame Player API code asynchronously.
const tag = document.createElement('script')

tag.src = 'https://www.youtube.com/iframe_api'

const firstScriptTag = document.getElementsByTagName('script')[0];

(firstScriptTag.parentNode as any).insertBefore(tag, firstScriptTag)

export function waitForIframe (): void {
  if (document.getElementById('ytplayer') !== null) {
    GlobalContext.player = new YT.Player('ytplayer', {
      events: {
        onReady: function () {
          GlobalContext.playerFirstState = true
        },
        onStateChange: function () {
          if (GlobalContext.playerFirstState) {
            GlobalContext.playerFirstState = false
          } else if (GlobalContext.player.playerInfo.currentTime !== undefined) {
            GlobalContext.currentProjectEl.projectInfo.videoStartAt = GlobalContext.player.playerInfo.currentTime.toFixed()
          }
        }
      }
    })
  } else {
    setTimeout(() => { waitForIframe() }, 100)
  }
}
