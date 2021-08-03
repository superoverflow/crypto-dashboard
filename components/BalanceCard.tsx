import { FC } from "react";
import { Flex, Image } from "theme-ui";
import { symbol } from "./TradeTable";

const SymbolIcon: FC<{ symbol: string }> = ({ symbol }) => (
  <Image
    src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/icon/${symbol.toLowerCase()}.png`}
    alt={symbol}
  />
);

export type Asset = {
  currency: string;
  position: number;
  averagePrice: number;
  cost: number;
  currentPrice: number;
};

const BalanceCard: FC<{ asset: Asset }> = ({ asset }) => {
  return (
    <Flex sx={{ p: 2, minWidth: 160 }}>
      <Flex sx={{ alignItems: "center", px: 2 }}>
        <SymbolIcon symbol={asset.currency} />
      </Flex>
      <Flex sx={{ flexDirection: "column" }}>
        <Flex sx={{ justifyContent: "center" }}>
          {symbol[asset.currency] + asset.position.toFixed(4)}
        </Flex>
        <Flex sx={{ justifyContent: "center" }}>
          ${asset.averagePrice.toFixed(2)}
        </Flex>
        <Flex sx={{ justifyContent: "center" }}>
          ${asset.cost.toFixed(2)}
        </Flex>
        <Flex sx={{ justifyContent: "center" }}>
          ${asset.currentPrice.toFixed(2)}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BalanceCard;
