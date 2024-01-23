import { setupCanvas } from './setupCanvas'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>World Editor</h1>
    <canvas id="myCanvas"></canvas>
    <div id="controls">
      <button id="button1">Add Point</button>
      <button id="button2">Add Segment</button>
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