exports.numberFormatter = (number) => {
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(number);
};