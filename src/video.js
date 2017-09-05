const constraints = {
  audio:false,
  video: {
    width: { min: 853, ideal: 853, max: 853 },
    height: { min: 480, ideal: 480, max: 480 },
    frameRate: { ideal: 10, max: 15 } 
  }
}

function handleSuccess(videoEl , stream){
  videoEl.src = window.URL.createObjectURL(stream);
}

exports.init = (nav , videoEl) => {
  nav.mediaDevices.getUserMedia(constraints)
  .then( stream => handleSuccess(videoEl, stream))
  .catch( err =>{ console.log('camera error : ' + err) })
}

exports.captureBytes = (videoEl , ctx , canvasEl) => {
  ctx.drawImage (videoEl , 0 , 0);
  return canvasEl.toDataURL('image/png')
}

exports.captureBytesFromLiveCanvas = canvas => {
  return canvas.toDataURL('image/png')
}