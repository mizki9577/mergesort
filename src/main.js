const buffer = new SharedArrayBuffer(2**10 * Uint32Array.BYTES_PER_ELEMENT)
const data = new Uint32Array(buffer)
for (let i = 0; i < data.length; ++i) {
  data[i] = i + 1
}
data.sort(() => Math.random() - 0.5)  // shuffle data

const canvas = document.getElementById('canvas')
const size = data.length
canvas.width  = size
canvas.height = size

const context = canvas.getContext('2d')
context.lineWidth = 1
context.strokeStyle = 'white'

const frame = () => {
  context.clearRect(0, 0, size, size)
  context.beginPath()
  for (const [i, n] of data.entries()) {
    // substract x-coordicate by 0.5, because canvas' coordicate is aligned to edges of each pixels
    context.moveTo(i - 0.5, size)
    context.lineTo(i - 0.5, size - n)
  }
  context.stroke()
  window.requestAnimationFrame(frame)
}

const worker = new Worker('./worker.js')
worker.postMessage(data)

window.requestAnimationFrame(frame)

// vim: set ts=2 sw=2 et:
