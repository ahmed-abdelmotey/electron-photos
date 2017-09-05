const path = require('path');
const fs = require('fs');

const logErr = err => err && console.log(err);

let imgs = [];

exports.save = (dir , bytes, successFn)=>{
  const imgBase64 = bytes.replace(/^data:image\/png;base64,/,'');
  const imgPath = path.join(dir, `${new Date()}.png`.replace(/:/g, '-'));
  fs.writeFile(imgPath, imgBase64 , {encoding: 'base64'} , err=>{
    if (err) return logErr(err);
    successFn(imgPath);
  })
}

exports.getPicturesDir = app =>{
  return path.join(app.getPath('pictures'), 'electron-photos')
}

exports.makeImageDir = dir => {
  fs.stat(dir,(err, stats) =>{
    if(err && err.code !== 'ENOENT') return logErr(err)
    else if(err || !stats.isDirectory()) fs.mkdir(dir , logErr);
  })
}

exports.cache = imgPath =>{
  imgs.push(imgPath);
}

exports.getFromCache = index => {
  return imgs[index]
}

exports.removeImg = (imgIndex , fn)=> {
  fs.unlink(imgs[imgIndex], err => {
    if (err) logErr(err);
    imgs.splice(imgIndex , 1)
    fn();
  })
}