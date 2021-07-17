import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import mockData from "../../../data/mockTrades";

const secret = process.env.NEXTAUTH_SECRET;

type ApiResponse = {
  spreadsheetId: String;
  valueRanges: {
    values: string[][];
  }[];
};

type CurrencyAmount = {
  amount: number;
  currency: string;
};

type BinanceTrade = {
  date: string;
  pair: string;
  side: string;
  price: number;
  executed: CurrencyAmount;
  amount: CurrencyAmount;
  fee: CurrencyAmount;
};

type Data = BinanceTrade[];

const getTradesFromApi = (apiResponse: ApiResponse) => {
  return apiResponse.valueRanges[0].values;
};

const stringToFloat = (s: string) => parseFloat(s.replace(",", ""));
const getCurrency = (s: string) => s.match("[A-Z]+")?.[0] || "";
const parseCurrencyAmount = (s: string) => ({
  currency: getCurrency(s),
  amount: stringToFloat(s),
});

const gSheetToBinanceTrades = (
  gSheetData: [string, string, string, number, string, string, string][]
) => {
  return gSheetData.slice(1).map((row) => {
    const [date, pair, side] = row;
    const price = row[3];
    const executed = parseCurrencyAmount(row[4]);
    const amount = parseCurrencyAmount(row[5]);
    const fee = parseCurrencyAmount(row[6]);

    return {
      date,
      pair,
      side,
      price,
      executed,
      amount,
      fee,
    };
  });
};

const getGSheets = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(200).json(gSheetToBinanceTrades(mockData));
  }

  const sheetId = req.query?.sheetId || process.env.DEFAULT_SHEET_ID;
  const accessToken = token.accessToken;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?ranges=A1%3AG999`;
  const { data } = await axios.get<ApiResponse>(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const trades = getTradesFromApi(data);

  return res.status(200).json(gSheetToBinanceTrades(trades));
};

export default getGSheets;
