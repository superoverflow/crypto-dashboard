import { includes } from "lodash"

export const getPosition = (tradeData) => {
  return tradeData.reduce((balances, trade) => {
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
  
const STABLE_COINS = [ "USDC", "USDT", "BUSD"]
const FIAT_CURRENCIES = [ ...STABLE_COINS, "USD", "GBP", "EUR"]
export const isCrypto = (currency) => {
  return !includes(FIAT_CURRENCIES, currency)
}