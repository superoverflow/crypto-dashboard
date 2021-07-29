import { Container } from "theme-ui";
import Header from "../components/Header";
import { useState } from "react";
import rawData from "../data/BTCUSDT";
import { BinanceTrade, CurrencyAmount } from "./api/google/sheets";
import TradeTable from "../components/TradeTable";
import { getPosition } from "../utils/binance";
import Balances from "../components/Balances";
import { isCrypto } from "../utils/binance";
import { OHLC } from "../components/KLineChart";
import dynamic from "next/dynamic";
const KLineChart = dynamic(() => import("../components/KLineChart"), {
  ssr: false,
});
import dayjs from "dayjs";

const toDateStamp = (timestamp: number) =>
  dayjs(timestamp).format("YYYY-MM-DD");

export default function Home({ btcusd }: { btcusd: OHLC[] }) {
  const [trades, setTrades] = useState<BinanceTrade[]>([]);
  const positions: CurrencyAmount[] = Object.entries(getPosition(trades)).map(
    (position) => ({
      currency: position[0],
      amount: position[1] as number,
    })
  );
  const cryptoPositions = positions.filter((position) =>
    isCrypto(position.currency)
  );

  return (
    <Container sx={{ bg: "background", width: 800 }}>
      <Header setTrades={setTrades} />

      {trades.length > 1 && (
        <>
          <Balances assets={cryptoPositions} />
          <KLineChart width={800} height={600} data={btcusd} />
          <TradeTable data={trades} />
        </>
      )}
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
  return {
    props: {
      btcusd,
    },
  };
}
