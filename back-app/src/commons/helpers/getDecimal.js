function getNumberAndDecimal(n) {
  const number = Math.floor(n);
  const decimal = (n % 1).toFixed(2).slice(2);
  return {
    number,
    decimal,
  };
}
module.exports = getNumberAndDecimal;