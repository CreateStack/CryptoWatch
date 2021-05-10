const getPrice = (price = 0, rate = 1, unit = 'USD', decimal = 2) => {
  if (price === null || price === undefined) return 0;
  if (unit === 'USD') return Number(price).toFixed(decimal);
  return Number(Number(price) * Number(rate)).toFixed(decimal);
};

export default getPrice;
