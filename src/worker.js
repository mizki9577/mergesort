const quick_sort = data => {
  if (data.length <= 1) {
    return
  }

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

  return [data.subarray(0, left), data.subarray(left, data.length)]
}

onmessage = ev => {
  postMessage(quick_sort(ev.data))
}

// vim: set ts=2 sw=2 et:
