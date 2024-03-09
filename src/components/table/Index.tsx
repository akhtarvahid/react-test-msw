import React, { useState } from "react";
import useSWR from "swr";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel
} from "@tanstack/react-table";

import "./style.css";
import { SERIES_API } from "../../utils/env";


const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

function Table() {
  const [pageIndex, setPageIndex] = useState(1);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const { data, error } = useSWR(
    `${SERIES_API}/character/?page=${pageIndex}`,
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
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

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
                    const columnFilterValue = header.column.getFilterValue()

                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanFilter() ? (
                        <div>
                          <input
                            type="text"
                            value={(columnFilterValue ?? '') as string}
                            onChange={e => header.column.setFilterValue(e.target.value)}
                            placeholder={`Search...`}
                            className="w-36 border shadow rounded"
                          />
                        </div>
                      ) : null}
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
      <span>Page {pageIndex} of {data?.info?.pages}</span>
       <button  disabled={pageIndex <= 1 ? true: false} onClick={()=> setPageIndex(1)}>First page</button>
       <button  disabled={data?.info?.prev ? false: true} onClick={()=> setPageIndex((page: number) => page - 1)}>Prev</button>
       <button  disabled={data?.info?.next ? false: true} onClick={()=> setPageIndex((page: number) => page + 1)}>Next</button>
       <button  disabled={data?.info?.pages === pageIndex ? true: false} onClick={()=> setPageIndex(data?.info?.pages)}>Last page</button>
    </div>
  );
}

export default Table;
