import { DataRow } from "./types";
import { ColumnConfig } from "./ColumnConfig";
import { TableOptions } from "./TableOptions";
import { DataTableProps } from ".";

/**
 * The generic type T represents the type of object to be rendered for each row.
 */
export type DataTableConfig<T extends DataRow> = DataTableConfigBase<T> &
  (DataTableConfigClientSide<T> | DataTableConfigServerSide<T>);

interface DataTableConfigBase<T extends DataRow> {
  columns?: ColumnConfig<T>[];
  options?: TableOptions<T>;
}

interface DataTableConfigClientSide<T extends DataRow> {
  data: T[];
}

interface DataTableConfigServerSide<T extends DataRow> {
  data: (config: ServerSideDataRequest<T>) => Promise<ServerSideDataResponse<T>>;
}

export interface ServerSideDataRequest<T extends DataRow> {
  page: number;
  rowsPerPage: number;
  searchString?: string;
  // TODO add remaining properties that would be required to complete a serverside request.
  sort: [
    {
      // note that with server-side requests, it is possible that some columns may not be able
      // to be sorted on.
    },
  ];
  filter: [
    {
      // note that server-side may not be able to handle all of this.
    },
  ];
}

export interface ServerSideDataResponse<T extends DataRow> {
  /**
   * Data retrieved from the server.
   */
  data: T[];
  /**
   * The original request information, just in case we have lost reference to it.
   */
  config: ServerSideDataRequest<T>;
  /**
   * We need to know the number of pages there are total.
   */
  totalPages: number;
}
