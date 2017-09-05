// navigator.getUserMedia = navigator.webkitGetUserMedia;
const electron = require('electron');
const {ipcRenderer , shell , remote}= electron;

const images = remote.require('./images');
const flash = require('./flash')
const video = require('./video');
const countDown = require('./countDown');
const effects = require('./effects')
let canvasTarget;
let seriously;
let videoSrc;


function formatImgTag(doc , bytes){
  const div = doc.createElement('div');
  div.classList.add('photo');
  const close = doc.createElement('div');
  close.classList.add('photoClose');
  const img = new Image();
  img.classList.add('photoImg');
  img.src = bytes;

  div.appendChild(img);
  div.appendChild(close);
  return div;
}

window.addEventListener('DOMContentLoaded', ()=>{
  // get all elements 
  const videoEl = document.getElementById('video');
  const canvasEl = document.getElementById('canvas');
  const recordEl = document.getElementById('record');
  const photoEl = document.querySelector('.photosContainer');
  const counterEl = document.getElementById('counter');
  const flashEl = document.getElementById('flash')
  
  // const ctx = canvasEl.getContext('2d')

  seriously = new Seriously();
  videoSrc = seriously.source('#video')
  canvasTarget = seriously.target('#canvas')
  
  effects.choose(seriously , videoSrc , canvasTarget)
  
  video.init(navigator, videoEl)

  photoEl.addEventListener('click', (evt)=>{

    const isRm = evt.target.classList.contains('photoClose');
    const selector = isRm ? '.photoClose' : '.photoImg'

    const photos = Array.from(document.querySelectorAll(selector))
    const imgIndex = photos.findIndex(el => el == evt.target)

    if (isRm) ipcRenderer.send('image-remove', imgIndex)      
    else shell.showItemInFolder(images.getFromCache(imgIndex));
  })


  recordEl.addEventListener('click', ()=>{
    countDown.start(counterEl, 3 , ()=>{
      flash(flashEl);
      // const bytes = video.captureBytes(videoEl , ctx , canvasEl);
      const bytes = video.captureBytesFromLiveCanvas(canvasEl);
      ipcRenderer.send('image-capture', bytes)
      photoEl.appendChild(formatImgTag(document, bytes))
    })
  })
})

ipcRenderer.on('image-removed', (evt, index)=>{
  document.getElementById('photos').removeChild(Array.from(document.querySelectorAll('.photo'))[index])
})

ipcRenderer.on('effect-choose', (evt , name)=> {
  effects.choose(seriously,videoSrc , canvasTarget, name);
})

ipcRenderer.on('effect-cycle' , evt => {
  effects.cycle(seriously, videoSrc , canvasTarget)
})