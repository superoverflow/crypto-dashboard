import { FC } from "react";
import { Flex } from "theme-ui";
import BalanceCard, { Asset } from "./BalanceCard";

const Balances: FC<{ assets: Asset[] }> = ({ assets }) => {
  return (
    <Flex sx={{ width: "100%", justifyContent: "space-between"}}>
      {assets.map((asset, index) => (
        <BalanceCard key={index} asset={asset} />
      ))}
    </Flex>
  );
};

export default Balances;
