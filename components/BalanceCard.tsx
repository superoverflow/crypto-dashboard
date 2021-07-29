import { FC } from "react";
import { Card, Flex, Image } from "theme-ui";
import { CurrencyAmount } from "../pages/api/google/sheets";

const SymbolIcon: FC<{ symbol: string }> = ({ symbol }) => (
  <Image
    src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/icon/${symbol.toLowerCase()}.png`}
    alt={symbol}
  />
);

const BalanceCard: FC<{ asset: CurrencyAmount }> = ({ asset }) => {
  return (
    <Card sx={{ p: 2, minWidth: 120 }}>
      <Flex sx={{ justifyContent: "center" }}>
        <SymbolIcon symbol={asset.currency} />
      </Flex>
      <Flex sx={{ justifyContent: "center" }}>
        {asset.amount.toFixed(4)}
      </Flex>
    </Card>
  );
};

export default BalanceCard;
