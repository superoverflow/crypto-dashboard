export const getPosition = (tradeData) => {
  return tradeData?.data?.reduce((balances, trade) => {
    const sign = trade.side === "BUY" ? 1 : -1;
    const currency = trade.executed.currency;
    const amount = trade.executed.amount;
    const balance = balances?.[currency] || 0;
    const newBalance = balance + sign * amount;
    return { ...balances, ...Object.fromEntries([[currency, newBalance]]) };
  }, {});
};


const getAverageCost = (tradeData, fxRate) => {
    return null
  }
  