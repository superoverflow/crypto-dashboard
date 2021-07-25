import { signIn, signOut, useSession } from "next-auth/client";
import { FC } from "react";
import { Avatar, Flex, Button, Input } from "theme-ui";

const Header: FC = () => {
  const [session] = useSession();

  return (
    <Flex sx={{ bg: "muted", flexDirection: "row-reverse", gap: 3 }}>
      {!session && <Button onClick={() => signIn()}>Sign In</Button>}
      {session && (
        <>
          <Avatar
            alt="profile pic"
            src={session.user?.image || ""}
            sx={{ width: 40, height: 40 }}
            onClick={() => signOut()}
          />
          <Button onClick={() => console.log("setTrade")}>Load Trades</Button>
          <Input
            placeholder="Paste Google Sheet export of Binance Trades here"
            sx={{ width: "auto" }}
          ></Input>
        </>
      )}
    </Flex>
  );
};

export default Header;
