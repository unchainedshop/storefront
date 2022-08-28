const isNumber = (value) => {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value);
  }
  return NaN;
};

const renderPrice = (
  args: {
    amount?: number;
    currency?: string;
    addBTCFraction?: boolean;
  } = {},
): string => {
  const { currency = null, amount = null } = args || {};
  if (Number.isNaN(isNumber(amount))) return null;

  return `${currency ?? ''} ${amount}`;
};

export default renderPrice;
