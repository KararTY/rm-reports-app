import LeftMenu from './Components/LeftMenu/Index'
import ProjectItemList from './Components/LeftMenu/ProjectItemList'
import Icon from './Components/Misc/Icon'
import Modal from './Components/Modal/Index'
import DownloadProjectModal from './Components/Modal/Modals/DownloadProject'
import FormatProjectModal from './Components/Modal/Modals/FormatProject'
import LogModal from './Components/Modal/Modals/Log'
import SettingsModal from './Components/Modal/Modals/Settings'
import UploadProjectModal from './Components/Modal/Modals/UploadProject'
import Input from './Components/Project/Fields/Input'
import Textarea from './Components/Project/Fields/Textarea'
import Project from './Components/Project/Index'
import IssueElement from './Components/Project/Issue'
import Root from './Components/Root/Index'
import TopNavbar from './Components/TopNavbar/Index'
import Video from './Components/Video/Index'

import './Scripts/Youtube'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
customElements.whenDefined('uce-lib').then(({ define }: any = customElements.get('uce-lib')) => {
  define('rm-root', Root)

  define('rm-icon', Icon)

  define('rm-top-navbar', TopNavbar)

  define('rm-left-menu', LeftMenu)

  define('rm-project', Project)

  define('rm-project-item-list', ProjectItemList)

  define('rm-project-issue', IssueElement)

  define('rm-field-textarea', Textarea)
  define('rm-field-input', Input)

  define('rm-youtube-video', Video)

  define('rm-modal', Modal)
  define('rm-modal-upload-project', UploadProjectModal)
  define('rm-modal-download-project', DownloadProjectModal)
  define('rm-modal-format-project', FormatProjectModal)
  define('rm-modal-settings', SettingsModal)
  define('rm-modal-logs', LogModal)
})
