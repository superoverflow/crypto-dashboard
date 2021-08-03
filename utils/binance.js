import { includes } from "lodash";

export const getPosition = (tradeData) => {
  return tradeData.reduce((balances, trade) => {
    const sign = trade.side === "BUY" ? 1 : -1;
    const tradeCurrency = trade.executed.currency;
    const tradeAmount = trade.executed.amount;
    const currentBalance = balances?.[tradeCurrency] || 0;

    const feeCurrency = trade.fee.currency;
    const feeAmount = trade.fee.amount;

    const newBalance =
      currentBalance +
      sign * tradeAmount -
      (feeCurrency === tradeCurrency ? feeAmount : 0);

    return {
      ...balances,
      ...Object.fromEntries([[tradeCurrency, newBalance]]),
    };
  }, {});
};

const STABLE_COINS = ["USDC", "USDT", "BUSD"];
const FIAT_CURRENCIES = [...STABLE_COINS, "USD", "GBP", "EUR"];
export const isCrypto = (currency) => {
  return !includes(FIAT_CURRENCIES, currency);
};

export const getAveragePrice = (tradeData) => {
  return tradeData.reduce((averageCost, trade) => {
    const asset = trade.executed.currency;
    const sign = trade.side === "BUY" ? 1 : -1;
    const fx =
      trade.amount.currency === "GBP"
        ? (1/0.72)
        : trade.amount.currency === "EUR"
        ? (1/0.84)
        : 1;
    const volume = fx * sign * trade.amount.amount;
    const price = fx * parseFloat(trade.price.toString().replace(",", ""))
    const currentVolume = averageCost?.[asset]?.volume || 0;
    const currentAveragePrice = averageCost?.[asset]?.averagePrice || 0;
    const newVolume = currentVolume + volume;
    const newAveragePrice =
      (currentVolume * currentAveragePrice +
        volume * price ) /
      newVolume;

    return {
      ...averageCost,
      ...Object.fromEntries([
        [asset, { averagePrice: newAveragePrice, volume: newVolume }],
      ]),
    };
  }, {});
};
