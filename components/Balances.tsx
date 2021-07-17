import { FC } from "react";
import { Flex } from "theme-ui";
import BalanceCard, { Balance, floatAdd } from "./BalanceCard";

const USD = ["USD", "USDT", "BUSD", "USDC"];
const usdReducer = (accumulator: Balance, currentValue: Balance) => ({
  asset: "USD",
  free: USD.includes(currentValue.asset)
    ? parseFloat(currentValue.free) + parseFloat(accumulator.free)
    : parseFloat(accumulator.free),
  locked: USD.includes(currentValue.asset)
    ? parseFloat(currentValue.locked) + parseFloat(accumulator.locked)
    : parseFloat(accumulator.locked),
});

const filterUsd = (balance: Balance) => USD.includes(balance.asset);
const filterSmallBalance = (balance: Balance) =>
  parseFloat(balance.free) + parseFloat(balance.locked) < 0.0001;

const balanceFilter = (balance: Balance) => !filterUsd(balance) && !filterSmallBalance(balance)

const Balances: FC<{ balances: Balance[] }> = ({ balances }) => {
  const usd = balances.reduce(usdReducer, { asset: "USD", free: 0, locked: 0 });

  return (
    <Flex>
      {balances.map((balance, index) =>
        balanceFilter(balance) ? (
          <BalanceCard key={index} balance={balance} />
        ) : null
      )}
      <BalanceCard balance={usd} />
    </Flex>
  );
};

export default Balances;
