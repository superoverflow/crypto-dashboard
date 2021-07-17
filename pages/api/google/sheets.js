import { getToken } from "next-auth/jwt";
import axios from "axios";

const secret = process.env.NEXTAUTH_SECRET;

const getGSheets = async (req, res) => {
  const token = await getToken({ req, secret });
  const sheetId = req.query?.sheetId || process.env.DEFAULT_SHEET_ID;
  const accessToken = token.accessToken;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet`;
  const result = await axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  res.status(200).json(result.data);
};

export default getGSheets;
