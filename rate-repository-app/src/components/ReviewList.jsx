import { View, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import ReviewItem from './ReviewItem';

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = () => {
    const { data } = useQuery(GET_CURRENT_USER, {
        variables: { includeReviews: true },
        fetchPolicy: 'cache-and-network'
    });
    const reviews = data?.me?.reviews?.edges.map(edge => edge.node) || [];
    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
        />
    );
};

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

export default ReviewList;