/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
/** @jsxImportSource theme-ui */
import accounting from "accounting";
import { FC } from "react";
import { Flex, Box } from "theme-ui";
import { SymbolIcon, Asset } from "./BalanceCard";
import { useTable, Column } from "react-table";

const USDCell: FC<{ value: number }> = ({ value }) => {
  return (
    <Flex>
      <Box sx={{ flexGrow: 1}}>$</Box>
      <Box>{accounting.formatNumber(value, 2)}</Box>
    </Flex>
    );
};

const columns: Column<Asset>[] = [
  {
    Header: "Asset",
    accessor: "currency",
    Cell: ({ value }) => <SymbolIcon symbol={value} />,
  },
  {
    Header: "Position",
    accessor: "position",
    Cell: ({ value }) => (
      <div sx={{ textAlign: "right" }}>{value.toFixed(6)}</div>
    ),
  },
  {
    Header: "Avg Price",
    accessor: "averagePrice",
    Cell:USDCell
  },
  {
    Header: "Cost",
    accessor: "cost",
    Cell: USDCell
  },
  {
    Header: "Current Price",
    accessor: "currentPrice",
    Cell: USDCell
  },
  {
    Header: "P&L",
    id: "pnl",
    Cell: ({row}) => {
      const { position, averagePrice, currentPrice} = row.original
      const pnl = (currentPrice - averagePrice) * position
      return <USDCell value={pnl} />
    }
  },
  {
    Header: "P&L%",
    id: "pnlPercent",
    Cell: ({row}) => {
      const { position, averagePrice, currentPrice, cost} = row.original
      const percent = (currentPrice - averagePrice) * position / cost * 100
      return <div sx={{textAlign: "right"}}>{percent.toFixed(2)}%</div>
    }
  },
];

const Balances: FC<{ assets: Asset[] }> = ({ assets }) => {
  const tableInstance = useTable({ columns, data: assets });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const table = (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th sx={{ p: 2 }} {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td sx={{ p: 2 }} {...cell.getCellProps()}>
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

  return (
    <Flex sx={{ width: "100%", justifyContent: "space-between" }}>
      {table}
    </Flex>
  );
};

export default Balances;
