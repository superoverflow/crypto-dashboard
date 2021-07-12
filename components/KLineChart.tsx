import { createChart } from "lightweight-charts";
import { FC, useRef, useEffect } from "react";

export type OHLC = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

const KLineChart: FC<{ width: number; height: number; data: OHLC[] }> = ({
  width,
  height,
  data,
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartRef.current || "", {
      width,
      height,
      localization: {
        locale: "en-US",
        dateFormat: "yyyy-MM-dd",
      },
    });
    const candlestickSeries = chart.addCandlestickSeries();
    candlestickSeries.setData(data);
  }, [width, height, data]);

  return <div ref={chartRef} />;
};

export default KLineChart;
