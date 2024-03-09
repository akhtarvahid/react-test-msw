import React, { useState } from "react";
import useSWR from "swr";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import "./style.css";

const URL = "https://rickandmortyapi.com/api";
const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

function Table() {
  const [pageIndex, setPageIndex] = useState(1);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const { data, error } = useSWR(
    `${URL}/character/?page=${pageIndex}`,
    fetcher
  );

  const tableHeadData = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        Header: "ID",
        accessorKey: "id", // accessor is the "key" in the data
      },
      {
        Header: "Name",
        accessorKey: "name",
      },
      {
        Header: "Location",
        accessorKey: "location",
      },
      {
        Header: "Gender",
        accessorKey: "gender",
      },
      {
        Header: "Species",
        accessorKey: "species",
      },
    ],
    []
  );
  const tableBodyData = React.useMemo(() => {
    return data?.results?.map((result: any) => ({
      ...result,
      location: result?.location?.name,
    }));
  }, [data]);

  const table = useReactTable({
    data: tableBodyData,
    columns: tableHeadData,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  const loadMoreHandler = () => {
    setPageIndex((page: number) => page + 1);
  };
  console.log("data:::", data);

  return (
    <div>
      <div>Table</div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            const headers = headerGroup.headers;
            return (
              <tr key={headerGroup.id} className="row-th">
                {headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td className="styled-div2" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      <button onClick={loadMoreHandler}>Load more</button>
    </div>
  );
}

export default Table;
