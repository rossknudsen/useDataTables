import { DataRow, SortDirection } from "./types";

// TODO download data capability

/**
 * This is the resulting props returned by the useDataTable hook.
 */
export interface DataTableProps<T extends DataRow> {
  // data
  displayedRows: T[];
  /**
   * Whether we are waiting for data to load.  Most relevant when we there is server-side data.
   */
  loading: boolean;
  onDisplayedDataChange: (displayedRows: T[]) => void;

  // Pagination props.
  page: number;
  rowsPerPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: () => void;
  previousPage: () => void;
  gotoPage: (page: number) => void;
  onPageChange: (currentPage: number, totalPages: number) => void;

  // sorting props
  changeSort: (sortedColumns: { columnIndex: number; direction: SortDirection }[]) => void;
  onSortChange: () => void;

  // search props.
  searchString?: string;
  search: (searchString: string) => void;
  onSearchChange: (searchString?: string) => void;

  // filter props.
  changeFilter: (...args: any[]) => void; // TODO
  onFilterChange: (...args: any[]) => void; // TODO
}

interface RowMetadata<T extends DataRow> {
  // TODO discuss the benefits/challenges of referencing rows by index.  Both in the raw dataset and
  // the currently displayed page.  Consider from client and server side data perspectives.
  index: number;
  displayIndex: number;

  /**
   * The raw data representing this row.
   */
  data: T;

  // row selection
  selectable: boolean;
  selected: boolean;
  select: () => void;
  unselect: () => void;
}

export interface ColumnMetadata<T extends DataRow> {
  // data
  index: number;
  label: string;
  valueSelector: (row: T) => any; // TODO need to find a way to get this typed.

  // visibility
  visible: boolean;
  setVisibility: (visible: boolean) => void;
  onColumnVisibilityChange: (column: ColumnMetadata<T>, visible: boolean) => void;

  // sorting
  sortOrder?: number;
  sortDirection?: SortDirection;

  // filtering
  // TODO
}
