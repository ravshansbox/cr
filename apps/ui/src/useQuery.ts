import { useEffect, useState } from 'react';

export const useQuery = <T>(fn: () => Promise<T>) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const data = await fn();
      setData(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  return { isFetching, error, data, fetchData };
};
