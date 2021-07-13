import { FC } from "react";
import { Card, Flex, Image } from "theme-ui";

export type Balance = {
  asset: string;
  free: string;
  locked: string;
};

export const floatAdd = (a: string, b: string) =>
  (parseFloat(a) + parseFloat(b)).toFixed(4);

const SymbolIcon: FC<{ symbol: string }> = ({ symbol }) => (
  <Image
    src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/icon/${symbol.toLowerCase()}.png`}
    alt={symbol}
  />
);

const BalanceCard: FC<{ balance: Balance }> = ({ balance }) => {
  return (
    <Card sx={{ p: 2, minWidth: 120 }}>
      <Flex sx={{ justifyContent: "center" }}>
        <SymbolIcon symbol={balance.asset} />
      </Flex>
      <Flex sx={{ justifyContent: "center" }}>
        {floatAdd(balance.free, balance.locked)}
      </Flex>
    </Card>
  );
};

export default BalanceCard;
