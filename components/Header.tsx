import { signIn, signOut, useSession } from "next-auth/client";
import { FC } from "react";
import { Avatar, Flex, Button, Input } from "theme-ui";
import { Dispatch, SetStateAction } from "react";
import { BinanceTrade } from "../pages/api/google/sheets";
import axios from "axios";

const Header: FC<{ setTrades: Dispatch<SetStateAction<BinanceTrade[]>> }> = ({
  setTrades,
}) => {
  const [session] = useSession();
  const loadAndSetTrades = async () => {
    const { data } = await axios.get<BinanceTrade[]>("api/google/sheets")
    setTrades(data)
  }
  return (
    <Flex sx={{ bg: "muted", flexDirection: "row-reverse", gap: 3 }}>
      {!session && <Button onClick={() => signIn()}>Sign In</Button>}
      {session && (
        <>
          <Avatar
            alt="profile pic"
            src={session.user?.image || ""}
            onClick={() => signOut()}
          />
          <Button
            sx={{ minWidth: 140 }}
            onClick={() => loadAndSetTrades()}
          >
            Load Trades
          </Button>
          <Input
            placeholder="Paste Google Sheet export of Binance Trades here"
            sx={{ flexGrow: 1 }}
          ></Input>
        </>
      )}
    </Flex>
  );
};

export default Header;
