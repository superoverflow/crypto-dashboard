import { FC } from "react";
import { Card, Flex } from "theme-ui";

export type Balance = {
  asset: string;
  free: string;
  locked: string;
};

const BalanceCard: FC<{ balance: Balance }> = ({ balance }) => {
  return (
    <Card>
      <Flex>{balance.asset}</Flex>
      <Flex>{parseInt(balance.free) + parseInt(balance.locked)}</Flex>
    </Card>
  );
};

export default BalanceCard
