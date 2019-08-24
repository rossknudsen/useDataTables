# useDataTables
A React hook implementing the state for a data table.

> Note: this is a work in progress that is meant for collaboration.

## Expected usage

src/examples/ClientSide.tsx:

```ts
import React, { useState } from "react";
import useDataTable from "..";
import { TableDisplayState } from "../TableOptions";

type DataType = {
  name: string;
};

const Table = (props: {}) => {
  const data: DataType[] = [
    {
      name: "Alice",
    },
    {
      name: "Bob",
    },
    {
      name: "Carl",
    },
  ];

  const [tableState, setTableState] = useState({} as TableDisplayState<DataType>);

  const tableProps = useDataTable({
    data,
    columns: [
      {
        // selecting a simple field from the current data row.
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
      {
        // this is an example of a calculated/derived field.
        fieldSelector: (row) => row.name.toUpperCase(),
        label: "Capitalised Name",
        filterable: false,
        sortable: true,
        sortComparer: (first, second) => first.name.localeCompare(second.name),
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

  console.log(tableProps);

  return <div>TODO render table using tableProps ...</div>;
};
```