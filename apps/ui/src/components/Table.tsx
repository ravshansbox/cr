type Column<T> = {
  title: string;
  getData: (item: T) => string;
};
type TableProps<T> = {
  items: T[] | null;
  columns: Column<T>[];
};
export function Table<T>({ items, columns }: TableProps<T>) {
  if (!items) return null;

  return (
    <table className="table w-full">
      <thead className="table-header-group">
        <tr className="table-row">
          {columns.map((column) => (
            <th
              key={column.title}
              className="table-cell border border-gray-200 p-2"
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="table-row-group">
        {items.map((item, index) => (
          <tr key={index} className="table-row">
            {columns.map((column) => (
              <td
                key={column.title}
                className="table-cell border border-gray-200 p-2"
              >
                {column.getData(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
