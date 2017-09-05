let timer;
const className = 'is-flashing'
module.exports = el => {
  if (el.classList.contains(className)) el.classList.remove(className)
  clearTimeout(timer);
  el.classList.add(className)
  timer = setTimeout(() => el.classList.remove(className), 2000);
}