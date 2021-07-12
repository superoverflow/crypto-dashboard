import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";
import axios from "axios";

const API_KEY: string = process.env.BINANCE_API_KEY || "";
const API_SECRET: string = process.env.BINANCE_API_SECRET || "";

const signMessage = (message: string, api_secret: string): string => {
  const signature = CryptoJS.HmacSHA256(message, api_secret).toString();
  return signature;
};

type Balance = {
  asset: string,
  free: string,
  locked: string,
}

type Data = {
  data: {
    balances: Balance []
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const serverTime = Date.now()
  const apiParam = `timestamp=${serverTime}&type=SPOT&limit=30`;
  const apiSignature = signMessage(apiParam, API_SECRET);
  const accountUrl = "https://api.binance.com/sapi/v1/accountSnapshot";
  const requestUrl = `${accountUrl}?${apiParam}&signature=${apiSignature}`;

  const { data } = await axios.get(requestUrl, {
    headers: {
      "X-MBX-APIKEY": API_KEY,
    },
  });

  return res.status(200).json({ data });
}
