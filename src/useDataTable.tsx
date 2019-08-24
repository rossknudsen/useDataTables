import React from "react";
import { DataRow } from "./types";
import { DataTableConfig } from "./DataTableConfig";
import { DataTableProps } from "./DataTableProps";

/**
 * This is a hook that implements the state management for a data table.
 */
const useDataTable = <T extends DataRow>(config: DataTableConfig<T>): DataTableProps<T> => {
  throw Error("not implemented");
};

export default useDataTable;

export interface TBI<T extends DataRow> {
  /**
   * Determines how the column head should be rendered.  Will default to the name or
   * label for this column.
   */
  headRenderer?: (label: string) => React.ReactNode;

  /**
   * Determines how the cell should be rendered.  Will default to the value of the data
   * row specified by the
   */
  cellRenderer?: (value: any, row: T) => React.ReactNode;
}
