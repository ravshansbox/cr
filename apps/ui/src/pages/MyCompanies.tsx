import { FC } from 'react';
import { api } from '../api';
import { useQuery } from '../useQuery';
import { Table } from '../components/Table';

export const MyCompanies: FC = () => {
  const { data, error, hasData } = useQuery(() => api.getCompanies({}));

  if (!hasData) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <Table
      items={data}
      columns={[
        { title: 'Name', getData: (item) => item.name },
        { title: 'Role', getData: (item) => item.role },
      ]}
    />
  );
};
