const N_WORKERS = 4
const DATA_LENGTH = 1024
const TypedArray = Uint16Array

const buffer = new SharedArrayBuffer(DATA_LENGTH * TypedArray.BYTES_PER_ELEMENT)
const data = new TypedArray(buffer)
for (let i = 0; i < data.length; ++i) {
  data[i] = i + 1
}
data.sort(() => Math.random() - 0.5)  // shuffle data

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const size = data.length
canvas.width  = size
canvas.height = size
context.lineWidth = 1
context.strokeStyle = 'white'

const render = () => {
  context.clearRect(0, 0, size, size)
  context.beginPath()
  for (const [i, n] of data.entries()) {
    // substract x-coordicate by 0.5, because canvas' coordicate is aligned to edges of each pixels
    context.moveTo(i - 0.5, size)
    context.lineTo(i - 0.5, size - n)
  }
  context.stroke()
  window.requestAnimationFrame(render)
}

const idles = []
const queue = []
for (let i = 0; i < N_WORKERS; ++i) {
  const worker = new Worker('./worker.js')

  worker.onmessage = ev => {
    if (ev.data !== undefined) {
      queue.push(...ev.data)
    }
    idles.push(worker)
    while (idles.length > 0 && queue.length > 0) {
      idles.pop().postMessage(queue.pop())
    }

    if (idles.length === N_WORKERS && queue.length === 0) {
      for (const worker of idles) {
        worker.terminate()
      }
      window.alert('done')
    }
  }

  idles.push(worker)
}

window.requestAnimationFrame(render)
idles.pop().postMessage(data)

// vim: set ts=2 sw=2 et:
