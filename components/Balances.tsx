import { FC } from "react";
import { Flex } from "theme-ui";
import BalanceCard from "./BalanceCard";
import { CurrencyAmount } from "../pages/api/google/sheets";

const Balances: FC<{ assets: CurrencyAmount[] }> = ({ assets }) => {
  return (
    <Flex sx={{ width: "100%", justifyContent: "space-between"}}>
      {assets.map((asset, index) => (
        <BalanceCard key={index} asset={asset} />
      ))}
    </Flex>
  );
};

export default Balances;
