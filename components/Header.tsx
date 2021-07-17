import { signIn, signOut, useSession } from "next-auth/client";
import { FC } from "react";
import { Flex, Button, Image } from "theme-ui";

const Header: FC = () => {
  const [session] = useSession();

  return (
    <Flex sx={{ bg: "muted", flexDirection: "row-reverse" }}>
      {!session && <Button onClick={() => signIn()}>Sign In</Button>}
      {session && (
        <Image
          alt="profile pic"
          src={session.user?.image || ""}
          sx={{ width: 50, height: 50 }}
          onClick={() => signOut()}
        />
      )}
    </Flex>
  );
};

export default Header;
