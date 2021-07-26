import { Container } from "theme-ui";
import Header from "../components/Header";
import { useState } from "react";
import { BinanceTrade } from "./api/google/sheets";

const Home = () => {
  const [trades, setTrades] = useState<BinanceTrade[]>([]);

  console.log({trades})
  return (
    <Container sx={{ bg: "background", width: 1200}}>
      <Header setTrades={setTrades}/>
      { trades &&  <text>loaded</text> }
    </Container>
  );
};

export default Home;
