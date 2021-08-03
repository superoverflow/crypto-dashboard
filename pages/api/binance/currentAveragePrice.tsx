import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  price: string;
};

export const getData = async (symbol: string) => {
  const apiParam = `symbol=${symbol}USDT`;
  const accountUrl = "https://api.binance.com/api/v3/avgPrice";
  const requestUrl = `${accountUrl}?${apiParam}`;

  const { data } = await axios.get<Data>(requestUrl);
  return parseFloat(data.price);
};

export type ReturnType = {
  currency: string;
  price: number;
}[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnType>
) {
  const { symbols } = req.query;

  const data = await Promise.all(
    (symbols as string).split(",").map(async (symbol) => {
      const price = await getData(symbol);
      return {
        currency: symbol,
        price,
      };
    })
  );

  return res.status(200).json(data);
}
