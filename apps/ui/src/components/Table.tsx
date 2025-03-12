import { css } from '@/styled-system/css';

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
    <table className={css({ w: 'full' })}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.title}
              className={css({
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'gray.200',
                p: 2,
              })}
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td
                key={column.title}
                className={css({
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'gray.200',
                  p: 2,
                })}
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
