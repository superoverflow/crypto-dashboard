import dynamic from "next/dynamic";
import dayjs from "dayjs";
import rawData from "../data/BTCUSDT";
import { OHLC } from "../components/KLineChart";
import { Balance } from "../components/BalanceCard";
import Balances from "../components/Balances";
import { getData } from "./api/binance/accountSnapshot";
import Header from "../components/Header";
import { Container, Button } from "theme-ui";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/client";
import { getPosition } from "../utils/binance";

const toDateStamp = (timestamp: number) =>
  dayjs(timestamp).format("YYYY-MM-DD");

const KLineChart = dynamic(() => import("../components/KLineChart"), {
  ssr: false,
});


export default function Home({
  btcusd,
  latestSnapshotTime,
  latestBalances,
}: {
  btcusd: OHLC[];
  latestSnapshotTime: string;
  latestBalances: Balance[];
}) {
  const [session] = useSession();
  const [tradeData, setTradeData] = useState();
  const refreshSheet = async () => {
    const tradeData = await axios.get("/api/google/sheets");
    setTradeData(tradeData);
    
  };
  const position = getPosition(tradeData)
  console.log({ session, tradeData, position });
  return (
    <Container sx={{ width: 800 }}>
      <Header />
      <Button as="button" onClick={() => refreshSheet()}>Load Data</Button>

      <h1>SnapshotTime - {latestSnapshotTime}</h1>
      <Balances balances={latestBalances} />
      <KLineChart width={800} height={600} data={btcusd} />
    </Container>
  );
}

export async function getStaticProps() {
  const btcusd: OHLC[] = rawData.map(
    (d: Omit<OHLC, "time"> & { time: number }) => {
      return {
        ...d,
        time: toDateStamp(d.time),
      };
    }
  );
  const balances = await getData(5);

  const latestBalances = balances.snapshotVos[4].data.balances;
  const latestSnapshotTime = toDateStamp(balances.snapshotVos[4].updateTime);

  return {
    props: {
      btcusd,
      latestBalances,
      latestSnapshotTime,
    },
  };
}
