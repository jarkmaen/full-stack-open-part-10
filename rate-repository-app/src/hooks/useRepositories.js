import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network', // Doesn't check cache before making a network request
    });
    const repositories = data ? data.repositories : undefined;
    return { repositories, error, loading };
};

export default useRepositories;