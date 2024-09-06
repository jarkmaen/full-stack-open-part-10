import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryView = () => {
    const { id } = useParams();
    const { data } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { id }
    });
    if (!data?.repository) {
        return null;
    }
    const RepositoryInfo = ({ repository }) => (
        <View>
            <RepositoryItem repository={repository} showGitHubButton={true} />
        </View>
    );
    const reviews = data.repository.reviews.edges.map(edge => edge.node);
    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
        />
    );
};

const styles = StyleSheet.create({
    separator: {
        height: 10
    }
});

export default RepositoryView;