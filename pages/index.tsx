import dynamic from "next/dynamic";
import dayjs from "dayjs";
import rawData from "../data/BTCUSDT";
import { OHLC } from "../components/KLineChart";
import BalanceCard, { Balance } from "../components/BalanceCard";
import { getData } from "./api/binance/accountSnapshot";

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
  return (
    <>
      <h1>SnapshotTime - {latestSnapshotTime}</h1>
      {latestBalances.map((balance, index) => {
        return <BalanceCard key={index} balance={balance} />;
      })}

      <KLineChart width={800} height={600} data={btcusd} />
    </>
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
