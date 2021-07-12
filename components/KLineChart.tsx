import { createChart } from "lightweight-charts";
import { FC, useRef, useEffect } from "react";
import dayjs from "dayjs";
import rawData from "../data/BTCUSDT";

const toDateStamp = (timestamp: number) => dayjs(timestamp).format("YYYY-MM-DD");
const data = rawData.map((d) => {
  return {
    ...d,
    time: toDateStamp(d.time),
  }
});

const KLineChart: FC<{ width: number, height: number}> = ({width, height}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartRef.current || "", {
      width,
      height,
      localization: {
        locale: "en-US",
        dateFormat:  "yyyy-MM-dd",
      },
    });
    const candlestickSeries = chart.addCandlestickSeries();
    candlestickSeries.setData(data);
  }, []);

  return <div ref={chartRef} />;
};

export default KLineChart;
