import React, { useState } from "react";
import useDataTable from "..";
import { TableDisplayState } from "../TableOptions";
import { ServerSideDataRequest, ServerSideDataResponse } from "../DataTableConfig";

type DataType = {
  name: string;
};

const Table = () => {
  const fetchData = (config: ServerSideDataRequest<DataType>): Promise<ServerSideDataResponse<DataType>> => {
    return Promise.resolve({
      data: [
        {
          name: "Alice",
        },
        {
          name: "Bob",
        },
        {
          name: "Carl",
        },
      ],
      config,
      totalPages: 1,
    });
  };

  const [tableState, setTableState] = useState({} as TableDisplayState<DataType>);

  const tableProps = useDataTable({
    data: fetchData,
    columns: [
      {
        fieldSelector: "name",
        canChangeVisibility: true,
        filterable: true,
        label: "Name",
        searchable: true,
        sortable: true,
        sortComparer: (first, second) => first.name.localeCompare(second.name),
        searchMatcher: (searchString, value: string) => value.indexOf(searchString) > -1,
        filter: () => true,
      },
    ],
    options: {
      columnVisibilityEnabled: true,
      filtersEnabled: true,
      initialRowsPerPage: 10,
      rowsPerPageOptions: [10, 20, 30],
      pagination: true,
      searchEnabled: true,
      selectableRows: true,
      sortEnabled: true,
      isRowSelectable: (row) => true,
      loadTableDisplayState: () => tableState,
      saveTableDisplayState: (state) => setTableState(state),
    },
  });

  return <div>* TODO render table using tableProps ...</div>;
};
