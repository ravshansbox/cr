import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { stack } from '@/styled-system/patterns';
import { api } from '../api';
import { Table } from '../components';
import { CreateCompany } from '.';

export const MyCompanies: FC = () => {
  const companies = useQuery({
    queryKey: ['companies'],
    queryFn: () => api.getCompanies({}),
  });

  if (companies.isLoading) {
    return <div>Loading...</div>;
  }

  if (companies.isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className={stack()}>
      <Table
        items={companies.data}
        columns={[
          { title: 'Name', getData: (item) => item.name },
          { title: 'Role', getData: (item) => item.role },
        ]}
      />
      <CreateCompany
        onCreate={async () => {
          await companies.refetch();
        }}
      />
    </div>
  );
};
