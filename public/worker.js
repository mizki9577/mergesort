self.importScripts('./mergesort.js')

self.onmessage = ev => {
  self.setTimeout(() => {
    const ptr = Module._malloc(ev.data.length * ev.data.BYTES_PER_ELEMENT)
    Module.HEAPU8.set(ev.data, ptr)
    Module.ccall('quick_sort')
    Module._free(ptr)
  }, 1000)
}

// vim: set ts=2 sw=2 et:
