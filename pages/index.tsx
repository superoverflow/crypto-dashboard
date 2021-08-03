import { Container } from "theme-ui";
import { useQuery } from "react-query";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import rawData from "../data/BTCUSDT";
import { BinanceTrade, CurrencyAmount } from "./api/google/sheets";
import { ReturnType as PriceType } from "./api/binance/currentAveragePrice";
import TradeTable from "../components/TradeTable";
import { getPosition, getAveragePrice } from "../utils/binance";
import Balances from "../components/Balances";
import { Asset } from "../components/BalanceCard";
import { isCrypto } from "../utils/binance";
import { OHLC } from "../components/KLineChart";
import dynamic from "next/dynamic";
const KLineChart = dynamic(() => import("../components/KLineChart"), {
  ssr: false,
});
import dayjs from "dayjs";
import axios from "axios";

const toDateStamp = (timestamp: number) =>
  dayjs(timestamp).format("YYYY-MM-DD");

const getCurrentAveragePrice = async (currency: string) => {
  const { data } = await axios.get<PriceType>(
    `api/binance/currentAveragePrice?symbols=${currency}`
  );
  return data[0].price;
};

const cryptoPositions = (trades: BinanceTrade[]) => {
  const positions: CurrencyAmount[] = Object.entries(getPosition(trades)).map(
    (position) => ({
      currency: position[0],
      amount: position[1] as number,
    })
  );

  return Promise.all(
    positions
      .filter((position) => isCrypto(position.currency))
      .map(async (position) => {
        const averagePrice = getAveragePrice(trades);
        const price = await getCurrentAveragePrice(position.currency);
        return {
          currency: position.currency,
          position: position.amount,
          averagePrice: averagePrice[position.currency].averagePrice,
          cost: averagePrice[position.currency].volume,
          currentPrice: price,
        };
      })
  );
};

export default function Home({ btcusd }: { btcusd: OHLC[] }) {
  const [trades, setTrades] = useState<BinanceTrade[]>([]);

  const { data, isLoading } = useQuery(
    ["cryptoPositions", trades],
    () => cryptoPositions(trades),
  );

  return (
    <Container sx={{ bg: "background", width: 800 }}>
      <Header setTrades={setTrades} />
        <>
          {isLoading ? null : <Balances assets={data} />}
          <KLineChart width={800} height={600} data={btcusd} />
          {trades.length > 1 && <TradeTable data={trades} />}
        </>
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
