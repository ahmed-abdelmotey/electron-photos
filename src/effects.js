function connectEffect(seriously, src , target, effect){
  effect.source = src;
  target.source = effect;
  seriously.go();   
}

const effects = {
  vanilla: (seriously, src , target)=> {
    target.source = src;
    seriously.go();
  },
  ascii: (seriously, src , target)=> {
    const ascii = seriously.effect('ascii');
    connectEffect (seriously, src , target, ascii) ;
  },
  daltonize: (seriously, src , target)=> {
    const daltonize = seriously.effect('daltonize');
    daltonize.type = '0.8'
    connectEffect (seriously, src , target, daltonize) ;
  },
  hex: (seriously, src , target)=> {
    const hex = seriously.effect('hex');
    hex.size = 0.03
    connectEffect (seriously, src , target, hex) ;
  },
}
const effectNames = Object.keys(effects);
let curIndex = 0;

function setNextEffect(){
  curIndex = curIndex + 1 < effectNames.length ? curIndex + 1 : 0;
  return curIndex;
}

function setIndexToEffect(effectName) {
  curIndex = effectNames.indexOf(effectName);
  return curIndex;
}
exports.choose = (seriously , src , target, name = 'vanilla')=> {
  effects[name](seriously , src , target)
  setIndexToEffect(name)
}

exports.cycle = (seriously , src , target) => {
  let index = setNextEffect();
  effects[effectNames[index]](seriously , src , target)
}