onmessage = ({ data }) => {
  let left = 0
  let right = data.length - 1
  let pivod = data[right]
  let temp

  while (true) {
    while (data[left] < pivod) {
      ++left
    }

    while (pivod < data[right]) {
      --right
    }

    if (left < right) {
      const d = Date.now()
      while (Date.now() < d + 1) { }

      temp = data[left]
      data[left] = data[right]
      data[right] = temp
      ++left
      --right
    } else break
  }

  if (1 < left) {
    postMessage(data.subarray(0, left))
  }
  if (left < data.length - 1) {
    postMessage(data.subarray(left, data.length))
  }
  postMessage(null)
}

// vim: set ts=2 sw=2 et:
