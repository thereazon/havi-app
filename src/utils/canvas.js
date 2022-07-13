export const isCanvasEmpty = (canvas) => {
  let blank = document.createElement('canvas')
  blank.width = canvas.width
  blank.height = canvas.height
  return canvas.toDataURL() == blank.toDataURL()
}

export const getCanvasToImage = (canvas) => {
  return canvas.toDataURL('image/png')
}
