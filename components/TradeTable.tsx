/** @jsxImportSource theme-ui */
import { useTable, Column } from "react-table";
import React, { FC } from "react";
import { Flex } from "theme-ui";
import { BinanceTrade, CurrencyAmount } from "../pages/api/google/sheets";
import dayjs from "dayjs";

const symbol = Object.fromEntries([
  ["BTC", "₿"],
  ["ETH", "Ξ"],
  ["ADA", "₳"],
  ["DOGE", "Ð"],
  ["EOS", "ε"],
  ["USD", "$"],
  ["USDT", "$"],
  ["USDC", "$"],
  ["BUSD", "$"],
  ["GBP", "£"],
  ["EUR", "€"],
]);

const CurrencyCell: FC<{ value: CurrencyAmount }> = ({ value }) => {
  return (
    <Flex sx={{ alignItems: "stretch" }}>
      <div sx={{ flexGrow: 1 }}>
        {symbol?.[value.currency] || value.currency}
      </div>
      <div>{value.amount.toFixed(4)}</div>
    </Flex>
  );
};

const SideCell: FC<{ value: string }> = ({ value }) => {
  return <div>{value === "BUY" ? "B" : "S"}</div>;
};

const RightAlignCell: FC<{value: string}> = ({value}) => {
    return <div sx={{textAlign: "right"}}>{value}</div>
}

const DateCell: FC<{value: string}> = ({value}) => {
    return <div>{dayjs(value).format('YYYY-MM-DD HH:mm')}</div>
}

const columns: Column<BinanceTrade>[] = [
  {
    Header: "Date",
    accessor: "date",
    Cell: DateCell
  },
  {
    Header: "Pair",
    accessor: "pair",
  },
  {
    Header: "Side",
    accessor: "side",
    Cell: SideCell,
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: RightAlignCell,
  },
  {
    Header: "Executed",
    accessor: "executed",
    Cell: CurrencyCell,
  },
  {
    Header: "Amount",
    accessor: "amount",
    Cell: CurrencyCell,
  },
  {
    Header: "Fee",
    accessor: "fee",
    Cell: CurrencyCell,
  },
];


const TradeTable: FC<{ data: BinanceTrade[] }> = ({ data }) => {
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <th sx={{ p: 2 }} key={index} {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr key={index} {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
                  <td sx={{ p: 2 }} key={index} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TradeTable;