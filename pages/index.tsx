import { Container } from "theme-ui";
import Header from "../components/Header";
import { useState } from "react";
import { BinanceTrade } from "./api/google/sheets";
import TradeTable from "../components/TradeTable";

const Home = () => {
  const [trades, setTrades] = useState<BinanceTrade[]>([]);

  console.log({trades})
  return (
    <Container sx={{ bg: "background", width: 800}}>
      <Header setTrades={setTrades}/>
        {trades && <TradeTable data={trades} />}
    </Container>
  );
};

export default Home;
