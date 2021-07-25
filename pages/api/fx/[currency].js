import axios from "axios";

export default async function handler(req, res) {
  const { currency } = req.query;
  const requestUrl = (currency) =>
    `https://api.ofx.com/PublicSite.ApiService/SpotRateHistory/6month/USD/${currency}?DecimalPlaces=6&ReportingInterval=daily`;

  const { data } = await axios.get(requestUrl(currency));

  const result = data.HistoricalPoints.map((dailyRate) => {
    return {
      date: dailyRate.PointInTime,
      rate: dailyRate.InterbankRate,
    };
  });

  return res.status(200).json(result);
}
