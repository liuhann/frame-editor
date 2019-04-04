import { getElementStyle } from 'style-editor/src/utils/styles'
let myReuseableStylesheet = document.createElement('style')
document.head.appendChild(myReuseableStylesheet)
function addKeyFrames (name, frames) {
  let pos = myReuseableStylesheet.length
  myReuseableStylesheet.insertRule('@keyframes ' + name + '{' + frames + '}', pos)
}

/**
  animation: focus-in-expand-fwd 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
 * @param animation
 */
function addAnimation (animation) {
  let pos = myReuseableStylesheet.length
  myReuseableStylesheet.insertRule(`.${animation.name} {
    animation: ${animation.name} ${animation.duration}ms ${animation.timing} ${animation.infinite ? 'infinite': animation.iteration} both
  }`, pos)
}
function generateKeyFrames (frames) {
  const framesInline = []
  for (let frame of frames) {
    framesInline.push(`${frame.percent}%{${getElementStyle(frame)}`)
  }
  return framesInline.join('')
}

function refreshStyle () {
  document.head.removeChild(myReuseableStylesheet)
  myReuseableStylesheet = document.createElement('style')
  document.head.appendChild(myReuseableStylesheet)
}

function generateStyleClass (animation) {
  addAnimation(animation)
  addKeyFrames(animation.name, generateKeyFrames(animation.frames))
}
export {
  addKeyFrames,
  refreshStyle,
  generateStyleClass
}
