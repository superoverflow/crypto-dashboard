import dynamic from "next/dynamic";
import dayjs from "dayjs";
import rawData from "../data/BTCUSDT";
import { OHLC } from "../components/KLineChart";
import { getData } from "./api/binance/accountSnapshot";

const toDateStamp = (timestamp: number) =>
  dayjs(timestamp).format("YYYY-MM-DD");

const KLineChart = dynamic(() => import("../components/KLineChart"), {
  ssr: false,
});

export default function Home({
  btcusd,
  latestSnapshotTime,
}: {
  btcusd: OHLC[];
  latestSnapshotTime: string;
}) {
  return (
    <>
      <h1>SnapshotTime - {latestSnapshotTime}</h1>
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
  console.log(latestBalances)
  return {
    props: {
      btcusd,
      latestBalances,
      latestSnapshotTime,
    },
  };
}
