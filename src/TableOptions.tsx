import { DataRow, SortDirection } from "./types";

export type TableOptions<T extends DataRow> = TableOptionsBase<T> & ({} | PersistDisplayStateOptions<T>);

interface TableOptionsBase<T extends DataRow> {
  /**
   * Default 10
   */
  initialRowsPerPage?: number;

  /**
   * Defaults [10,15,100]
   */
  rowsPerPageOptions?: number[];

  /**
   * Default to true
   */
  pagination?: boolean;

  /**
   * Enable or disable searching.  Defaults to true.
   */
  searchEnabled?: boolean;

  /**
   * Enable or disable row selection.  Defaults to true.
   */
  selectableRows?: boolean;

  /**
   * Default will return true if rows are selectable, otherwise false.
   */
  isRowSelectable?: (row: T) => boolean;

  /**
   * Enable or disable sorting for all columns.  Defaults to true.
   */
  sortEnabled?: boolean;

  /**
   * Enable or disable filters for all columns.  Defaults to true.
   */
  filtersEnabled?: boolean;

  /**
   * Enable or disable column showing and hiding for all columns.  Defaults to true.
   */
  columnVisibilityEnabled?: boolean;
}

interface PersistDisplayStateOptions<T extends DataRow> {
  /**
   * Provides the means to persist the filter, sort, search and column visibility.
   * Note that loadTableDisplayState must also be provided.
   */
  saveTableDisplayState?: (state: TableDisplayState<T>) => void;

  /**
   * Provides the means to retrieve the filter, sort, search and column visibility state.
   * Note that saveTableDisplayState must also be provided.
   */
  loadTableDisplayState: () => TableDisplayState<T>;
}

export interface TableDisplayState<T extends DataRow> {
  /**
   * The indexes of columns that are hidden.
   */
  hiddenColumns: number[];

  /**
   *
   */
  filters: { columnIndex: number; filter: any }[]; // TODO

  /**
   * The current page to display.
   */
  page: number;

  /**
   * The max number of rows to display per page.
   */
  rowsPerPage: number;

  /**
   * The current search string if any.
   */
  searchString?: string;

  /**
   * The columns that are currently sorted.
   */
  sortedColumns: { columnIndex: number; direction: SortDirection }[];
}
