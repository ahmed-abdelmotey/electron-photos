function setCount(counterEl , count){
  counterEl.innerText = count > 0 ? count : '';
}

exports.start = (counterEl , count , fn)=>{
  for (let i = 0; i  <= count; i++) {
    setTimeout(()=>{
      const curCount = count - i;
      setCount(counterEl , curCount)
      if (i === count) fn();
    }, i * 1000)
  }
}