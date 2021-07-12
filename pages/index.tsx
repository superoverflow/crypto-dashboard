import dynamic from "next/dynamic";
import dayjs from "dayjs";
import btcusdt from "../data/BTCUSDT";
import { OHLC } from "../components/KLineChart";

const toDateStamp = (timestamp: number) =>
  dayjs(timestamp).format("YYYY-MM-DD");

const KLineChart = dynamic(() => import("../components/KLineChart"), {
  ssr: false,
});

export default function Home({data}:{data: OHLC[]}) {
  return (
    <>
      <h1>lightweight chart</h1>
      <KLineChart width={800} height={600} data={data} />
    </>
  );
}

export async function getStaticProps() {
  const data: OHLC[] = btcusdt.map(
    (d: Omit<OHLC, "time"> & { time: number }) => {
      return {
        ...d,
        time: toDateStamp(d.time),
      };
    }
  );
  
  return {
    props: {
      data,
    },
  };
}
