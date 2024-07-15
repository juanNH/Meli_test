import { formatNumber } from "./formatNumber";
export const priceFormat = (amount, decimals) => {
  const price =
    decimals === 0
      ? formatNumber(amount)
      : formatNumber(amount) + "," + decimals.toString();
  return price;
};
