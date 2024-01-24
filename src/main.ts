import { setupCanvas } from './setupCanvas'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>World Editor</h1>
    <canvas id="myCanvas"></canvas>
    <div id="controls">
    </div>
  </div>
`
// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
// start coding from here //
setupCanvas();