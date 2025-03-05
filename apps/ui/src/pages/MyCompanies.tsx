import { FC } from 'react';
import { api } from '../api';
import { useQuery } from '../useQuery';
import { Table } from '../components/Table';
import { CreateCompany } from './CreateCompany';

export const MyCompanies: FC = () => {
  const companies = useQuery(() => api.getCompanies({}));

  if (!companies.hasData) {
    return <div>Loading...</div>;
  }

  if (companies.error) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <Table
        items={companies.data}
        columns={[
          { title: 'Name', getData: (item) => item.name },
          { title: 'Role', getData: (item) => item.role },
        ]}
      />
      <CreateCompany onCreate={companies.fetchData} />
    </>
  );
};
