import { useApolloClient } from '@apollo/client';

function useRefetchWithCache(queryNames: string[] | 'active' | 'all' = 'active') {
  const client = useApolloClient();

  async function refetchWithCache() {
    await client.clearStore();
    await client.refetchQueries({
      include: queryNames
    });
  }

  return refetchWithCache;
}

export default useRefetchWithCache;
