function getNumberAndDecimal(n) {
  let nF = n;
  if (n < 0) {
    nF *= -1;
  }
  const number = Math.floor(nF);
  const decimal = Number((nF % 1).toFixed(2).slice(2));
  return {
    number: n < 0 ? number * -1 : number,
    decimal,
  };
}
module.exports = getNumberAndDecimal;
